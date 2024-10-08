import { LEVEL4DATA } from 'media/level4Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level4() {
	return Level(LEVEL4DATA);
}

/**
 * @type {FScene}
 */
export function Level4Tilemap() {
	return LevelTilemap(LEVEL4DATA[0].data);
}
