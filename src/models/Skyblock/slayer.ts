export interface SlayerBosses {
    enderman: SlayerBossLevel;
    spider: SlayerBossLevel;
    zombie: SlayerBossLevel;
    wolf: SlayerBossLevel;
    blaze: SlayerBossLevel;
}

export interface ClaimedLevels {
    level_1?: boolean;
    level_2?: boolean;
    level_3?: boolean;
    level_4?: boolean;
    level_5?: boolean;
    level_6?: boolean;
    level_7_special?: boolean;
    [key: string]: boolean | undefined;
}

export interface SlayerBossLevel {
    claimed_levels: ClaimedLevels,
    boss_kills_tier_0?: number;
    boss_kills_tier_1?: number;
    boss_kills_tier_2?: number;
    boss_kills_tier_3?: number;
    boss_kills_tier_4?: number;
    boss_kills_tier_5?: number;
    xp?: number;
}

export interface SlayerQuest {
    type: SlayerBosses,
    tier: number,
    start_timestamp: number,
    completion_state: number,
    combat_xp: number,
    recent_mob_kills: {
        xp: number,
        timestamp: number,
    }[],
}
