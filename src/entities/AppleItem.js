import { store } from '@game/Game';

import { ItemBase } from './ItemBase';

/**
 * @type {FItemBase}
 */
export function AppleItem(name, texture) {
	const self = ItemBase(name, texture);
	const _onHit = self.onHit;
	self.followTarget = {x: 0, y: 0, width: 4, height: 4};
	self.addBody();
	self.addSkin();
	self.onHit = () => {
		store.fireBall.total += self.points;
		store.setPlayerPower('fireball', store.fireBall.total);
		_onHit();
	};

	return self;
}
