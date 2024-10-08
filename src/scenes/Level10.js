import { LEVEL10DATA } from 'media/level10Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level10() {
	return Level(LEVEL10DATA);
}

/**
 * @type {FScene}
 */
export function Level10Tilemap() {
	return LevelTilemap(LEVEL10DATA[0].data);
}
