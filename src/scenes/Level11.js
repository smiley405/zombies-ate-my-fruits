import { LEVEL11DATA } from 'media/level11Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level11() {
	return Level(LEVEL11DATA);
}

/**
 * @type {FScene}
 */
export function Level11Tilemap() {
	return LevelTilemap(LEVEL11DATA[0].data);
}
