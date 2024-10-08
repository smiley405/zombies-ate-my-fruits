import { APPLE_IDLE_ITEM, CORN_IDLE_ITEM } from 'media/fruitsAssets';

import { AppleItem } from './AppleItem';
import { CornItem } from './CornItem';

export const MAX_ITEM_APPLE = 1;
export const MAX_ITEM_CORN = 1;

/**
 * @type {FItemsPool}
 */
export function ItemsPool() {
	let uid = 0;
	/**
	 * @type {TItemsPoolBasket}
	 */
	const items = {};
	/**
	 * @type {TItemsPoolUpdaters}
	 */
	const updaters = {};

	/**
	 * @type {TItemsPool}
	 */
	const self = {
		init: () => {
			addToBasket('apple', { max: MAX_ITEM_APPLE, pool: [] });
			addToBasket('corn', { max: MAX_ITEM_CORN, pool: [] });

			for (let key in items) {
				const bname = /** @type {TItemType}*/ (key);
				const props = items[bname];
				const max = props.max;
				const pool = props.pool;

				for (let i = 0; i < max; i++) {
					const newName = `${bname}_${i}`;
					switch (bname) {
					case 'apple':
						pool.push(AppleItem(newName, APPLE_IDLE_ITEM));
						break;
					case 'corn':
						pool.push(CornItem(newName, CORN_IDLE_ITEM));
						break;
					}
				}
			}
		},
		update: (group, player) => {
			for (let id in updaters) {
				const mc = updaters[id];
				if (mc.active) {
					mc.update();
					mc.vsPlayer(player, group);
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
			const pool = items[name].pool;
			/**
			 * @type {TItemBase}
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
			for (let key in items) {
				const bname = /** @type {TItemType}*/ (key);
				const props = items[bname];
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
	 * @param {TItemType} name
	 * @param {TItemsPoolStorage} data
	 */
	function addToBasket(name, data) {
		items[name] = data;
	}

	return self;
}
