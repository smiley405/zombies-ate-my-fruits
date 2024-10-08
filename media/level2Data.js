export const LEVEL2DATA = [
    {
        "name": "background",
        "tileset": "tiles",
        "data": [
            -1,
            -1,
            36,
            37,
            -1,
            -1,
            48,
            49,
            32,
            50,
            51,
            41,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            54,
            55,
            41,
            56,
            57,
            -1,
            33,
            38,
            39,
            -1,
            41,
            39,
            40,
            31,
            39,
            40,
            41,
            32,
            -1,
            44,
            45,
            46,
            47,
            45,
            46,
            44,
            45,
            46,
            47,
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
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            11,
            10,
            4,
            4,
            10,
            10,
            10,
            -1,
            3,
            1,
            15,
            16,
            5,
            6,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            8,
            12,
            13,
            13,
            13,
            13,
            13,
            13,
            13,
            13,
            13,
            13,
            14,
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
            -1,
            -1,
            -1,
            -1
        ]
    },
    {
        "name": "collision",
        "entities": [
            {
                "name": "platform",
                "id": 0,
                "x": 0,
                "y": 56,
                "width": 96,
                "height": 8
            },
            {
                "name": "platform",
                "id": 1,
                "x": -8,
                "y": 0,
                "width": 8,
                "height": 72
            },
            {
                "name": "platform",
                "id": 2,
                "x": 96,
                "y": 0,
                "width": 8,
                "height": 72
            }
        ]
    },
    {
        "name": "entities",
        "entities": [
            {
                "name": "player",
                "id": 1,
                "x": 0,
                "y": 48
            },
            {
                "name": "door",
                "id": 5,
                "x": 88,
                "y": 24,
                "width": 8,
                "height": 32
            },
            {
                "name": "apple_item",
                "id": 6,
                "x": 48,
                "y": 48,
                "width": 8,
                "height": 8
            },
            {
                "name": "enemy_thor",
                "id": 7,
                "x": 72,
                "y": 48,
                "values": {
                    "flipH": -1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "triggerEnemy",
                "id": 8,
                "x": 16,
                "y": 32,
                "width": 8,
                "height": 24,
                "nodes": [
                    {
                        "x": 72,
                        "y": 48
                    }
                ]
            },
            {
                "name": "hideEnemy",
                "id": 9,
                "x": 8,
                "y": 48,
                "width": 8,
                "height": 8
            }
        ]
    },
    {
        "name": "texts",
        "entities": [
            {
                "name": "text",
                "id": 0,
                "x": 0,
                "y": 80,
                "width": 8,
                "height": 8,
                "values": {
                    "text": "Press 'X' to Shoot",
                    "name": "shoot"
                }
            }
        ]
    }
];