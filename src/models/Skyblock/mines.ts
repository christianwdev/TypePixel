export interface MiningCore {
    nodes: {
        special_0: number;
        mining_speed: number;
        mining_fortune: number;
        titanium_insanium: number;
        mining_speed_boost: number;
        forge_time: number;
        daily_powder: number;
        efficient_miner: number;
        mining_experience: number;
        mining_madness: number;
        daily_effect: number;
        mole: number;
        fortunate: number;
        great_explorer: number;
        toggle_mole: boolean;
        toggle_titanium_insanium: boolean;
    };
    received_free_tier: boolean;
    tokens: number;
    powder_mithril: number;
    powder_mithril_total: number;
    experience: number;
    tokens_spent: number;
    powder_spent_mithril: number;
    selected_pickaxe_ability: string;
    retroactive_tier2_token: boolean;
    crystals: {
        jade_crystal: Crystal;
        amber_crystal: Crystal;
        amethyst_crystal: Crystal;
        sapphire_crystal: Crystal;
        topaz_crystal: Crystal;
        jasper_crystal: Crystal;
        ruby_crystal: Crystal;
    };
    greater_mines_last_access: number;
    biomes: {
        dwarven: {
            statues_placed?: string[];
        };
        precursor: {
            parts_delivered: string[];
            talked_to_professor?: boolean;
        };
        goblin: {
            king_quest_active?: boolean;
            king_quests_completed?: number;
        };
    };
    powder_gemstone: number;
    powder_gemstone_total: number;
    daily_ores_mined_day_gemstone: number;
    daily_ores_mined_gemstone: number;
    daily_ores_mined_day_mithril_ore: number;
    daily_ores_mined_mithril_ore: number;
    last_reset: number;
    current_daily_effect: string;
    current_daily_effect_last_changed: number;
    powder_spent_gemstone: number;
}

export interface Crystal {
    state: string;
    total_found?: number;
    total_placed?: number;
}

export interface Forge {
    forge_processes: {
        forge_1?: {
            1?: ForgeItem,
            2?: ForgeItem,
            3?: ForgeItem,
            4?: ForgeItem,
            5?: ForgeItem,
        }
    }
}

export interface ForgeItem {
    type: string;
    id: string;
    startTime: number,
    slot: number,
    notified: boolean,
}