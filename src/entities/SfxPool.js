import {
	BLAST_SFX,
	BODY_EXPLODE_SFX,
	EMERGE_DUSTS_SFX,
	FIRE_BALL_IMPACT_SFX,
	IMPACT_DUSTS_SFX,
} from 'media/sfxAssets';

import { MAX_POWER_FIRE_BALL } from './PowerPool';
import { SfxBase } from './SfxBase';

export const MAX_SFX_FLOOR_IMPACT_DUSTS = 3;
export const MAX_SFX_BLAST = 1;
export const MAX_SFX_EMERGE_DUSTS = 5;
export const MAX_SFX_BODY_EXPLODE = 5;

/**
 * @type {FSfxPool}
 */
export function SfxPool() {
	let uid = 0;
	/**
	 * @type {TSfxPoolBasket}
	 */
	const basket = {};
	/**
	 * @type {TSfxPoolUpdaters}
	 */
	const updaters = {};

	/**
	 * @type {TSfxPool}
	 */
	const self = {
		init: () => {
			addToBasket('impactDusts', { max: MAX_SFX_FLOOR_IMPACT_DUSTS, pool: [] });
			addToBasket('blast', { max: MAX_SFX_BLAST, pool: [] });
			addToBasket('emergeDusts', { max: MAX_SFX_EMERGE_DUSTS, pool: [] });
			addToBasket('bodyExplode', { max: MAX_SFX_BODY_EXPLODE, pool: [] });
			addToBasket('fireballImpact', { max: MAX_POWER_FIRE_BALL, pool: [] });

			for (let key in basket) {
				const bname = /** @type {TSfxType}*/ (key);
				const props = basket[bname];
				const max = props.max;
				const pool = props.pool;

				for (let i = 0; i < max; i++) {
					const newName = `${bname}_${i}`;
					switch (bname) {
					case 'impactDusts':
						pool.push(SfxBase(newName, IMPACT_DUSTS_SFX));
						break;
					case 'emergeDusts':
						pool.push(SfxBase(newName, EMERGE_DUSTS_SFX));
						break;
					case 'fireballImpact':
						pool.push(SfxBase(newName, FIRE_BALL_IMPACT_SFX));
						break;
					case 'blast':
						pool.push(SfxBase(newName, BLAST_SFX));
						break;
					case 'bodyExplode':
						pool.push(SfxBase(newName, BODY_EXPLODE_SFX));
						break;
					}
				}
			}
		},
		update: () => {
			for (let id in updaters) {
				const mc = updaters[id];
				if (mc.active) {
					mc.update();
				} else {
					delete updaters[id];
				}
			}
		},
		get: (name) => {
			const pool = basket[name].pool;
			/**
			 * @type {TSfxBase}
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
			for (let key in basket) {
				const bname = /** @type {TSfxType}*/ (key);
				const props = basket[bname];
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
	 * @param {TSfxType} name
	 * @param {TSfxPoolStorage} data
	 */
	function addToBasket(name, data) {
		basket[name] = data;
	}

	return self;
}
