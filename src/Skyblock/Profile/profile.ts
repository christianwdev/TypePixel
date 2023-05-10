import {Gamemode, InventoryContents, Member, Profile,} from "../../models/Skyblock/profile";
import {SackItem, SacksCounts} from "../../models/Skyblock/sacks";
import {SlayerQuest, SlayerBoss} from "../../models/Skyblock/slayer";
import {Collection, CollectionType} from "../../models/Skyblock/collections";
import { base64ToItems } from "../Item/item";

export async function convertJSONToProfile(json: any, params: any = {}):Promise<Profile[]>  {

    if (!json.profiles) { return [] }

    let {
        justGetIdentifiers = false,
    } = params;

    const SkyblockProfiles:Profile[] = []

    for (let profileJSON of json.profiles) {
        const {
            profile_id,
            members,
            community_upgrades,
            last_save,
            cute_name,
            selected,
            game_mode,
            banking,
        } = profileJSON;

        let profile:Profile = {
            profile_id,
            cute_name,
            game_mode: game_mode || Gamemode.CLASSIC,
            selected,
        }

        if (justGetIdentifiers) {
            SkyblockProfiles.push(profile)
            continue
        }

        profile.members = await parseMembers(members, params)

        SkyblockProfiles.push(profile)
    }

    return SkyblockProfiles.sort((a,b) => (+b.selected) - (+a.selected)) // Convert booleans to ints
}

async function parseMembers(json: any, params: any):Promise<any> {

    let {
        constructItems = true,
        keepItemBytes = false,
        readableNames = true,
    } = params

    let members:any = {}

    for (let [key, value] of Object.entries(json)) {

        let {
            accessory_bag_storage = {},
            achievement_spawned_island_types = [],
            active_effects = [],
            autopet,
            backpack_contents = {},
            backpack_icons = {},
            bestiary = {},
            candy_inventory_contents = {},
            coin_purse = 0,
            collection = {},
            coop_invitation = {},
            crafted_generators = [],
            death_count = 0,
            disabled_potion_effects = [],
            dungeons = {},
            ender_chest_contents = {},
            equippment_contents = {},
            experience_skill_alchemy = 0,
            experience_skill_carpentry = 0,
            experience_skill_combat = 0,
            experience_skill_enchanting = 0,
            experience_skill_farming = 0,
            experience_skill_fishing = 0,
            experience_skill_foraging = 0,
            experience_skill_mining = 0,
            experience_skill_runecrafting = 0,
            experience_skill_social2 = 0,
            experience_skill_taming = 0,
            experimentation = {},
            fairy_exchanges = 0,
            fairy_souls = 0,
            fairy_souls_collected = 0,
            favorite_arrow = '',
            first_join = 0,
            first_join_hub = 0,
            fishing_treasure_caught = 0,
            temp_stat_buffs = [],
            forge = {},
            harp_quest = {},
            inv_armor = {},
            inv_contents = {},
            jacob2 = {},
            last_death = 0,
            leveling = {},
            mining_core = {},
            nether_island_player_data = {},
            objectives = {},
            perks = {},
            personal_vault_contents = {},
            pets = {},
            potion_bag = {},
            quests = {},
            quiver = {},
            sacks_counts = {},
            slayer_bosses = {},
            slayer_quest = {},
            stats = {},
            talisman_bag = {},
            trapper_quest = {},
            trophy_fish = {},
            tutorial = {},
            unlocked_coll_tiers = {},
            visited_modes = {},
            visited_zones = {},
            wardrobe_contents = {},
            wardrobe_equipped_slot = {},
        }:any = value;

        let member:Member = {
            accessory_bag_storage: undefined,
            achievement_spawned_island_types,
            active_effects,
            autopet: undefined,
            backpack_contents: undefined,
            backpack_icons: undefined,
            bestiary: undefined,
            candy_inventory_contents: await parseInventory(candy_inventory_contents, constructItems, keepItemBytes),
            coin_purse: 0,
            collection: parseCollCounter(collection),
            coop_invitation: undefined,
            crafted_generators,
            death_count,
            disabled_potion_effects,
            dungeons: undefined,
            ender_chest_contents: await parseInventory(equippment_contents, constructItems, keepItemBytes),
            equippment_contents: await parseInventory(equippment_contents, constructItems, keepItemBytes),
            experience_skill_alchemy,
            experience_skill_carpentry,
            experience_skill_combat,
            experience_skill_enchanting,
            experience_skill_farming,
            experience_skill_fishing,
            experience_skill_foraging,
            experience_skill_mining,
            experience_skill_runecrafting,
            experience_skill_social2,
            experience_skill_taming,
            experimentation: undefined,
            fairy_exchanges,
            fairy_souls,
            fairy_souls_collected,
            favorite_arrow,
            first_join,
            first_join_hub,
            fishing_treasure_caught,
            forge: undefined,
            harp_quest: undefined,
            inv_armor: await parseInventory(inv_armor, constructItems, keepItemBytes),
            inv_contents: await parseInventory(inv_contents, constructItems, keepItemBytes),
            jacob2: undefined,
            last_death,
            leveling: undefined,
            mining_core: undefined,
            nether_island_player_data: undefined,
            objectives: [],
            perks: {},
            personal_vault_contents: await parseInventory(personal_vault_contents, constructItems, keepItemBytes),
            pets,
            potion_bag: await parseInventory(potion_bag, constructItems, keepItemBytes),
            quests,
            quiver: await parseInventory(quiver, constructItems, keepItemBytes),
            sacks_counts: parseSacksCount(sacks_counts),
            slayer_bosses: undefined,
            slayer_quest: parseCurrentSlayerQuest(slayer_quest),
            stats: {},
            talisman_bag: await parseInventory(talisman_bag, constructItems, keepItemBytes),
            trapper_quest: {
                last_task_time: trapper_quest.last_task_time || 0,
                pelt_count: trapper_quest.pelt_count || 0,
            },
            trophy_fish: {
                rewards: trophy_fish.rewards || [],
                total_caught: trophy_fish.total_caught || 0,
            },
            tutorial,
            unlocked_coll_tiers,
            visited_modes,
            visited_zones,
            wardrobe_contents: await parseInventory(wardrobe_contents, constructItems, keepItemBytes),
            wardrobe_equipped_slot
        }

        members[key] = member
    }

    return members
}

async function parseInventory(jsonInv: any, constructItems = true, keepItemBytes = false):Promise<InventoryContents> {

    const {
        type = 0,
        data = '',
    } = jsonInv;

    let inv:InventoryContents = {
        type,
    }

    if (constructItems && data) {
        inv.items = await base64ToItems(data)
    }

    if (keepItemBytes) {
        inv.data = data
    }

    return inv
}

function parseSlayerBosses(jsonBosses: any) {



}

function parseCurrentSlayerQuest(jsonQuest: any):SlayerQuest {

    let {
        type,
        tier,
        start_timestamp,
        completion_state,
        combat_xp,
        recent_mob_kills,
        last_killed_mob_island,
        spawn_timestamp,
    } = jsonQuest;

    return {
        combat_xp,
        completion_state,
        last_killed_mob_island,
        recent_mob_kills,
        spawn_timestamp,
        start_timestamp,
        tier,
        type: SlayerBoss[type as keyof typeof SlayerBoss]
    }

}

function parseCommunityUpgrades() {

}

function parseCollCounter(jsonCounts: any):Collection {

    let Counts:Collection = {}
    for (let [key, value] of Object.entries(jsonCounts)) {
        let count = 0

        if (typeof value === 'number') { count = value }
        if (key.includes('LOG')) { key = convertLogToString(key) }
        if (key.includes('RAW_FISH')) { key = convertFishToString(key) }
        if (key.includes('SAPLING')) { key = convertSaplingToString(key) }
        if (key.includes('INK_SAC')) { key = convertInkToString(key) }

        let itemType = CollectionType[key as keyof typeof CollectionType]
        Counts[itemType ? itemType : key] = count
    }

    return Counts

}

function parseSacksCount(jsonSacks: any):SacksCounts {

    let Counts:SacksCounts = {}
    for (let [key, value] of Object.entries(jsonSacks)) {
        let count = 0

        if (typeof value === 'number') { count = value }
        if (key.includes('LOG')) { key = convertLogToString(key) }
        if (key.includes('RAW_FISH')) { key = convertFishToString(key) }
        if (key.includes('SAPLING')) { key = convertSaplingToString(key) }
        if (key.includes('INK_SAC')) { key = convertInkToString(key) }

        let sackType = SackItem[key as keyof typeof SackItem]
        Counts[sackType ? sackType : key] = count
    }

    return Counts

}

function convertLogToString(key: string):string {

    if (key === 'LOG:1') { return 'SPRUCE_WOOD' }
    if (key === 'LOG:2') { return 'BIRCH_WOOD' }
    if (key === 'LOG:3') { return 'JUNGLE_WOOD' }
    if (key === 'LOG_2') { return 'ACACIA_WOOD' }
    if (key === 'LOG_2:1') { return 'DARK_OAK_WOOD' }
    return 'OAK_WOOD'

}

function convertSaplingToString(key: string):string {

    if (key === 'SAPLING:1') { return 'SPRUCE_SAPLING' }
    if (key === 'SAPLING:2') { return 'BIRCH_SAPLING' }
    if (key === 'SAPLING:3') { return 'JUNGLE_SAPLING' }
    if (key === 'SAPLING_2') { return 'ACACIA_SAPLING' }
    if (key === 'SAPLING_2:1') { return 'DARK_OAK_SAPLING' }
    return 'OAK_SAPLING'

}

function convertFishToString(key: string):string {

    if (key.endsWith('1')) { return 'RAW_SALMON' }
    if (key.endsWith('2')) { return 'CLOWNFISH' }
    if (key.endsWith('3')) { return 'PUFFERFISH' }
    return 'RAW_FISH'

}

function convertInkToString(key: string):string {

    if (key === 'INK_SACK:3') { return 'LAPIS_LAZULI' }
    if (key === 'INK_SACK:4') { return 'COCOA_BEANS' }
    return 'INK_SACK'

}

function parseBanking() {

}