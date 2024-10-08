import { POWER_FIREBALL, POWER_LASER_BEAM } from 'media/powerAssets';

import { PowerFireBall } from './PowerFireBall';
import { PowerLaserBeam } from './PowerLaserBeam';

export const MAX_POWER_LASER_BEAM = 1;
export const MAX_POWER_FIRE_BALL = 1;

/**
 * @type {FPowerPool}
 */
export function PowerPool() {
	let uid = 0;
	/**
	 * @type {TPowerPoolBasket}
	 */
	const powers = {};
	/**
	 * @type {TPowerPoolUpdaters}
	 */
	const updaters = {};

	/**
	 * @type {TPowerPool}
	 */
	const self = {
		init: () => {
			addToBasket('fireball', { max: MAX_POWER_FIRE_BALL, pool: [] });
			addToBasket('laserBeam', { max: MAX_POWER_LASER_BEAM, pool: [] });

			for (let key in powers) {
				const bname = /** @type {TPowerType}*/ (key);
				const props = powers[bname];
				const max = props.max;
				const pool = props.pool;

				for (let i = 0; i < max; i++) {
					const newName = `${bname}_${i}`;
					switch (bname) {
					case 'fireball':
						pool.push(PowerFireBall(newName, POWER_FIREBALL));
						break;
					case 'laserBeam':
						pool.push(PowerLaserBeam(newName, POWER_LASER_BEAM));
						break;
					}
				}
			}
		},
		update: (group, platforms, enemies) => {
			for (let id in updaters) {
				const mc = updaters[id];
				if (mc.active) {
					mc.update();

					// collisions
					mc.vsPlatforms(platforms, group);
					mc.vsEnemies(enemies, group);
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
			const pool = powers[name].pool;
			/**
			 * @type {TPowerBase}
			 */
			let mc;
			for (let i = 0; i < pool.length; i++) {
				const _mc = pool[i];

				if (!_mc.active && !_mc.reserved) {
					mc = _mc;
					uid += 1;
					updaters[uid] = mc;
					mc.reserved = true;
					break;
				}
			}

			return mc;
		},
		detach: () => {
			for (let key in powers) {
				const bname = /** @type {TPowerType}*/ (key);
				const props = powers[bname];
				const pool = props.pool;

				pool.forEach(mc => {
					mc.kill();
				});
			}

			clearUpdaters();
		},
	};

	self.init();

	function clearUpdaters() {
		for (let id in updaters) {
			delete updaters[id];
		}
	}

	/**
	 * @param {TPowerType} name
	 * @param {TPowerPoolStorage} data
	 */
	function addToBasket(name, data) {
		powers[name] = data;
	}

	return self;
}
