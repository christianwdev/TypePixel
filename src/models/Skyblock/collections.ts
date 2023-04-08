export enum CollectionType {
    'COCOA_BEANS' = "INK_SACK:3",
    'CARROT_ITEM' = "CARROT_ITEM",
    'CACTUS' = "CACTUS",
    'RAW_CHICKEN' = "RAW_CHICKEN",
    'SUGAR_CANE' = "SUGAR_CANE",
    'PUMPKIN' = "PUMPKIN",
    'WHEAT' = "WHEAT",
    'SEEDS' = "SEEDS",
    'MUSHROOM_COLLECTION' = "MUSHROOM_COLLECTION",
    'RABBIT' = "RABBIT",
    'NETHER_STALK' = "NETHER_STALK",
    'MUTTON' = "MUTTON",
    'MELON' = "MELON",
    'POTATO_ITEM' = "POTATO_ITEM",
    'LEATHER' = "LEATHER",
    'PORK' = "PORK",
    'FEATHER' = "FEATHER",
    'LAPIS_LAZULI' = "INK_SACK:4",
    'REDSTONE' = "REDSTONE",
    'COAL' = "COAL",
    'MYCEL' = "MYCEL",
    'ENDER_STONE' = "ENDER_STONE",
    'QUARTZ' = "QUARTZ",
    'SAND' = "SAND",
    'IRON_INGOT' = "IRON_INGOT",
    'GEMSTONE_COLLECTION' = "GEMSTONE_COLLECTION",
    'OBSIDIAN' = "OBSIDIAN",
    'DIAMOND' = "DIAMOND",
    'COBBLESTONE' = "COBBLESTONE",
    'GLOWSTONE_DUST' = "GLOWSTONE_DUST",
    'GOLD_INGOT' = "GOLD_INGOT",
    'GRAVEL' = "GRAVEL",
    'HARD_STONE' = "HARD_STONE",
    'MITHRIL_ORE' = "MITHRIL_ORE",
    'EMERALD' = "EMERALD",
    'RED_SAND' = "SAND:1",
    'ICE' = "ICE",
    'SULPHUR_ORE' = "SULPHUR_ORE",
    'NETHERRACK' = "NETHERRACK",
    'ENDER_PEARL' = "ENDER_PEARL",
    'CHILI_PEPPER' = "CHILI_PEPPER",
    'SLIME_BALL' = "SLIME_BALL",
    'MAGMA_CREAM' = "MAGMA_CREAM",
    'GHAST_TEAR' = "GHAST_TEAR",
    'SULPHUR' = "SULPHUR",
    'ROTTEN_FLESH' = "ROTTEN_FLESH",
    'SPIDER_EYE' = "SPIDER_EYE",
    'BONE' = "BONE",
    'BLAZE_ROD' = "BLAZE_ROD",
    'STRING' = "STRING",

    'ACACIA' = "LOG_2",
    'SPRUCE' = "LOG:1",
    'JUNGLE' = "LOG:3",
    'BIRCH' = "LOG:2",
    'OAK' = "LOG",
    'DARK_OAK' = "LOG_2:1",

    'WATER_LILY' = "WATER_LILY",
    'PRISMARINE_SHARD' = "PRISMARINE_SHARD",
    'INK_SACK' = "INK_SACK",
    'RAW_FISH' = "RAW_FISH",
    'PUFFERFISH' = "RAW_FISH:3",
    'CLOWNFISH' = "RAW_FISH:2",
    'RAW_SALMON' = "RAW_FISH:1",
    'MAGMA_FISH' = "MAGMA_FISH",
    'PRISMARINE_CRYSTALS' = "PRISMARINE_CRYSTALS",
    'CLAY_BALL' = "CLAY_BALL",
    'SPONGE' = "SPONGE",
}

export interface Collection {
    [CollectionType.ACACIA]?: number;
    [CollectionType.BIRCH]?: number;
    [CollectionType.BLAZE_ROD]?: number;
    [CollectionType.BONE]?: number;
    [CollectionType.CACTUS]?: number;
    [CollectionType.CARROT_ITEM]?: number;
    [CollectionType.CHILI_PEPPER]?: number;
    [CollectionType.CLAY_BALL]?: number;
    [CollectionType.CLOWNFISH]: number;
    [CollectionType.COAL]?: number;
    [CollectionType.COBBLESTONE]?: number;
    [CollectionType.COCOA_BEANS]?: number;
    [CollectionType.DARK_OAK]?: number;
    [CollectionType.DIAMOND]?: number;
    [CollectionType.EMERALD]?: number;
    [CollectionType.ENDER_PEARL]?: number;
    [CollectionType.ENDER_STONE]?: number;
    [CollectionType.FEATHER]?: number;
    [CollectionType.GEMSTONE_COLLECTION]?: number;
    [CollectionType.GHAST_TEAR]?: number;
    [CollectionType.GLOWSTONE_DUST]?: number;
    [CollectionType.GOLD_INGOT]?: number;
    [CollectionType.GRAVEL]?: number;
    [CollectionType.HARD_STONE]?: number;
    [CollectionType.ICE]?: number;
    [CollectionType.INK_SACK]?: number;
    [CollectionType.IRON_INGOT]?: number;
    [CollectionType.JUNGLE]?: number;
    [CollectionType.LAPIS_LAZULI]?: number;
    [CollectionType.LEATHER]?: number;
    [CollectionType.MAGMA_CREAM]?: number;
    [CollectionType.MAGMA_FISH]?: number;
    [CollectionType.MELON]?: number;
    [CollectionType.MITHRIL_ORE]?: number;
    [CollectionType.MUSHROOM_COLLECTION]?: number;
    [CollectionType.MUTTON]?: number;
    [CollectionType.MYCEL]?: number;
    [CollectionType.NETHERRACK]?: number;
    [CollectionType.NETHER_STALK]?: number;
    [CollectionType.OAK]?: number;
    [CollectionType.OBSIDIAN]?: number;
    [CollectionType.PORK]?: number;
    [CollectionType.POTATO_ITEM]?: number;
    [CollectionType.PRISMARINE_CRYSTALS]?: number;
    [CollectionType.PRISMARINE_SHARD]?: number;
    [CollectionType.PUFFERFISH]?: number;
    [CollectionType.PUMPKIN]?: number;
    [CollectionType.QUARTZ]?: number;
    [CollectionType.RABBIT]?: number;
    [CollectionType.RAW_CHICKEN]?: number;
    [CollectionType.RAW_FISH]?: number,
    [CollectionType.RAW_SALMON]?: number;
    [CollectionType.REDSTONE]?: number;
    [CollectionType.RED_SAND]?: number;
    [CollectionType.ROTTEN_FLESH]?: number;
    [CollectionType.SAND]?: number;
    [CollectionType.SEEDS]?: number;
    [CollectionType.SLIME_BALL]?: number;
    [CollectionType.SPIDER_EYE]?: number;
    [CollectionType.SPONGE]?: number;
    [CollectionType.SPRUCE]?: number;
    [CollectionType.STRING]?: number;
    [CollectionType.SUGAR_CANE]?: number;
    [CollectionType.SULPHUR]?: number;
    [CollectionType.SULPHUR_ORE]?: number;
    [CollectionType.WATER_LILY]?: number;
    [CollectionType.WHEAT]?: number;
}