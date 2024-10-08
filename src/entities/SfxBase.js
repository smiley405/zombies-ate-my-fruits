import { AnimatedSprite } from '@packages/display';

/**
 * @type {FSfxBase}
 */
export function SfxBase(name, texture) {
	const o = AnimatedSprite(texture, false, false);
	const self = Object.assign(o,  /** @type {TSfxBase}*/({
		name,
		onComplete: (name) => {
			self.kill();
		},
		kill: () => {
			self.stop();
			self.detach();
			self.reserved = false;
		}
	}));

	self.visible = true;

	Object.defineProperties(self, {
		active: {
			get: () => {
				return self.parent;
			}
		}
	});

	return self;
}
