import { AppleIcon } from '@game/entities/AppleIcon';
import { CornIcon } from '@game/entities/CornIcon';
import { store } from '@game/Game';
import { BitmapFont } from '@packages/fonts';
import { Scene } from '@packages/scene';
import { HUDDATA } from 'media/hudData';
import { TILES } from 'media/tiles';
import { TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS } from 'media/tinyFont';

import { TransitionScreen } from './TransitionScreen';

/**
 * @type {TIconBase}
 */
let appleIcon;
/**
 * @type {TIconBase}
 */
let cornIcon;
/**
 * @type {TBitmapFont}
 */
let appleText;
/**
 * @type {TBitmapFont}
 */
let cornText;

/**
 * @type {FScene}
 */
export function Hud() {
	const levelData = HUDDATA;
	const self = Scene();
	const stage = self.stage;

	const _destroy = self.destroy;

	self.destroy = () => {
		if (appleIcon) {
			appleIcon.detach();
			cornIcon.detach();
			appleText.detach();
			cornText.detach();
		}
		_destroy();
	};

	levelData.forEach((layer, i) => {
		if (i) {
			const layerName = layer.name;

			const entities = layer.entities;

			entities.forEach(entity => {
				const entityname = entity.name;
				const w = entity.width ?? TILES.w;
				const h = entity.height ?? TILES.h;
				const x = entity.x;
				const y = entity.y;
				const eValues = entity.values;
				const nodes = /** @type {TNodes} */ (entity.nodes);

				/**
				 * @param {TIconBase} icon
				 * @param {TIconBase} newIcon - IconFunction
				 * @returns {TIconBase}
				 */
				const createIcon = (icon, newIcon) => {
					if (icon) {
						icon.reset();
					} else {
						icon = newIcon;
					}
					icon.x = x;
					icon.y = y;
					icon.addTo(stage);
					icon.body.visible = false;
					return icon;
				};

				if (layerName === 'hud') {
					if (entityname === 'appleIcon') {
						appleIcon = createIcon(appleIcon, AppleIcon(entityname, w, h));
					}
					if (entityname === 'cornIcon') {
						cornIcon = createIcon(cornIcon, CornIcon(entityname, w, h));
					}
				}
			});
		}
	});

	/**
	 * @param {TBitmapFont} txt 
	 * @param {number} x 
	 * @param {number} y 
	 * @returns {TBitmapFont}
	 */
	function createText(txt, x, y) {
		txt = txt || BitmapFont(TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS, 'x0');
		txt.x = x;
		txt.y = y;

		stage.add(txt);
		return txt;
	}

	appleText = createText(appleText, 14, 8);
	cornText = createText(cornText, 15*3, 8);

	let transition = TransitionScreen();

	if (!store.loaded) {
		transition.addTo(stage);
	}

	function isTransitionCompleted() {
		return transition && transition.active && !store.loaded;
	}

	self.update = () => {
		if (!isTransitionCompleted) {
			return;
		}

		store.loaded = true;
		transition = null;

		const totalApple = store.fireBall.total;
		const totalCorn = store.laserBeam.total;

		appleIcon.update();
		cornIcon.update();

		appleText.text = `x${totalApple}`;
		cornText.text = `x${totalCorn}`;

		if (store.currentPowerName === 'fireball') {
			cornIcon.play('idle');

			if (totalApple > 0) {
				appleIcon.play('selected');
			} else {
				appleIcon.play('idle');
			}
		}

		if (store.currentPowerName === 'laserBeam') {
			appleIcon.play('idle');

			if (totalCorn > 0) {
				cornIcon.play('selected');
			} else {
				cornIcon.play('idle');
			}
		}
	};

	function setVisibility(visible=true) {
		appleIcon.skin.visible = visible;
		cornIcon.skin.visible = visible;
		appleText.visible = visible;
		cornText.visible = visible;
	}

	return self;
}

