import {SlayerBosses, SlayerQuest} from "./slayer";
import {NetherIslandPlayerData} from "./islands";
import {Dungeons} from "./dungeons";
import {SacksCounts} from "./sacks";
import {Collection} from "./collections";
import {Forge, MiningCore} from "./mines";

export enum CuteName {
    APPLE = "Apple",
    BANANA = "Banana",
    BLUEBERRY = "Blueberry",
    COCONUT = "Coconut",
    CUCUMBER = "Cucumber",
    GRAPES = "Grapes",
    KIWI = "Kiwi",
    LEMON = "Lemon",
    LIME = "Lime",
    MANGO = "Mango",
    ORANGE = "Orange",
    PAPAYA = "Papaya",
    PEAR = "Pear",
    PEACH = "Peach",
    PINEAPPLE = "Pineapple",
    POMEGRANATE = "Pomegranate",
    RASPBERRY = "Raspberry",
    STRAWBERRY = "Strawberry",
    TOMTATO = "Tomato",
    WATERMELON = "Watermelon",
    ZUCCHINI = "Zucchini",
}

export enum Gamemode { // No type for regular
    IRONMAN = 'ironman',
    BINGO = 'bingo',
    CLASSIC = 'classic'
}

export enum CakeBuffType {
    CAKE_WALK_SPEED = "cake_walk_speed",
    CAKE_STRENGTH = 'cake_strength',
    CAKE_DEFENSE = 'cake_defense',
    CAKE_FARMING_FORTUNE = 'cake_farming_fortune',
    CAKE_FEROCITY = 'cake_ferocity',
    CAKE_PET_LUCK = 'cake_pet_luck',
    CAKE_HEALTH = 'cake_health',
    CAKE_SEA_CREATURE_CHANCE = 'cake_sea_creature_chance',
    CAKE_MINING_FORTUNE = 'cake_mining_fortune',
    CAKE_MAGIC_FIND = 'cake_magic_find',
    CAKE_INTELLIGENCE = 'cake_intelligence',
    CAKE_FORAGING_FORTUNE = 'cake_foraging_fortune',
}

export interface Profile {
    profile_id: string;
    cute_name: CuteName,
    game_mode: Gamemode,
    selected: boolean;
    members?: {
        [key: string]: Member;
    };
    community_upgrades?: {
        upgrade_states: CommunityUpgrade[];
        currently_upgrading?: InProgressCommunityUpgrade[];
    };
    last_save?: number;
    banking?: {
        balance?: number,
        transactions?: ProfileTransaction[],
    }
}

export interface Member {
    accessory_bag_storage?: AccessoryBagStorage;
    achievement_spawned_island_types: string[];
    active_effects: Effect[];
    autopet?: AutoPet;
    backpack_contents?: BackpackContents;
    backpack_icons?: BackpackContents;
    bestiary?: Bestiary;
    candy_inventory_contents: InventoryContents;
    coin_purse: number;
    collection?: Collection;
    coop_invitation?: CoopInvitation;
    crafted_generators: string[];
    death_count: number;
    disabled_potion_effects: string[];
    dungeons?: Dungeons;
    ender_chest_contents: InventoryContents;
    equippment_contents: InventoryContents;
    experience_skill_alchemy: number;
    experience_skill_carpentry: number;
    experience_skill_combat: number;
    experience_skill_enchanting: number;
    experience_skill_farming: number;
    experience_skill_fishing: number;
    experience_skill_foraging: number;
    experience_skill_mining: number;
    experience_skill_runecrafting: number;
    experience_skill_social2: number;
    experience_skill_taming: number;
    experimentation?: Experimentation;
    fairy_exchanges: number;
    fairy_souls: number;
    fairy_souls_collected: number;
    favorite_arrow: string;
    first_join: number;
    first_join_hub: number;
    fishing_treasure_caught: number;
    temp_stat_buffs?: TempBuff[],
    forge?: Forge;
    harp_quest?: HarpQuest;
    inv_armor: InventoryContents;
    inv_contents: InventoryContents;
    jacob2?: Jacob2;
    last_death: number;
    leveling?: Leveling;
    mining_core?: MiningCore;
    nether_island_player_data?: NetherIslandPlayerData;
    objectives: Objective[];
    perks: Record<string, unknown>;
    personal_vault_contents: InventoryContents;
    pets: Pet[];
    potion_bag: InventoryContents;
    quests: Quest[];
    quiver: InventoryContents;
    sacks_counts?: SacksCounts;
    slayer_bosses?: SlayerBosses;
    slayer_quest?: SlayerQuest;
    stats: Stats;
    talisman_bag: InventoryContents;
    trapper_quest: TrapperQuest;
    trophy_fish: TrophyFish;
    tutorial: string[];
    unlocked_coll_tiers: string[];
    visited_modes: string[];
    visited_zones: string[];
    wardrobe_contents: InventoryContents;
    wardrobe_equipped_slot: number;
}

export interface CommunityUpgrade {
    upgrade: string;
    tier: number;
    started_ms: number;
    started_by: string;
    claimed_ms: number;
    claimed_by: string;
    fast_tracked: boolean;
}

export interface InProgressCommunityUpgrade {
    upgrade: string;
    new_tier: number;
    start_ms: number;
    who_started: string;
}

export interface ProfileTransaction {
    amount: number,
    timestamp: number,
    action: string,
    initiator_name: string,
}

export interface TempBuff {
    stat: number,
    key: CakeBuffType,
    amount: number,
    expire_at: number,
}

export interface Pet {
    uuid: string;
    type: string;
    exp: number;
    active: boolean;
    tier: string;
    heldItem: null;
    candyUsed: number;
    skin: null;
}

export interface Jacob2 {
    medals_inv: {
        bronze?: number;
        silver?: number;
        gold?: number;
    };
    perks?: object;
    contests?: {
        [key: string]: {
            collected: number;
            claimed_rewards: boolean;
            claimed_position: number;
            claimed_participants: number;
        };
    };
    talked: boolean;
}

export interface Stats {
    [key:string]: number,
}

export interface HarpQuest {
    selected_song?: string;
    selected_song_epoch?: number;
    song_hymn_joy_best_completion?: number;
    song_hymn_joy_completions?: number;
    song_frere_jacques_best_completion?: number;
    song_frere_jacques_completions?: number;
    song_frere_jacques_perfect_completions?: number;
    song_amazing_grace_best_completion?: number;
    song_amazing_grace_completions?: number;
    song_brahms_best_completion?: number;
    song_brahms_completions?: number;
    song_brahms_perfect_completions?: number;
    song_happy_birthday_best_completion?: number;
    song_happy_birthday_completions?: number;
    song_happy_birthday_perfect_completions?: number;
    song_greensleeves_best_completion?: number;
    song_greensleeves_completions?: number;
    song_greensleeves_perfect_completions?: number;
    song_jeopardy_best_completion?: number;
    song_jeopardy_completions?: number;
    song_jeopardy_perfect_completions?: number;
    song_minuet_best_completion?: number;
    song_minuet_completions?: number;
    song_minuet_perfect_completions?: number;
    song_joy_world_best_completion?: number;
    song_joy_world_completions?: number;
    song_joy_world_perfect_completions?: number;
    song_pure_imagination_best_completion?: number;
    song_pure_imagination_completions?: number;
    song_pure_imagination_perfect_completions?: number;
    song_vie_en_rose_best_completion?: number;
    song_vie_en_rose_completions?: number;
    song_vie_en_rose_perfect_completions?: number;
    song_hymn_joy_perfect_completions?: number;
    song_amazing_grace_perfect_completions?: number;
    claimed_talisman?: boolean;
}

export interface Effect {
    effect: string,
    level: number,
    modifiers: Array<EffectModifier>,
    ticks_remaining: number,
    infinite: false,
}

export interface EffectModifier {
    key: string,
    amp: number,
}

export interface Experimentation {
    pairings: ExperimentationMode,
    simon: ExperimentationMode,
    numbers: ExperimentationMode,
    claims_resets: number,
    claims_resets_timestamp: number,
}

export interface ExperimentationMode {
    last_attempt?: number,
    last_claimed?: number,
    claims_0?: number,
    best_score_0?: number,
    claims_1?: number,
    best_score_1?: number,
    claims_2?: number,
    best_score_2?: number,
    claims_3?: number,
    best_score_3?: number,
    claims_4?: number,
    best_score_4?: number,
    claims_5?: number,
    best_score_5?: number
}

export interface TrophyFish {
    rewards?: any[],
    total_caught?: number,
}


export interface Bestiary {
    migrated: boolean,
    [key: string]: number | boolean,
    // I don't hate myself enough to do this yet
}

export interface CoopInvitation {
    timestamp?: number,
    invited_by?: string,
    confirmed?: boolean,
    confirmed_timestamp?: number,
}

export interface Quest {
    status: string,
    activated_at: number,
    activated_at_sb: number,
    completed_at: number,
    completed_at_sb: number,
}

export interface AutoPet {
    migrated: boolean,
    rules_limit: number,
    rules: AutoPetRule[]
}

export interface AutoPetRule {
    id: string,
    pet: string,
    exceptions: AutoPetException[],
    data: {
        slot: string,
    }
    uuid: string,
}

export interface AutoPetException {
    id: string,
    data: {
        [key: string]: string,
    }
}

export interface AccessoryBagStorage {
    tuning: {
        slot_0: {
            health: number,
            defense: number,
            walk_speed: number,
            strength: number,
            critical_damage: number,
            critical_chance: number,
            attack_speed: number,
            intelligence: number,
        }
    }
    selected_power?: string,
    unlocked_powers?: string[],
    highest_magical_power?: number,
}

export interface Leveling {
    experience: number,
    completions: object,
    completed_tasks: string[],
    highest_pet_score: number,
    migrated: boolean,
    migrated_completions_2: boolean,
}

export interface TrapperQuest {
    last_task_time?: number,
    pelt_count?: number,
}

export interface Objective {
    [key: string]: {
        status: string,
        progress: number,
        completed_at: number
    }
}

export interface InventoryContents {
    type: number,
    data?: string,
    items?: [],
}

export interface BackpackContents {
    [key: string]: InventoryContents
}