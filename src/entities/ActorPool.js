import { Enemy } from './Enemy';
import { Player } from './Player';

/**
 * @type {FActorPool}
 */
export function ActorPool() {
	/**
	 * @type {TPlayer}
	 */
	let player;
	/**
	 * @type {{[name:string]: TEnemyPoolStorage}}
	 */
	let enemies = {};

	/**
	 * @type {TActorPool}
	 */
	const self = {
		init: () => {
			self.initPlayer();
			self.initEnemies();
		},
		initPlayer: () => {
			player = Player('hero', 8, 8);
		},
		initEnemies: () => {
			addToBasket('mojo', {max:8, pool:[]});
			addToBasket('ryan', {max:8, pool:[]});
			addToBasket('thor', {max:8, pool:[]});

			for (let name in enemies) {
				const bname = /** @type {TEnemyType}*/ (name);
				const props = enemies[bname];
				const max = props.max;
				const pool = props.pool;

				for (let i = 0; i < max; i++) {
					const id = `${name}_${i}`; 
					const enemy = Enemy(id, 8, 8);
					pool.push(enemy);
				}
			}
		},
		getPlayer: () => {
			/**
			 * @type {TPlayer}
			 */
			let _player;
			if (!player.active) {
				_player = player;
			}

			return _player;
		},
		getEnemy: (name) => {
			const pool = enemies[name].pool;
			let extractedEnemy = null;

			for (let i=0; i<pool.length; i++) {
				const enemy = pool[i];
				if (!enemy.active && !enemy.reserved) {
					extractedEnemy = enemy;
					enemy.reserved = true;
					break;
				}
			}

			return extractedEnemy;
		},
		detach: () => {
			player.detach();
			player.reset();

			for (let name in enemies) {
				const bname = /** @type {TEnemyType}*/ (name);
				const props = enemies[bname];
				const pool = props.pool;

				pool.forEach(enemy => {
					enemy.reserved = false;
					enemy.detach();
					enemy.reset();
				});
			}
		}
	};

	self.init();

	/**
	 * @param {TEnemyType} name
	 * @param {TEnemyPoolStorage} data
	 */
	function addToBasket(name, data) {
		enemies[name] = data;
	}

	return self;
}
