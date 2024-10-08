export const LEVEL11DATA = [
    {
        "name": "background",
        "tileset": "tiles",
        "data": [
            37,
            -1,
            -1,
            39,
            -1,
            38,
            39,
            32,
            49,
            37,
            32,
            33,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            45,
            54,
            32,
            43,
            44,
            45,
            -1,
            -1,
            55,
            -1,
            55,
            39,
            50,
            51,
            42,
            -1,
            48,
            49,
            -1,
            -1,
            45,
            43,
            -1,
            45,
            56,
            57,
            -1,
            42,
            31,
            55,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            42,
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
            9,
            0,
            1,
            10,
            10,
            1,
            15,
            5,
            3,
            10,
            1,
            15,
            15,
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
                "width": 112,
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
                "x": 104,
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
                "name": "triggerEnemy",
                "id": 2,
                "x": 40,
                "y": 24,
                "width": 8,
                "height": 32,
                "nodes": [
                    {
                        "x": 80,
                        "y": 48
                    },
                    {
                        "x": 16,
                        "y": 48
                    }
                ]
            },
            {
                "name": "enemy_mojo",
                "id": 3,
                "x": 80,
                "y": 48,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "enemy_ryan",
                "id": 4,
                "x": 16,
                "y": 48,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "enemy_mojo",
                "id": 6,
                "x": 72,
                "y": 48,
                "values": {
                    "flipH": -1,
                    "state": "run",
                    "triggered": false
                }
            },
            {
                "name": "enemy_ryan",
                "id": 7,
                "x": 48,
                "y": 48,
                "values": {
                    "flipH": -1,
                    "state": "run",
                    "triggered": false
                }
            },
            {
                "name": "enemy_thor",
                "id": 8,
                "x": 32,
                "y": 48,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": false
                }
            },
            {
                "name": "triggerEnemy",
                "id": 9,
                "x": 56,
                "y": 32,
                "width": 8,
                "height": 24,
                "nodes": [
                    {
                        "x": 8,
                        "y": 48
                    }
                ]
            },
            {
                "name": "enemy_mojo",
                "id": 10,
                "x": 8,
                "y": 48,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "door",
                "id": 12,
                "x": 96,
                "y": 32,
                "width": 8,
                "height": 24
            },
            {
                "name": "apple_item",
                "id": 13,
                "x": 48,
                "y": 40,
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
                "x": 0,
                "y": 48,
                "height": 8
            },
            {
                "name": "reverser",
                "id": 1,
                "x": 88,
                "y": 48,
                "height": 8
            }
        ]
    }
];