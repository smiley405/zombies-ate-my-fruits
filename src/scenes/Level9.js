import { LEVEL9DATA } from 'media/level9Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level9() {
	return Level(LEVEL9DATA);
}

/**
 * @type {FScene}
 */
export function Level9Tilemap() {
	return LevelTilemap(LEVEL9DATA[0].data);
}
