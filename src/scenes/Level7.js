import { LEVEL7DATA } from 'media/level7Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level7() {
	return Level(LEVEL7DATA);
}

/**
 * @type {FScene}
 */
export function Level7Tilemap() {
	return LevelTilemap(LEVEL7DATA[0].data);
}
