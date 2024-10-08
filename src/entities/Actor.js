import { root } from '@game/Game';
import { MovieClip, Rectangle } from '@packages/display';
import { getUID, hitTest, overlap } from '@packages/utils/misc';

/**
 * @type {FActor}
 */
export function Actor(name, width=0, height=0, color='#fff') {
	const body = Rectangle(0, 0, width, height, color);
	body.name = `${name}.body`;

	/**
	 * @type {TActor}
	 */
	const self = {
		uid: getUID(),
		name,
		width,
		height,
		health: 1,
		alpha: 1,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		speedX: 0.8,
		jForce: 2.8,
		flipH: 1,
		dGravity: 0.5,
		jGravity: 0.2,
		gravity: 0.5,
		body,
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
		setVisible: (bodyVisible, skinVisible) => {
			self.body.visible = bodyVisible;
			self.skin.visible = skinVisible;
		},
		setBody: (width, height, color) => {
			self.body.width = width;
			self.body.height = height;
			self.body.color = color ? color : self.body.color;
		},
		update: () => {
			self.body.update();
			updateSkin();
			updateVelocity();
		},
		render: (ctx) => {
			self.body.render(ctx);
			self.skin.render(ctx);
		},
		addSkin: (list) => {
			self.skin = MovieClip(list);
			self.skin.name = `${name}.skin`;
		},
		vsPlatforms: (colliders, group) => {
			colliders.forEach(platform => {
				var r1 = self.body;
				var r2 = platform;
				var test = hitTest(r1, r2);

				if (test.hit) {
					if (test.side === 'bottom') {
						self.grounded = true;
						self.gravity = self.dGravity;
						self.y = self.y - test.overlap.y;
						self.resetVy();
					}
					else if (test.side === 'top') {
						self.y = self.y + test.overlap.y;
						self.resetVy();
					}
					else if (test.side === 'right') {
						self.x = self.x - test.overlap.x;
						self.vx -= self.speedX;
					}
					else if (test.side === 'left') {
						self.x = self.x + test.overlap.x;
						self.vx += self.speedX;
					}
				}
			});
		},
		vsHurts: (colliders, group) => {
			for (let i = 0; i < colliders.length; i++) {
				const hurt = colliders[i];
				const r1 = self.body;
				const r2 = hurt;
				const hit = overlap(r1, r2);

				if (hit) {
					self.receiveDamage(1, hurt);
					break;
				}
			}
		},
		addSfx: (type) => {
			const mc = root.sfxPool.get(type);

			if (!mc) {
				return;
			}

			self.parent.add(mc);
			mc.x = self.x + self.width/2 - mc.width/2;
			mc.y = self.y + self.height - mc.height;
			mc.start(0);
		},
		explode: (type) => {
			const mc = root.dexpPool.get(type);

			if (!mc) {
				return;
			}

			mc.addTo(self.x, self.y, self.parent);
		},
		receiveDamage: (amount, from) => {
			if (self.dead) {
				return;
			}

			self.health -= amount;

			if (self.health <= 0) {
				self.health = 0;
				self.kill();
			}
		},
		doFlipH: () => {
			self.flipH *= -1;
		},
		kill: () => {
			self.dead = true;
		},
		reset: () => {
			if (self.skin) {
				self.skin.stop();
			} 

			self.parent = null;
			self.flipH = 1;
			self.health = 1;
			self.dead = false;
			self.moving = false;
			self.grounded = false;
			self.jumping = false;
			self.falling = false;
			self.attacking = false;
			self.resetVx();
			self.resetVy();
			self.resetGravity();
		},
		detach: () => {
			self.skin.stop();
			self.skin.detach();
			self.body.detach();
			self.parent = null;
			self.reserved = false;
		},
		resetVx: () => {
			self.vx = 0;
		},
		resetVy: () => {
			self.vy = 0;
		},
		voidGravity: () => {
			self.gravity = 0;
		},
		resetGravity: () => {
			self.gravity = self.dGravity;
		},
		isFlipH: () => {
			return self.flipH === -1;
		},
		onLanded: () =>{}
	};

	function updateSkin() {
		const skin = self.skin;
		if (skin) {
			skin.scaleX = self.flipH;
			if (self.isFlipH()) {
				skin.x = self.body.x + self.body.width;
			} else {
				skin.x = self.body.x;
			}
			skin.y = self.body.y;
			skin.update();
		}
	}

	function updateVelocity() {
		self.vy += self.gravity;
		self.y += self.vy;
		self.x += self.vx;

		if (!self.grounded && self.vy > 0) {
			self.falling = true;
		}
		if (self.grounded && self.falling) {
			self.onLanded();
			self.falling = false;
		}
	}

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
		active: {
			get: () => {
				return self.skin.parent && self.body.parent && !self.dead && self.skin.visible;
			}
		}
	});
	
	return self;
}
