import { GAME_HEIGHT, GAME_WIDTH } from '@game/const';
import { btn, root, store } from '@game/Game';
import { Sound } from '@game/Sound';
import { Rectangle } from '@packages/display';
import { BitmapFont } from '@packages/fonts';
import { Scene } from '@packages/scene';
import { WaitTimer } from '@packages/timer';
import { ENDDATA } from 'media/endData';
import { TILES } from 'media/tiles';
import { TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS } from 'media/tinyFont';

/**
 * @type {FScene}
 */
export function End() {
	/**
	 * @type {TBitmapFont[]}
	 */
	const texts = [];
	const levelData = ENDDATA;
	const self = Scene();
	const _destroy = self.destroy;
	const stage = self.stage;
	const bg = Rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT);
	stage.add(bg);

	store.gameWin = true;

	self.destroy = () => {
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

				if (layerName === 'texts') {
					const txt = BitmapFont(TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS, eValues['text']);
					if (eValues['name']) {
						txt.name = eValues['name'];
					}
					txt.x = x + w/2;
					txt.y = y;

					stage.add(txt);
					texts.push(txt);
				}
			});
		}
	});

	function setRestartTextVisibility(visible=true) {
		texts.forEach(txt => {
			if (txt.name === 'restart') {
				txt.visible = visible;
			}
		});
	}

	function setLinkTextVisibility(visible=true) {
		texts.forEach(txt => {
			if (txt.name === 'link') {
				txt.visible = visible;
			}
		});
	}

	setRestartTextVisibility(false);

	WaitTimer(4, () => {
		setLinkTextVisibility(false);
	});
	WaitTimer(2, () => {
		setRestartTextVisibility(true);
	});

	btn.is('restart').onDown = () => {
		if (store.gameWin) {
			Sound.music();
			store.gameWin = false;
			root.scene.set(1);
		}
	};

	Sound.killMusic();
	Sound.play('fxWin');

	return self;
}

