import { Sound } from '@game/Sound';
import { AnimatedSprite, Rectangle } from '@packages/display';
import { followConstant, overlap } from '@packages/utils/misc';

/**
 * @type {FItemBase}
 */
export function ItemBase(name, texture) {
	/**
	 * @type {TItemBase}
	 */
	const self = {
		name,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		loop: true,
		points: 1,
		followTarget: {x: 0, y: 0, width: 8, height: 8}, // default
		followTargetSpeed: 2,
		addTo: (group, index) => {
			if (index !== undefined) {
				group.addAt(self.body, index);
				group.addAt(self.skin, index);
			} else {
				group.add(self.body);
				group.add(self.skin);
			}
			self.parent = group;
		},
		addBody: () => {
			self.body = Rectangle(0, 0, texture.w, texture.h, '#fff');
			self.body.name = `${name}.body`;
			self.body.visible = false;
		},
		setBody: (width, height, color) => {
			self.body.width = width;
			self.body.height = height;
			self.body.color = color ? color : self.body.color;
		},
		addSkin: () => {
			self.skin = AnimatedSprite(texture, false, self.loop);
			self.skin.name = `${name}.skin`;
			self.skin.onComplete = self.onComplete;
		},
		update: () => {
			self.skin.x = self.body.x - self.body.width/2;
			self.skin.y = self.body.y - self.body.height/2;
			self.body.update();
			self.skin.update();

			if (self.gotHit) {
				followConstant(self, self.followTarget, self.followTargetSpeed);
				const hit = overlap(self.body, self.followTarget);
				if (hit) {
					self.kill();
				}
			}
		},
		render: (ctx) => {
			//
		},
		vsPlayer: (player, group) => {
			if (self.gotHit) {
				return;
			}
			const r1 = self.body;
			const r2 = player.body;
			const hit = overlap(r1, r2);

			if (hit) {
				self.gotHit = true;
				self.onHit();
				player.syncPowers();
				Sound.play('fxPick');
			}
		},
		onHit: () => {
			// self.kill();
			self.stop(0);
		},
		kill: () => {
			self.skin.stop();
			self.body.detach();
			self.skin.detach();
			self.parent = null;
			self.reserved = false;
			self.gotHit = false;
		},
		play: () => {
			self.skin.visible = true;
			self.skin.start();
		},
		stop: (frameIndex) => {
			self.skin.stop(frameIndex);
		},
	};

	Object.defineProperties(self, {
		x: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.x = value;
			},
			get: () => {
				return self.body.x;
			}
		},
		y: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.y = value;
			},
			get: () => {
				return self.body.y;
			}
		},
		width: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.width = value;
			},
			get: () => {
				return self.body.width;
			}
		},
		height: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.height = value;
			},
			get: () => {
				return self.body.height;
			}
		},
		scaleX: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.scaleX = value;
			},
			get: () => {
				return self.body.scaleX;
			}
		},
		active: {
			get: () => {
				return Boolean(self.body.parent && self.skin.parent);
			}
		}
	});
	return self;
}
