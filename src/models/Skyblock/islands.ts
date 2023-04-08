export interface NetherIslandPlayerData {
    kuudra_completed_tiers: {
        none: number,
        highest_wave_none: number,
        basic: number,
        highest_wave_basic: number,
        hot: number,
        highest_wave_hot: number,
        burning: number,
        highest_wave_burning: number,
        fiery: number,
        highest_wave_fiery: number,
        infernal: number,
        highest_wave_infernal: number,

    };
    dojo: {
        dojo_points_mobs_kb: number,
        dojo_time_mob_kb: number,
        dojo_points_wall_jump: number,
        dojo_time_wall_jump: number,
        dojo_points_archer: number,
        dojo_time_archer: number,
        dojo_points_sword_swap: number,
        dojo_time_sword_swap: number,
        dojo_points_snake: number,
        dojo_time_snake: number,
        dojo_points_fireball: number,
        dojo_time_fireball: number,
        dojo_points_lock_head: number,
        dojo_time_lock_head: number,
    };
    abiphone: {
        contact_data: {
            [key: string]: {
                last_call: number,
            }
        };
        games: object;
        operator_chip: object;
    };
    matriarch: {
        pearls_collected: number,
        last_attempt: number,
    };
    kuudra_party_finder: {
        search_settings: object;
        group_builder: {
            tier: string;
            note: string;
            combat_level_required: number;
        };
    };
}