export const LEVEL10DATA = [
    {
        "name": "background",
        "tileset": "tiles",
        "data": [
            32,
            -1,
            -1,
            -1,
            38,
            39,
            32,
            39,
            -1,
            -1,
            40,
            31,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            45,
            50,
            51,
            40,
            43,
            42,
            43,
            42,
            43,
            32,
            -1,
            -1,
            -1,
            56,
            57,
            46,
            40,
            -1,
            -1,
            -1,
            -1,
            -1,
            44,
            32,
            -1,
            42,
            43,
            31,
            32,
            7,
            7,
            7,
            8,
            -1,
            -1,
            -1,
            36,
            37,
            -1,
            46,
            43,
            22,
            20,
            21,
            22,
            -1,
            -1,
            -1,
            42,
            43,
            -1,
            -1,
            -1,
            21,
            20,
            12,
            26,
            7,
            8,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            20,
            20,
            -1,
            -1,
            21,
            22,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            21,
            20,
            -1,
            -1,
            14,
            21,
            7,
            8,
            -1,
            -1,
            -1,
            -1,
            21,
            22,
            -1,
            9,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            21,
            20,
            16,
            15,
            0,
            1,
            1,
            10,
            10,
            3,
            16,
            4,
            13,
            14,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7
        ]
    },
    {
        "name": "collision",
        "entities": [
            {
                "name": "platform",
                "id": 0,
                "x": -8,
                "y": 32,
                "width": 40,
                "height": 24
            },
            {
                "name": "platform",
                "id": 1,
                "x": -8,
                "y": -32,
                "width": 8,
                "height": 72
            },
            {
                "name": "platform",
                "id": 5,
                "x": 32,
                "y": 64,
                "width": 32,
                "height": 8
            },
            {
                "name": "platform",
                "id": 6,
                "x": 104,
                "y": -24,
                "width": 8,
                "height": 120
            },
            {
                "name": "platform",
                "id": 7,
                "x": 0,
                "y": 48,
                "width": 16,
                "height": 48
            },
            {
                "name": "platform",
                "id": 8,
                "x": 32,
                "y": 48,
                "width": 16,
                "height": 24
            },
            {
                "name": "platform",
                "id": 10,
                "x": 0,
                "y": 88,
                "width": 112,
                "height": 8
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
                "height": 64
            },
            {
                "name": "player",
                "id": 10,
                "x": 0,
                "y": 24
            },
            {
                "name": "triggerEnemy",
                "id": 14,
                "x": 48,
                "y": 8,
                "width": 8,
                "height": 40,
                "nodes": [
                    {
                        "x": 16,
                        "y": 24
                    }
                ]
            },
            {
                "name": "enemy_ryan",
                "id": 15,
                "x": 16,
                "y": 24,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "triggerEnemy",
                "id": 16,
                "x": 64,
                "y": 24,
                "width": 8,
                "height": 40,
                "nodes": [
                    {
                        "x": 40,
                        "y": 40
                    },
                    {
                        "x": 32,
                        "y": 40
                    }
                ]
            },
            {
                "name": "enemy_thor",
                "id": 17,
                "x": 32,
                "y": 40,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "triggerEnemy",
                "id": 19,
                "x": 72,
                "y": 40,
                "width": 8,
                "height": 48,
                "nodes": [
                    {
                        "x": 48,
                        "y": 56
                    },
                    {
                        "x": 80,
                        "y": 80
                    }
                ]
            },
            {
                "name": "enemy_mojo",
                "id": 20,
                "x": 48,
                "y": 56,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "triggerEnemy",
                "id": 21,
                "x": 40,
                "y": 72,
                "width": 8,
                "height": 16,
                "nodes": [
                    {
                        "x": 64,
                        "y": 80
                    }
                ]
            },
            {
                "name": "enemy_thor",
                "id": 22,
                "x": 64,
                "y": 80,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "corn_item",
                "id": 25,
                "x": 32,
                "y": 80,
                "width": 8,
                "height": 8
            },
            {
                "name": "apple_item",
                "id": 27,
                "x": 16,
                "y": 64,
                "width": 8,
                "height": 8
            },
            {
                "name": "enemy_ryan",
                "id": 28,
                "x": 80,
                "y": 80,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            }
        ]
    },
    {
        "name": "reversers",
        "entities": [
            {
                "name": "reverser",
                "id": 0,
                "x": 88,
                "y": 80,
                "height": 8
            },
            {
                "name": "reverser",
                "id": 1,
                "x": 16,
                "y": 80,
                "height": 8
            }
        ]
    }
];