import { store } from '@game/Game';

import { ItemBase } from './ItemBase';

/**
 * @type {FItemBase}
 */
export function CornItem(name, texture) {
	const self = ItemBase(name, texture);
	const _onHit = self.onHit;
	self.followTarget = {x: 32, y: 0, width: 4, height: 4};
	self.addBody();
	self.addSkin();
	self.onHit = () => {
		store.laserBeam.total += self.points;
		store.setPlayerPower('laserBeam', store.laserBeam.total);
		_onHit();
	};

	return self;
}
