import { LEVEL2DATA } from 'media/level2Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level2() {
	return Level(LEVEL2DATA);
}

/**
 * @type {FScene}
 */
export function Level2Tilemap() {
	return LevelTilemap(LEVEL2DATA[0].data);
}
