import { ENEMY_BLOOD, PLAYER_BLOOD } from 'media/bloodAssets';

import { DeathExplosion } from './DeathExplosionParticle';

export const MAX_PLAYER_DEATH_EXPLOSION = 1;
export const MAX_ENEMY_DEATH_EXPLOSION = 5;

/**
 * @type {FDeathExplosionPool}
 */
export function DeathExplosionPool() {
	let uid = 0;
	/**
	 * @type {TDeathExplosionPoolBasket}
	 */
	const explosions = {};
	/**
	 * @type {TDeathExplosionPoolUpdaters}
	 */
	const updaters = {};

	/**
	 * @type {TDeathExplosionPool}
	 */
	const self = {
		init: () => {
			addToBasket('player', { max: MAX_PLAYER_DEATH_EXPLOSION, pool: [] });
			addToBasket('enemy', { max: MAX_ENEMY_DEATH_EXPLOSION, pool: [] });

			for (let key in explosions) {
				const bname = /** @type {TDeathExplosionType}*/ (key);
				const props = explosions[bname];
				const max = props.max;
				const pool = props.pool;

				for (let i = 0; i < max; i++) {
					const newName = `${bname}_${i}`;
					switch (bname) {
					case 'player':
						pool.push(DeathExplosion(newName, PLAYER_BLOOD));
						break;
					case 'enemy':
						pool.push(DeathExplosion(newName, ENEMY_BLOOD));
						break;
					}
				}
			}
		},
		update: (platforms, hurts) => {
			for (let id in updaters) {
				const mc = updaters[id];
				if (mc.active) {
					mc.update(platforms, hurts);
				} else {
					delete updaters[id];
				}
			}
		},
		render: (ctx) => {
			for (let id in updaters) {
				const mc = updaters[id];
				if (mc.active) {
					mc.render(ctx);
				}
			}
		},
		get: (name) => {
			const pool = explosions[name].pool;
			/**
			 * @type {TDeathExplosion}
			 */
			let mc;
			for (let i = 0; i < pool.length; i++) {
				const _mc = pool[i];

				if (!_mc.active) {
					mc = _mc;
					uid += 1;
					updaters[uid] = mc;
					break;
				}
			}

			return mc;
		},
		detach: () => {
			for (let key in explosions) {
				const bname = /** @type {TDeathExplosionType}*/ (key);
				const props = explosions[bname];
				const pool = props.pool;

				pool.forEach(mc => {
					mc.kill();
				});
			}
		},
	};

	self.init();

	/**
	 * @param {TDeathExplosionType} name
	 * @param {TDeathExplosionPoolStorage} data
	 */
	function addToBasket(name, data) {
		explosions[name] = data;
	}

	return self;
}
