

/**
 * @constant
 * @type {object}
 */
global.COMMODITIES = {
    [RESOURCE_UTRIUM_BAR]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_UTRIUM]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_UTRIUM]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_UTRIUM_BAR]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_LEMERGIUM_BAR]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_LEMERGIUM]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_LEMERGIUM]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_LEMERGIUM_BAR]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_ZYNTHIUM_BAR]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_ZYNTHIUM]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_ZYNTHIUM]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_ZYNTHIUM_BAR]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_KEANIUM_BAR]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_KEANIUM]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_KEANIUM]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_KEANIUM_BAR]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_GHODIUM_MELT]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_GHODIUM]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_GHODIUM]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_GHODIUM_MELT]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_OXIDANT]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_OXYGEN]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_OXYGEN]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_OXIDANT]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_REDUCTANT]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_HYDROGEN]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_HYDROGEN]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_REDUCTANT]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_PURIFIER]: {
        amount: 100,
        cooldown: 20,
        components: {
            [RESOURCE_CATALYST]: 500,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_CATALYST]: {
        amount: 500,
        cooldown: 20,
        components: {
            [RESOURCE_PURIFIER]: 100,
            [RESOURCE_ENERGY]: 200
        }
    },
    [RESOURCE_BATTERY]: {
        amount: 50,
        cooldown: 10,
        components: {
            [RESOURCE_ENERGY]: 600
        }
    },
    [RESOURCE_ENERGY]: {
        amount: 500,
        cooldown: 10,
        components: {
            [RESOURCE_BATTERY]: 50
        }
    },
    [RESOURCE_COMPOSITE]: {
        level: 1,
        amount: 20,
        cooldown: 50,
        components: {
            [RESOURCE_UTRIUM_BAR]: 20,
            [RESOURCE_ZYNTHIUM_BAR]: 20,
            [RESOURCE_ENERGY]: 20
        }
    },
    [RESOURCE_CRYSTAL]: {
        level: 2,
        amount: 6,
        cooldown: 21,
        components: {
            [RESOURCE_LEMERGIUM_BAR]: 6,
            [RESOURCE_KEANIUM_BAR]: 6,
            [RESOURCE_PURIFIER]: 6,
            [RESOURCE_ENERGY]: 45
        }
    },
    [RESOURCE_LIQUID]: {
        level: 3,
        amount: 12,
        cooldown: 60,
        components: {
            [RESOURCE_OXIDANT]: 12,
            [RESOURCE_REDUCTANT]: 12,
            [RESOURCE_GHODIUM_MELT]: 12,
            [RESOURCE_ENERGY]: 90
        }
    },

    [RESOURCE_WIRE]: {
        amount: 20,
        cooldown: 8,
        components: {
            [RESOURCE_UTRIUM_BAR]: 20,
            [RESOURCE_SILICON]: 100,
            [RESOURCE_ENERGY]: 40
        }
    },
    [RESOURCE_SWITCH]: {
        level: 1,
        amount: 5,
        cooldown: 70,
        components: {
            [RESOURCE_WIRE]: 40,
            [RESOURCE_OXIDANT]: 95,
            [RESOURCE_UTRIUM_BAR]: 35,
            [RESOURCE_ENERGY]: 20
        }
    },
    [RESOURCE_TRANSISTOR]: {
        level: 2,
        amount: 1,
        cooldown: 59,
        components: {
            [RESOURCE_SWITCH]: 4,
            [RESOURCE_WIRE]: 15,
            [RESOURCE_REDUCTANT]: 85,
            [RESOURCE_ENERGY]: 8
        }
    },
    [RESOURCE_MICROCHIP]: {
        level: 3,
        amount: 1,
        cooldown: 250,
        components: {
            [RESOURCE_TRANSISTOR]: 2,
            [RESOURCE_COMPOSITE]: 50,
            [RESOURCE_WIRE]: 117,
            [RESOURCE_PURIFIER]: 25,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_CIRCUIT]: {
        level: 4,
        amount: 1,
        cooldown: 800,
        components: {
            [RESOURCE_MICROCHIP]: 1,
            [RESOURCE_TRANSISTOR]: 5,
            [RESOURCE_SWITCH]: 4,
            [RESOURCE_OXIDANT]: 115,
            [RESOURCE_ENERGY]: 32
        }
    },
    [RESOURCE_DEVICE]: {
        level: 5,
        amount: 1,
        cooldown: 600,
        components: {
            [RESOURCE_CIRCUIT]: 1,
            [RESOURCE_MICROCHIP]: 3,
            [RESOURCE_CRYSTAL]: 110,
            [RESOURCE_GHODIUM_MELT]: 150,
            [RESOURCE_ENERGY]: 64
        }
    },

    [RESOURCE_CELL]: {
        amount: 20,
        cooldown: 8,
        components: {
            [RESOURCE_LEMERGIUM_BAR]: 20,
            [RESOURCE_BIOMASS]: 100,
            [RESOURCE_ENERGY]: 40
        }
    },
    [RESOURCE_PHLEGM]: {
        level: 1,
        amount: 2,
        cooldown: 35,
        components: {
            [RESOURCE_CELL]: 20,
            [RESOURCE_OXIDANT]: 36,
            [RESOURCE_LEMERGIUM_BAR]: 16,
            [RESOURCE_ENERGY]: 8
        }
    },
    [RESOURCE_TISSUE]: {
        level: 2,
        amount: 2,
        cooldown: 164,
        components: {
            [RESOURCE_PHLEGM]: 10,
            [RESOURCE_CELL]: 10,
            [RESOURCE_REDUCTANT]: 110,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_MUSCLE]: {
        level: 3,
        amount: 1,
        cooldown: 250,
        components: {
            [RESOURCE_TISSUE]: 3,
            [RESOURCE_PHLEGM]: 3,
            [RESOURCE_ZYNTHIUM_BAR]: 50,
            [RESOURCE_REDUCTANT]: 50,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_ORGANOID]: {
        level: 4,
        amount: 1,
        cooldown: 800,
        components: {
            [RESOURCE_MUSCLE]: 1,
            [RESOURCE_TISSUE]: 5,
            [RESOURCE_PURIFIER]: 208,
            [RESOURCE_OXIDANT]: 256,
            [RESOURCE_ENERGY]: 32
        }
    },
    [RESOURCE_ORGANISM]: {
        level: 5,
        amount: 1,
        cooldown: 600,
        components: {
            [RESOURCE_ORGANOID]: 1,
            [RESOURCE_LIQUID]: 150,
            [RESOURCE_TISSUE]: 6,
            [RESOURCE_CELL]: 310,
            [RESOURCE_ENERGY]: 64
        }
    },

    [RESOURCE_ALLOY]: {
        amount: 20,
        cooldown: 8,
        components: {
            [RESOURCE_ZYNTHIUM_BAR]: 20,
            [RESOURCE_METAL]: 100,
            [RESOURCE_ENERGY]: 40
        }
    },
    [RESOURCE_TUBE]: {
        level: 1,
        amount: 2,
        cooldown: 45,
        components: {
            [RESOURCE_ALLOY]: 40,
            [RESOURCE_ZYNTHIUM_BAR]: 16,
            [RESOURCE_ENERGY]: 8
        }
    },
    [RESOURCE_FIXTURES]: {
        level: 2,
        amount: 1,
        cooldown: 115,
        components: {
            [RESOURCE_COMPOSITE]: 20,
            [RESOURCE_ALLOY]: 41,
            [RESOURCE_OXIDANT]: 161,
            [RESOURCE_ENERGY]: 8
        }
    },
    [RESOURCE_FRAME]: {
        level: 3,
        amount: 1,
        cooldown: 125,
        components: {
            [RESOURCE_FIXTURES]: 2,
            [RESOURCE_TUBE]: 4,
            [RESOURCE_REDUCTANT]: 330,
            [RESOURCE_ZYNTHIUM_BAR]: 31,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_HYDRAULICS]: {
        level: 4,
        amount: 1,
        cooldown: 800,
        components: {
            [RESOURCE_LIQUID]: 150,
            [RESOURCE_FIXTURES]: 3,
            [RESOURCE_TUBE]: 15,
            [RESOURCE_PURIFIER]: 208,
            [RESOURCE_ENERGY]: 32
        }
    },
    [RESOURCE_MACHINE]: {
        level: 5,
        amount: 1,
        cooldown: 600,
        components: {
            [RESOURCE_HYDRAULICS]: 1,
            [RESOURCE_FRAME]: 2,
            [RESOURCE_FIXTURES]: 3,
            [RESOURCE_TUBE]: 12,
            [RESOURCE_ENERGY]: 64
        }
    },

    [RESOURCE_CONDENSATE]: {
        amount: 20,
        cooldown: 8,
        components: {
            [RESOURCE_KEANIUM_BAR]: 20,
            [RESOURCE_MIST]: 100,
            [RESOURCE_ENERGY]: 40
        }
    },
    [RESOURCE_CONCENTRATE]: {
        level: 1,
        amount: 3,
        cooldown: 41,
        components: {
            [RESOURCE_CONDENSATE]: 30,
            [RESOURCE_KEANIUM_BAR]: 15,
            [RESOURCE_REDUCTANT]: 54,
            [RESOURCE_ENERGY]: 12
        }
    },
    [RESOURCE_EXTRACT]: {
        level: 2,
        amount: 2,
        cooldown: 128,
        components: {
            [RESOURCE_CONCENTRATE]: 10,
            [RESOURCE_CONDENSATE]: 30,
            [RESOURCE_OXIDANT]: 60,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_SPIRIT]: {
        level: 3,
        amount: 1,
        cooldown: 200,
        components: {
            [RESOURCE_EXTRACT]: 2,
            [RESOURCE_CONCENTRATE]: 6,
            [RESOURCE_REDUCTANT]: 90,
            [RESOURCE_PURIFIER]: 20,
            [RESOURCE_ENERGY]: 16
        }
    },
    [RESOURCE_EMANATION]: {
        level: 4,
        amount: 1,
        cooldown: 800,
        components: {
            [RESOURCE_SPIRIT]: 2,
            [RESOURCE_EXTRACT]: 2,
            [RESOURCE_CONCENTRATE]: 3,
            [RESOURCE_KEANIUM_BAR]: 112,
            [RESOURCE_ENERGY]: 32
        }
    },
    [RESOURCE_ESSENCE]: {
        level: 5,
        amount: 1,
        cooldown: 600,
        components: {
            [RESOURCE_EMANATION]: 1,
            [RESOURCE_SPIRIT]: 3,
            [RESOURCE_CRYSTAL]: 110,
            [RESOURCE_GHODIUM_MELT]: 150,
            [RESOURCE_ENERGY]: 64
        }
    },
};



