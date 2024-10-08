import { GAME_WIDTH } from '@game/const';
import { TriggerEnemy } from '@game/entities/TriggerEnemy';
import { root, store } from '@game/Game';
import { Rectangle } from '@packages/display';
import { Tilemap } from '@packages/display/Tilemap';
import { BitmapFont } from '@packages/fonts';
import { Scene } from '@packages/scene';
import { IntervalTimer } from '@packages/timer';
import { getChildIndex } from '@packages/utils/misc';
import { GridCellsX, TILES } from 'media/tiles';
import { TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS } from 'media/tinyFont';


/**
 * @type {FLevel}
 */
export function Level(levelData) {
	const actorPool = root.actorPool;
	const sfxPool = root.sfxPool;
	const powerPool = root.powerPool;
	const dexpPool = root.dexpPool;
	const itemsPool = root.itemsPool;
	const o = Scene();
	const _destroy = o.destroy;

	const self = Object.assign(o, /** @type {TScene}*/({
		destroy: () => {
			actorPool.detach();
			sfxPool.detach();
			powerPool.detach();
			dexpPool.detach();
			itemsPool.detach();
			_destroy();
		}
	}));

	const stage = self.stage;
	/**
	 * @type {TRect[]}
	 */
	const platforms = [];
	/**
	 * @type {TEnemy[]}
	 */
	const enemies = [];
	/**
	 * @type {TItemBase[]}
	 */
	const items = [];
	/**
	 * @type {TRect[]}
	 */
	const reversers = [];
	/**
	 * @type {TRect[]}
	 */
	const doors = [];
	/**
	 * @type {TRect[]}
	 */
	const hurts = [];
	/**
	 * @type {TRect[]}
	 */
	const enemyHiders = [];
	/**
	 * @type {TTriggerEnemy[]}
	 */
	const enemyTriggers = [];
	/**
	 * @type {TBitmapFont[]}
	 */
	const texts = [];
	/**
	 * @type {TPlayer}
	 */
	let player;

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
				 * @param {string} [ color ]
				 * @returns {TRect}
				 */
				const createRect = (color) => {
					const rect = Rectangle(0, 0, w, h, color);
					rect.x = x;
					rect.y = y;
					// rect.alpha = 0.5;
					rect.visible = false;
					stage.add(rect);
					return rect;
				};

				if (layerName === 'entities') {
					if (entityname === 'player') {
						player = actorPool.getPlayer();
						player.reset();
						player.setBody(w, h, '#ff0000');
						player.x = x;
						player.y = y;
						player.addTo(stage);
						// player.body.visible = true;
						// player.body.alpha = 0.5;
					}
					if (entityname.includes('enemy')) {
						const eName = entityname.split('_')[1]; 
						const eType = /** @type {TEnemyType} */(eName);
						const eFlipH = /** @type {number} */(eValues['flipH']);
						const eState = /** @type {TEnemyState} */(eValues[ 'state' ]);
						const triggered = /** @type {boolean} */(eValues[ 'triggered' ]);
						const enemy = actorPool.getEnemy(eType);

						enemy.reset();
						enemy.setBody(w, h, '#ff0000');
						enemy.flipH = eFlipH;
						enemy.x = x;
						enemy.y = y;
						// enemy.body.alpha = 0.5;
						// enemy.body.visible = true;
						enemy.addTo(stage, 0);
						// enemy.addTo(stage);
						enemies.push(enemy);

						if (triggered) {
							enemy.waitForTrigger(eState);
						} else {
							enemy.waitForTrigger(eState);
							enemy.onTrigger(null, eFlipH, false);
						}
					}
					if (entityname.includes('item')) {
						const eName = entityname.split('_')[0]; 
						const eType = /** @type {TItemType} */(eName);
						const item = itemsPool.get(eType);
						item.x = x;
						item.y = y;
						item.play();
						item.setBody(w, h);
						// item.body.alpha = 0.5;
						item.body.visible = false;
						item.addTo(stage, 0);
						items.push(item);
					}
					if (entityname === 'triggerEnemy') {
						const rect = TriggerEnemy(nodes, w, h, '#257179');
						rect.x = x;
						rect.y = y;
						// rect.alpha = 0.5;
						rect.visible = false;
						stage.add(rect);
						enemyTriggers.push(rect);
					}
					if (entityname === 'hurt') {
						hurts.push(createRect());
					}
					if (entityname === 'door') {
						doors.push(createRect());
					}
					if (entityname === 'hideEnemy') {
						enemyHiders.push(createRect());
					}
				}
				if (layerName === 'collision' &&  entityname === 'platform') {
					platforms.push(createRect('#4ed72d'));
				}
				if (layerName === 'reversers' && entityname === 'reverser') {
					reversers.push(createRect('#ffcd75'));
				}
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

	function doStressTest() {
		const spawnEnemy = ()=> {
			// make sure to add enemy.max = 200 in actor pool
			if (enemies.length >= 199) {
				return;
			}

			var enemy = actorPool.getEnemy('ryan');

			enemy.reset();
			enemy.x = GAME_WIDTH/2;
			enemy.y = 0;
			// enemy.body.alpha = 0.5;
			enemy.addTo(stage, 0);
			enemies.push(enemy);
			enemy.setVisible(false, true);

			enemy.changeState('run');
			console.log('enemy:', enemies.length);
		};
		IntervalTimer(0.3, spawnEnemy);
	}

	// doStressTest();

	self.update = () => {
		if (!store.loaded) {
			return;
		}

		store.loaded = true;
		updateEntities();
	};

	function updateEntities() {
		if (isPlayerActive()) {
			player.update();
			player.vsPlatforms(platforms, stage);
			player.vsEnemyTriggers(enemyTriggers, enemies, stage);
			player.vsHurts(hurts, stage);
			player.vsDoors(doors, stage);
		}
		enemies.forEach((enemy) => {
			if (enemy.active) {
				enemy.update();
				enemy.vsPlatforms(platforms, stage);
				enemy.vsReversers(reversers, stage);
				enemy.vsHurts(hurts, stage);
				enemy.vsHiders(enemyHiders, stage);
				if (isPlayerActive()) {
					enemy.vsPlayer(player, stage);
				}
			} else {
				if (!enemy.isToBeTriggered()) {
					const enemyIndex = getChildIndex(enemies, enemy); 
					enemies.splice(enemyIndex, 1);
				}
			}
		});

		sfxPool.update();
		powerPool.update(stage, platforms, enemies);
		dexpPool.update(platforms, hurts);
		itemsPool.update(stage, player);
	}

	/**
	 * @type {boolFunc}
	 */
	function isPlayerActive() {
		return player && player.active;
	}

	return self;
}

/**
 * @type {FLevelTilemap}
 */
export function LevelTilemap(tilesData) {
	const self = Scene();
	const stage = self.stage;

	const t = Tilemap(TILES, tilesData, GridCellsX);
	stage.add(t);

	return self;
}
