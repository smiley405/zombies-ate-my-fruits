import { LEVEL5DATA } from 'media/level5Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level5() {
	return Level(LEVEL5DATA);
}

/**
 * @type {FScene}
 */
export function Level5Tilemap() {
	return LevelTilemap(LEVEL5DATA[0].data);
}
