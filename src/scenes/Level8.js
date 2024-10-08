import { LEVEL8DATA } from 'media/level8Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level8() {
	return Level(LEVEL8DATA);
}

/**
 * @type {FScene}
 */
export function Level8Tilemap() {
	return LevelTilemap(LEVEL8DATA[0].data);
}
