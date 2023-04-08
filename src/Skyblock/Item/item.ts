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

const nbt = require("prismarine-nbt");

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
                quality: GemQuality.ROUGH, // Assuming ROUGH is one of the enum values in GemQuality
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

const convertNbtItemToCustomItem = (nbtItem:any, { params }: { params: any }) => {
    const {
        Count = 0,
        tag: {
            ExtraAttributes: { modifier = "", hot_potato_count = 0, id = "", upgrade_level = 0, dungeon_item_level = 0, petInfo = "{}", enchantments = [], gems = null } = {},
            display: { Name = "AIR", Lore = [] } = {},
        } = {},
    } = nbtItem;

    const baseItem:Item = {
        category: ItemsMappedToCategory[id] || Categories.NONE,
        count: Count, id, name: stripColorCodes(Name),
        rarity: loreToRarity(Lore),
        modifier: stringToEnum(Reforge, modifier) || Reforge.NONE,
        lore: Lore,
    };

    const enchantmentsArray = objectToEnchantments(enchantments);
    const pet = JSON.parse(petInfo);

    if (gems) {
        baseItem.gems = objectToGems(gems)
    }

    if (Object.keys(pet).length > 0)
    {
        baseItem.candy = pet.candyUsed || 0
        baseItem.level = parseInt(extractPetLevel(Name));
    }

    if (enchantmentsArray.length > 0) {
        baseItem.enchantments = enchantmentsArray
    }

    if (hot_potato_count) {
        baseItem.fuming_potato_books = 0
        baseItem.hot_potato_books = hot_potato_count || 0
    }

    if (dungeon_item_level || upgrade_level) {
        baseItem.stars = dungeon_item_level || upgrade_level || 0
    }

    return baseItem;
};

export async function base64ToItems(base64: string, params: any) {
    const { parsed } = await nbt.parse(Buffer.from(base64, "base64"));
    const items = nbt.simplify(parsed).i;
    return items.map((item: any) => convertNbtItemToCustomItem(item, params));
};