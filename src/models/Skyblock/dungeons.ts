export enum DungeonType {
    CATACOMBS = 'catacombs',
    MASTER_CATACOMBS = 'master_catacombs'
}

export enum TreasureType {
    WOOD = 'wood',
    GOLD = 'gold',
    DIAMOND = 'diamond',
    EMERALD = 'emerald',
    BEDROCK = 'bedrock',
}

export interface Dungeons {
    dungeon_types: DungeonTypes;
    player_classes: PlayerClasses;
    dungeon_journal: DungeonJournal;
    dungeons_blah_blah: string[];
    selected_dungeon_class?: string,
    daily_runs?: {
        current_day_stamp?: number;
        completed_runs_count?: number;
    }
    treasures: {
        runs?: DungeonTreasureRun[],
        chests?: DungeonTreasureChest
    };
}

export interface DungeonTreasureRun {
    run_id: string;
    completion_ts: number;
    dungeon_type: DungeonType;
    dungeon_tier: number,
    participants: DungeonTreasureParticipant[],
}

export interface DungeonTreasureChest {
    run_id: string;
    chest_id: string;
    treasure_type: TreasureType;
    rewards: {
        rewards: string[];
        rolled_rng_meter_randomly: boolean;
    };
    quality: number;
    shiny_eligible: boolean;
    paid: boolean;
    rerolls: number;
}

export interface DungeonTreasureParticipant {
    plauer_uuid: string,
    display_name: string,
    class_milestone: number,
}

export interface DungeonJournal {
    journal_entries?: object;
    unlocked_journals?: string[];
}

export interface DungeonTypes {
    catacombs: DungeonTypeInformation;
    master_catacombs: DungeonTypeInformation;
}

export interface DungeonTypeInformation {
    experience?: number;
    times_played?: StatsPerFloor;
    tier_completions?: StatsPerFloor;
    fastest_time?: StatsPerFloor;
    best_runs?: {
        1: DungeonRun[];
        2: DungeonRun[];
        3: DungeonRun[];
        4: DungeonRun[];
        5: DungeonRun[];
        6: DungeonRun[];
        7: DungeonRun[];
    },
    best_score?: StatsPerFloor;
    mobs_killed?: StatsPerFloor;
    most_mobs_killed?: StatsPerFloor;
    most_damage_healer?: StatsPerFloor;
    most_healing?: StatsPerFloor;
    watcher_kills?: StatsPerFloor;
    highest_tier_completed?: number;
    fastest_time_s?: StatsPerFloor;
    most_damage_berserk?: StatsPerFloor;
    fastest_time_s_plus?: StatsPerFloor;
    most_damage_mage?: StatsPerFloor;
    milestone_completions?: StatsPerFloor;
    most_damage_tank?: StatsPerFloor;
    most_damage_archer?: StatsPerFloor;
}

export interface StatsPerFloor {
    1?: number,
    2?: number,
    3?: number,
    4?: number,
    5?: number,
    6?: number,
    7?: number,
}

export interface DungeonRun {
    timestamp: number,
    score_exploration: number,
    score_speed: number,
    score_skill: number,
    score_bonus: number,
    dungeon_class: string,
    teammates: string[],
    elapsed_time: number,
    damage_dealt: number,
    deaths: number,
    mobs_killed: number,
    secrets_found: number,
    damage_mitigated: number,
    ally_healing: number,
}

export interface PlayerClasses {
    healer?: {
        experience: number,
    };
    mage?: {
        experience: number,
    };
    berserk?: {
        experience: number,
    };
    archer?: {
        experience: number,
    };
    tank?: {
        experience: number,
    };
}