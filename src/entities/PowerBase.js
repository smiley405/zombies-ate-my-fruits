import { AnimatedSprite, Rectangle } from '@packages/display';
import { overlap } from '@packages/utils/misc';

/**
 * @type {FPowerBase}
 */
export function PowerBase(name, texture) {
	/**
	 * @type {TPowerBase}
	 */
	const self = {
		name,
		flipH: 1,
		speedX: 1,
		x: 0,
		y: 0,
		vx: 0,
		width: 0,
		height: 0,
		scaleX: 1,
		loop: true,
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
			self.body = Rectangle(0, 0, texture.w, texture.h);
			self.body.name = `${name}.body`;
			self.body.visible = false;
		},
		addSkin: () => {
			self.skin = AnimatedSprite(texture, false, self.loop);
			self.skin.name = `${name}.skin`;
			self.skin.onComplete = self.onComplete;
		},
		update: () => {
			self.skin.x = self.body.x;
			self.skin.y = self.body.y;
			self.body.update();
			self.skin.update();
		},
		render: (ctx) => {
			//
		},
		kill: () => {
			self.skin.stop();
			self.skin.detach();
			self.body.detach();
			self.parent = null;
			self.reserved = false;
		},
		play: () => {
			self.skin.visible = true;
			self.skin.start();
		},
		stop: () => {
			self.skin.stop();
		},
		vsPlatforms: (colliders, group) => {
			if (!self.allowHit) {
				return;
			}

			for (let i=0; i<colliders.length; i++) {
				if (!self.active) {
					break;
				}

				const platform = colliders[i];
				const r1 = self.body;
				const r2 = platform;
				const hit = overlap(r1, r2);

				if (hit) {
					self.onHitPlatform(platform);
					self.kill();
				}
			}
		},
		vsEnemies: (enemies, group) => {
			for (let i=0; i< enemies.length; i++) {
				const enemy = enemies[i];
				if (!self.active) {
					break;
				}

				const r1 = self.body;
				const r2 = enemy.body;
				const hit = overlap(r1, r2);

				if (hit && enemy.active) {
					enemy.receiveDamage(1, self);
					self.onHitEnemy(enemy);
				}
			}
		},
		onHitPlatform: (platform) => {
			//
		},
		onHitEnemy: (enemy) => {
			//
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
