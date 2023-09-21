import {
    Categories,
    EEnchantment,
    Enchantment,
    GemQuality,
    Item,
    ItemsMappedToCategory,
    Rarity,
    Reforge
} from '../../models/Skyblock/items';
import * as fs from "fs";

const nbt = require("prismarine-nbt");
// let allItems = new Map<string, any>()
//
// function initItems() {
//     try {
//         let itemsFile:any = fs.readFileSync(__dirname + '/../../resources/all_hypixel_items.json')
//         let itemsJSON = JSON.parse(itemsFile)
//
//         for (let item of itemsJSON.items) {
//             allItems.set(item.id, {
//                 base_name: item.name,
//                 material: item.material
//             })
//         }
//     } catch (err: any) {
//         console.error(err)
//     }
// }
// initItems()

function getURL(base64String: string) {
    try {
        let decodedString = Buffer.from(base64String, 'base64').toString('utf8');
        let parsedJson = JSON.parse(decodedString);
        let url = parsedJson?.textures?.SKIN?.url

        return url.slice(url.lastIndexOf('/') + 1)
    } catch (e) {
        return undefined
    }
}

const loreToRarity = (lore: string[]): Rarity => {
    const rarityLine = lore[lore.length - 1];
    if (!rarityLine) { return Rarity.COMMON }

    const rarityMatch = rarityLine.match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC|DIVINE|SPECIAL|VERY SPECIAL)/);

    return rarityMatch ? Rarity[rarityMatch[0] as keyof typeof Rarity] : Rarity.COMMON;
}

const stringToEnum = (enumObj: any, str: string) => enumObj[str.toUpperCase()] || null;

const objectToEnchantments = (enchantmentsObject: Record<string, unknown>):Enchantment[] => {
    return Object.entries(enchantmentsObject)
        .map(([key, value]) => ({
            name: stringToEnum(EEnchantment, key),
            level: Number(value),
        }))
        .filter(({ name }) => name !== null);
};

const objectToGems = (
    gemsObject: Record<string, { gem: string, uuid: string; quality: keyof typeof GemQuality }>
): { gem: string; uuid: string; quality: GemQuality }[] => {
    return Object.entries(gemsObject)
        .map(([key, value]) => {
            let gem = {
                gem: key.split('_')[0],
                uuid: '',
                quality: GemQuality.ROUGH, // Default to rough in case we don't find it, who knows, their API is a mess.
            };

            if (!value) {
                return gem;
            }

            if (typeof value === 'object' && value.quality) {
                gem.uuid = value.uuid || '';
                gem.quality = stringToEnum(GemQuality, value.quality) || GemQuality.ROUGH;
            } else if (typeof value === 'string') {
                gem.quality = stringToEnum(GemQuality, value) || GemQuality.ROUGH;
            }

            return gem;
        });
};

const extractPetLevel = (petName: string):string => (petName.match(/Lvl (\d+)/) || [null, '0'])[1];
const stripColorCodes = (inputString: string) =>  inputString.replace(/\u00A7[0-9A-FK-OR]/gi, '').trim();

const convertNbtItemToCustomItem = (
    nbtItem:any,
    {
        includeLore = true,
        includeGems = true,
        includeEnchantments = true,
        includeHPB = true,
        includeStars = true,
        includePetStats = true
    }: { [key: string]: boolean }
) => {

    const {
        Count = 0,
        tag: {
            ExtraAttributes: { modifier = "", hot_potato_count = 0, id = "", upgrade_level = 0, dungeon_item_level = 0, petInfo = "{}", enchantments = [], gems = null } = {},
            display: { Name = "AIR", Lore = [] } = {},
            SkullOwner: { Properties: { textures = [] } = {} } = {}
        } = {},
    } = nbtItem;

    // let material =

    const baseItem:Item = {
        category: ItemsMappedToCategory[id] || Categories.NONE,
        count: Count, id,
        name: stripColorCodes(Name),
        rarity: loreToRarity(Lore),
        modifier: stringToEnum(Reforge, modifier) || Reforge.NONE,
        raw_name: '',
    };

    if (textures?.length > 0 && textures[0]) {
        baseItem.head_url = getURL(textures[0].Value)
    }

    if (baseItem.id === 'PET') {
        baseItem.category = Categories.PET
    }

    const enchantmentsArray = objectToEnchantments(enchantments);
    const pet = JSON.parse(petInfo);

    if (Lore && includeLore) {
        baseItem.lore = Lore
    }

    if (Object.keys(pet).length > 0 && includePetStats)
    {
        baseItem.candy = pet.candyUsed || 0
        baseItem.level = parseInt(extractPetLevel(Name));
    }

    if (enchantmentsArray.length > 0 && includeEnchantments) {
        baseItem.enchantments = enchantmentsArray
    }

    if (gems && includeGems) {
        baseItem.gems = objectToGems(gems)
    }

    if (hot_potato_count && includeHPB) {
        baseItem.fuming_potato_books = 0
        baseItem.hot_potato_books = hot_potato_count || 0
    }

    if ((dungeon_item_level || upgrade_level) && includeStars) {
        baseItem.stars = dungeon_item_level || upgrade_level || 0
    }

    return baseItem;
};

export async function base64ToItems(base64: string, params: { [key:string]: boolean } = {}):Promise<Item[]> {
    const { parsed } = await nbt.parse(Buffer.from(base64, "base64"));
    const items = nbt.simplify(parsed).i;
    return items.map((item: any) => convertNbtItemToCustomItem(item, params));
};