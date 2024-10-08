export const LEVEL8DATA = [
    {
        "name": "background",
        "tileset": "tiles",
        "data": [
            -1,
            -1,
            37,
            -1,
            -1,
            32,
            37,
            -1,
            -1,
            32,
            36,
            37,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            43,
            50,
            51,
            -1,
            42,
            43,
            -1,
            43,
            -1,
            -1,
            -1,
            36,
            37,
            56,
            57,
            38,
            -1,
            -1,
            -1,
            -1,
            42,
            43,
            -1,
            42,
            43,
            -1,
            -1,
            -1,
            38,
            32,
            2,
            3,
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
            7,
            7,
            10,
            10,
            9,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            10,
            20,
            20,
            15,
            16,
            15,
            5,
            -1,
            -1,
            3,
            4,
            16,
            16,
            21,
            20,
            7,
            7,
            7,
            8,
            24,
            25,
            6,
            7,
            7,
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
                "width": 48,
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
            },
            {
                "name": "platform",
                "id": 4,
                "x": 64,
                "y": 56,
                "width": 40,
                "height": 8
            },
            {
                "name": "platform",
                "id": 5,
                "x": -8,
                "y": 40,
                "width": 24,
                "height": 32
            }
        ]
    },
    {
        "name": "entities",
        "entities": [
            {
                "name": "triggerEnemy",
                "id": 2,
                "x": 40,
                "y": 32,
                "width": 8,
                "height": 24,
                "nodes": [
                    {
                        "x": 16,
                        "y": 48
                    },
                    {
                        "x": 8,
                        "y": 32
                    }
                ]
            },
            {
                "name": "enemy_mojo",
                "id": 3,
                "x": 16,
                "y": 48,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "door",
                "id": 5,
                "x": 96,
                "y": 24,
                "width": 8,
                "height": 32
            },
            {
                "name": "enemy_thor",
                "id": 6,
                "x": 8,
                "y": 32,
                "values": {
                    "flipH": 1,
                    "state": "rise",
                    "triggered": true
                }
            },
            {
                "name": "enemy_ryan",
                "id": 7,
                "x": 88,
                "y": 48,
                "values": {
                    "flipH": -1,
                    "state": "rise",
                    "triggered": true
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
                        "x": 88,
                        "y": 48
                    }
                ]
            },
            {
                "name": "player",
                "id": 10,
                "x": 0,
                "y": 32
            },
            {
                "name": "hurt",
                "id": 11,
                "x": 40,
                "y": 64,
                "width": 32,
                "height": 8
            },
            {
                "name": "corn_item",
                "id": 12,
                "x": 48,
                "y": 40,
                "width": 8,
                "height": 8
            },
            {
                "name": "apple_item",
                "id": 13,
                "x": 24,
                "y": 40,
                "width": 8,
                "height": 8
            }
        ]
    }
];