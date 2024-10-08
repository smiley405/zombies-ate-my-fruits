export const LEVEL9DATA = [
    {
        "name": "background",
        "tileset": "tiles",
        "data": [
            38,
            -1,
            38,
            -1,
            -1,
            38,
            -1,
            -1,
            -1,
            38,
            -1,
            32,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            31,
            50,
            51,
            36,
            37,
            -1,
            -1,
            -1,
            43,
            -1,
            38,
            -1,
            -1,
            56,
            57,
            42,
            32,
            37,
            32,
            37,
            -1,
            32,
            -1,
            -1,
            38,
            -1,
            38,
            -1,
            -1,
            -1,
            42,
            43,
            -1,
            36,
            37,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            5,
            4,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            6,
            7,
            7,
            7,
            16,
            4,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            26,
            -1,
            7,
            8,
            -1,
            -1,
            -1,
            6,
            8,
            -1,
            -1,
            -1,
            -1,
            -1,
            20,
            20,
            16,
            10,
            5,
            -1,
            19,
            -1,
            18,
            19,
            18,
            4,
            21,
            20,
            7,
            7,
            7,
            24,
            24,
            25,
            24,
            24,
            25,
            7,
            13,
            14,
            13,
            13,
            13,
            13,
            13,
            12,
            13,
            13,
            13,
            14
        ]
    },
    {
        "name": "collision",
        "entities": [
            {
                "name": "platform",
                "id": 0,
                "x": -8,
                "y": 64,
                "width": 24,
                "height": 32
            },
            {
                "name": "platform",
                "id": 1,
                "x": -8,
                "y": 24,
                "width": 8,
                "height": 72
            },
            {
                "name": "platform",
                "id": 2,
                "x": 8,
                "y": 80,
                "width": 32,
                "height": 16
            },
            {
                "name": "platform",
                "id": 4,
                "x": 64,
                "y": 48,
                "width": 48,
                "height": 8
            },
            {
                "name": "platform",
                "id": 5,
                "x": 40,
                "y": 64,
                "width": 16,
                "height": 8
            },
            {
                "name": "platform",
                "id": 6,
                "x": 104,
                "y": 8,
                "width": 8,
                "height": 56
            }
        ]
    },
    {
        "name": "entities",
        "entities": [
            {
                "name": "door",
                "id": 5,
                "x": 96,
                "y": 24,
                "width": 8,
                "height": 32
            },
            {
                "name": "player",
                "id": 10,
                "x": 0,
                "y": 56
            },
            {
                "name": "hurt",
                "id": 11,
                "x": 32,
                "y": 88,
                "width": 64,
                "height": 8
            },
            {
                "name": "triggerEnemy",
                "id": 12,
                "x": 40,
                "y": 48,
                "width": 8,
                "height": 16,
                "nodes": [
                    {
                        "x": 8,
                        "y": 56
                    },
                    {
                        "x": 72,
                        "y": 40
                    }
                ]
            },
            {
                "name": "enemy_ryan",
                "id": 13,
                "x": 16,
                "y": 72,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "enemy_ryan",
                "id": 16,
                "x": 72,
                "y": 40,
                "values": {
                    "flipH": -1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "enemy_mojo",
                "id": 17,
                "x": 8,
                "y": 56,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "triggerEnemy",
                "id": 18,
                "x": 32,
                "y": 72,
                "width": 8,
                "height": 8,
                "nodes": [
                    {
                        "x": 16,
                        "y": 72
                    }
                ]
            },
            {
                "name": "corn_item",
                "id": 19,
                "x": 40,
                "y": 24,
                "width": 8,
                "height": 8
            },
            {
                "name": "apple_item",
                "id": 20,
                "x": 24,
                "y": 64,
                "width": 8,
                "height": 8
            }
        ]
    },
    {
        "name": "reversers",
        "entities": [
            {
                "name": "reverser",
                "id": 0,
                "x": 56,
                "y": 40,
                "height": 24
            },
            {
                "name": "reverser",
                "id": 1,
                "x": 88,
                "y": 40,
                "height": 16
            }
        ]
    }
];