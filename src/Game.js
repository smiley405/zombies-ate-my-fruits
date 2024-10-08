import { Keyboard } from '@packages/inputs';
import { CanvasLayers } from '@packages/render';
import { SceneManager } from '@packages/scene';
import { Ticker } from '@packages/ticker';
import { killTimers, updateTimers } from '@packages/timer';

import { GAME_HEIGHT, GAME_WIDTH } from './const';
import { ActorPool } from './entities/ActorPool';
import { DeathExplosionPool } from './entities/DeathExplosionPool';
import { ItemsPool } from './entities/ItemsPool';
import { PowerPool } from './entities/PowerPool';
import { SfxPool } from './entities/SfxPool';
import { Resizer } from './Resizer';
import { Level1, Level1Tilemap } from './scenes';
import { End } from './scenes/End';
import { Hud } from './scenes/Hud';
import { Level2, Level2Tilemap } from './scenes/Level2';
import { Level3, Level3Tilemap } from './scenes/Level3';
import { Level4, Level4Tilemap } from './scenes/Level4';
import { Level5, Level5Tilemap } from './scenes/Level5';
import { Level6, Level6Tilemap } from './scenes/Level6';
import { Level7, Level7Tilemap } from './scenes/Level7';
import { Level8, Level8Tilemap } from './scenes/Level8';
import { Level9, Level9Tilemap } from './scenes/Level9';
import { Level10, Level10Tilemap } from './scenes/Level10';
import { Level11, Level11Tilemap } from './scenes/Level11';
import { Sound } from './Sound';

export const btn = Keyboard({
	left: 'ArrowLeft',
	right: 'ArrowRight',
	jump: 'z',
	attack: 'x',
	select: 'c',
	debug: 'q',
	fscreen: 'e',
	restart: 'r',
});

/**
 * @type {TStore}
 */
export const store = (() => {
	return {
		sceneIndex: 1,
		// player
		fireBall: { name: 'fireball', total: 0, max: 50 },
		laserBeam: { name: 'laserBeam', total: 0, max: 50 },
		currentPowerName: 'fireball',
		resetPlayerProgress: () => {
			store.fireBall.total = 0;
			store.laserBeam.total = 0;
			store.currentPowerName = 'fireball';
		},
		setPlayerPower: (powerType, total) => {
			if (powerType === 'laserBeam') {
				store.laserBeam.total = total;
				if (store.laserBeam.total > store.laserBeam.max) {
					store.laserBeam.total = store.laserBeam.max;
				}
				if (store.currentPowerName === 'fireball' && !store.fireBall.total && store.laserBeam.total) {
					store.currentPowerName = 'laserBeam';
				}
			} else {
				store.fireBall.total = total;

				if (store.fireBall.total > store.fireBall.max) {
					store.fireBall.total = store.fireBall.max;
				}

				if (store.currentPowerName === 'laserBeam' && !store.laserBeam.total && store.fireBall.total) {
					store.currentPowerName = 'fireball';
				}
			}
		},
	};
})();

export const ticker = Ticker();

/**
 * @type {TRoot}
 */
export const root = (() => {
	const scenes = [
		// maybe menu
		[null, null, null],
		// levels
		[Level1, Level1Tilemap, Hud],
		[Level2, Level2Tilemap, Hud],
		[Level3, Level3Tilemap, Hud],
		[Level4, Level4Tilemap, Hud],
		[Level5, Level5Tilemap, Hud],
		[Level6, Level6Tilemap, Hud],
		[Level7, Level7Tilemap, Hud],
		[Level8, Level8Tilemap, Hud],
		[Level9, Level9Tilemap, Hud],
		[Level10, Level10Tilemap, Hud],
		[Level11, Level11Tilemap, Hud],
		// end scene
		[null, null, End]
	];

	const layers = CanvasLayers();
	const bgSceneManager = SceneManager();
	const fgSceneManager = SceneManager();
	const uiSceneManager = SceneManager();
	const actorPool = ActorPool(); 
	const sfxPool = SfxPool(); 
	const powerPool = PowerPool(); 
	const itemsPool = ItemsPool(); 
	const deathExplosionPool = DeathExplosionPool(); 

	/**
	 * @type {TRootSceneManager}
	 */
	const scene = {
		set: (sceneIndex) => {
			const sc = scenes[sceneIndex];
			const fg = sc[0];
			const bg = sc[1];
			const hud = sc[2];
			fgSceneManager.clear();
			bgSceneManager.clear();
			uiSceneManager.clear();

			if (fg) {
				fgSceneManager.set(fg);
			}
			if (bg) {
				bgSceneManager.set(bg);
			}
			if (hud) {
				uiSceneManager.set(hud);
			}

			store.sceneIndex = sceneIndex;
		},
		render: (fg, bg, ui) => {
			fgSceneManager.render(fg.ctx);
			bgSceneManager.render(bg.ctx);
			uiSceneManager.render(ui.ctx);
		},
		update: () => {
			fgSceneManager.update();
			uiSceneManager.update();
		},
		reload: () => {
			killTimers();
			store.resetPlayerProgress();

			switch (store.sceneIndex) {
			case 2:
				store.setPlayerPower('fireball', 1);
				break;
			case 5:
				store.setPlayerPower('fireball', 1);
				break;
			case 7:
				store.setPlayerPower('fireball', 1);
				break;
			case 11:
				store.setPlayerPower('fireball', 2);
				break;
			}
			scene.set(store.sceneIndex);
		},
		next: () => {
			killTimers();
			store.sceneIndex += 1;
			scene.set(store.sceneIndex);
		}
	};

	return {
		scene,
		layers,
		actorPool,
		sfxPool,
		powerPool,
		dexpPool: deathExplosionPool,
		itemsPool
	};
})();

export function Game() {
	const sceneManager = root.scene;
	const layers = root.layers;

	const bg = layers.add('bg', GAME_WIDTH, GAME_HEIGHT);
	const fg = layers.add('fg', GAME_WIDTH, GAME_HEIGHT);
	const ui = layers.add('ui', GAME_WIDTH, GAME_HEIGHT);

	document.body.appendChild(bg.canvas);
	document.body.appendChild(fg.canvas);
	document.body.appendChild(ui.canvas);

	ticker.add('update', () => {
		updateTimers();
		sceneManager.update();
	});
	ticker.add('render', () => {
		sceneManager.render(fg, bg, ui);
	});
	sceneManager.reload();
	Resizer([bg.canvas, fg.canvas, ui.canvas], {width: GAME_WIDTH, height: GAME_HEIGHT});
	Sound.music();
}
