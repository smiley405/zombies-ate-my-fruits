import { LEVEL3DATA } from 'media/level3Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level3() {
	return Level(LEVEL3DATA);
}

/**
 * @type {FScene}
 */
export function Level3Tilemap() {
	return LevelTilemap(LEVEL3DATA[0].data);
}
