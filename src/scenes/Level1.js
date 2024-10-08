import { store } from '@game/Game';
import { LEVEL1DATA } from 'media/level1Data';

import { Level, LevelTilemap } from './Level';

/**
 * @type {FScene}
 */
export function Level1() {
	store.resetPlayerProgress();
	return Level(LEVEL1DATA);
}

/**
 * @type {FScene}
 */
export function Level1Tilemap() {
	return LevelTilemap(LEVEL1DATA[0].data);
}
