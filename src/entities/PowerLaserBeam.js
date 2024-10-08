import { PowerBase } from './PowerBase';

/**
 * @type {FPowerBase}
 */
export function PowerLaserBeam(name, texture) {
	const o = PowerBase(name, texture);
	const _update = o.update;
	const self = Object.assign(o, /** @type {TPowerBase}*/({
		update: () => {
			if (!self.active) {
				return;
			}

			_update();

			self.skin.scaleX = self.body.scaleX;

			if (self.body.scaleX < 0) {
				self.skin.x = self.x + self.skin.width;
			} else {
				self.skin.x = self.x;
			}
		},
		onComplete: (name) => {
			self.kill();
		}
	}));

	self.loop = false;
	self.addBody();
	self.addSkin();

	return self;
}
