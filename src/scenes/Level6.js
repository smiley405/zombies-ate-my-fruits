import { LEVEL6DATA } from 'media/level6Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level6() {
	return Level(LEVEL6DATA);
}

/**
 * @type {FScene}
 */
export function Level6Tilemap() {
	return LevelTilemap(LEVEL6DATA[0].data);
}
