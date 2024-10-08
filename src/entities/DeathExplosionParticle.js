import { AnimatedSprite, Rectangle } from '@packages/display';
import { WaitTimer } from '@packages/timer';
import { mapNumber, randomInt } from '@packages/utils/math';
import { getUID, hitTest } from '@packages/utils/misc';

/**
 * @type {FDeathExplosionParticle}
 */
function DeathExplosionParticle(texture, x, y) {
	const skin = AnimatedSprite(texture, false, false);
	skin.name = 'death-explosion';
	const frameIndex = randomInt(0, skin.totalFrames - 1);
	skin.start(frameIndex);

	const body = Rectangle(0, 0, texture.w, texture.h, 'ff0000');
	body.name = skin.name + '.body';
	body.visible = false;

	let alpha = 1;

	/**
	 * @type {TDeathExplosionParticle}
	 */
	const self = {
		uid: getUID(),
		speedX: 0.1,
		dg: 0.1,
		g: 0.1,
		x,
		y,
		vx: 0,
		vy: 0,
		alpha,
		addTo: (group, index) => {
			if (index !== undefined) {
				group.addAt(body, index);
				group.addAt(skin, index);
			} else {
				group.add(body);
				group.add(skin);
			}
			self.parent = group;
		},
		update: (platforms, hurts) => {
			skin.x = body.x;
			skin.y = body.y;
			body.update();
			skin.update();

			// velocity
			self.vy += self.g;
			self.y += self.vy;

			if (!self.grounded) {
				self.x += self.vx;
			} else {
				resetVx();
			}

			if (platforms && platforms.length) {
				vsPlatforms(platforms);
			}
			if (hurts && hurts.length) {
				vsPlatforms(hurts);
			}
		},
		render: (ctx) => {
			body.render(ctx);
			skin.render(ctx);
		},
		kill: () => {
			skin.detach();
			body.detach();
			self.parent = null;
			self.reserved= false;
			resetVx();
			resetVy();
		},
	};

	body.x = self.x;
	body.y = self.y;

	self.vx = (Math.random() * 2 - 1) * self.speedX;
	self.vy = Math.random() * -(self.vy - 2) * Math.cos(Math.abs(self.vx) / self.speedX) - 2;

	function resetVx() {
		self.vx = 0;
	}

	function resetVy() {
		self.vy = 0;
	}
		
	/**
	 * @param {TRect[]} colliders
	 * @returns {void}
	 */
	function vsPlatforms(colliders) {
		colliders.forEach(platform => {
			var r1 = body;
			var r2 = platform;
			var test = hitTest(r1, r2);

			if (test.hit) {
				if (test.side === 'bottom') {
					self.grounded = true;
					self.g = self.dg;
					self.y = self.y - test.overlap.y;
					resetVy();
				}
				else if (test.side === 'top') {
					self.y = self.y + test.overlap.y;
					resetVy();
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
	}

	Object.defineProperties(self, {
		x: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				body.x = value;
			},
			get: () => {
				return body.x;
			}
		},
		y: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				body.y = value;
			},
			get: () => {
				return body.y;
			}
		},
		alpha: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				skin.alpha = value;
				alpha = value;
			},
			get: () => {
				return alpha;
			}
		},
		active: {
			get: () => {
				return Boolean(body.parent);
			}
		}
	});

	return self;
}

/**
 * @type {FDeathExplosion}
 */
export function DeathExplosion(name, texture, lifetime=3) {
	const total = 8;
	/**
	 * @type {TDeathExplosionParticle[]}
	 */
	const particles = [];

	/**
	 * @type {!TTimer}
	 */
	let timer;

	/**
	 * @type {TDeathExplosion}
	 */
	const self = {
		name,
		kill: ()=> {
			particles.forEach(p => {
				p.kill();
			});

			particles.length = 0;
			timer = null;
		},
		update: (platforms, hurts) => {
			particles.forEach(p => {
				p.update(platforms, hurts);

				if (timer && timer.running) {
					p.alpha = mapNumber(timer.dt, 0, lifetime, 1, 0);
				}
			});

		},
		render: (ctx) => {
			particles.forEach(p => {
				p.render(ctx);
			});
		},
		addTo: (x=0, y=0, group, index) => {
			for (let i = 0; i < total; i++) {
				const p = DeathExplosionParticle(texture, x, y);
				p.addTo(group, index);
				particles.push(p);
			}
			timer = WaitTimer(lifetime, self.kill);
		},
	};

	Object.defineProperties(self, {
		active: {
			get: () => {
				return Boolean(particles.length);
			}
		}
	});

	return self;
}
