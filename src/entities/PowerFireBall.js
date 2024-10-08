import { root } from '@game/Game';

import { PowerBase } from './PowerBase';

/**
 * @type {FPowerBase}
 */
export function PowerFireBall(name, texture) {
	const o = PowerBase(name, texture);
	const _update = o.update;
	const self = Object.assign(o,  /** @type {TPowerBase}*/({
		update: () => {
			if (!self.active) {
				return;
			}
			_update();
			self.vx = self.flipH * self.speedX;
			self.x += self.vx;
		},
		onHitPlatform: (platform) => {
			const mc = root.sfxPool.get('fireballImpact');

			if (!mc) {
				return;
			}

			mc.x = self.flipH === -1 ? self.x + self.width : self.x;
			mc.y = self.y;

			mc.scaleX = self.flipH; 
			mc.start();

			self.parent.add(mc);
		},
		onHitEnemy: (enemy) => {
			self.kill();
		}
	}));

	self.allowHit = true;
	self.addBody();
	self.addSkin();

	return self;
}
