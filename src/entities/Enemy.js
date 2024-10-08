import { Sound } from '@game/Sound';
import { WaitTimer } from '@packages/timer';
import { hitTest, overlap } from '@packages/utils/misc';
import { MOJO_DIG, MOJO_RISE, MOJO_RUN } from 'media/enemyMojoAssets';
import { RYAN_DIG, RYAN_RISE, RYAN_RUN } from 'media/enemyRyanAssets';
import { THOR_DIG, THOR_RISE, THOR_RUN } from 'media/enemyThorAssets';

import { Actor } from './Actor';

const ENEMIES_SKIN = {
	mojo: {
		dig: MOJO_DIG,
		rise: MOJO_RISE,
		run: MOJO_RUN,
	},
	ryan: {
		dig: RYAN_DIG,
		rise: RYAN_RISE,
		run: RYAN_RUN,
	},
	thor: {
		dig: THOR_DIG,
		rise: THOR_RISE,
		run: THOR_RUN,
	},
};

/**
 * @type {FEnemy}
 */
export function Enemy(name, width, height, color) {
	/**
	 * @type {TEnemyState}
	 */
	let currentState;
	/**
	 * @type {TEnemyState}
	 */
	let _triggerState;

	const o = Actor(name, width, height, color);
	const _detach = o.detach;
	const _update = o.update;
	const _kill = o.kill;
	const self = Object.assign(
		o,
		/** @type {TEnemy}*/ ({
			type: name.split('_')[0],
			update: () => {
				_update();
				updateMovement();
				self.watchFlip();
			},
			changeState: (state) => {
				currentState = state;
				if (!_triggerState) {
					self.reserved = false;
				}

				switch (state) {
				case 'dig':
					doDig();
					break;
				case 'rise':
					doRise();
					break;
				}
			},
			watchFlip: () => {
				if (!self.isFlipH()) {
					if (self.skin.scaleX < 0) {
						self.skin.scaleX *= -1;
					}
				} else {
					if (self.skin.scaleX > 0) {
						self.skin.scaleX *= -1;
					}
				}
			},
			vsReversers: (colliders, group) => {
				colliders.forEach((reverser) => {
					const r1 = self.body;
					const r2 = reverser;
					const test = hitTest(r1, r2);

					if (test.hit) {
						if (test.side === 'right') {
							self.x = self.x - test.overlap.x;
							self.vx -= self.speedX;
						} else if (test.side === 'left') {
							self.x = self.x + test.overlap.x;
							self.vx += self.speedX;
						}
						self.doFlipH();
					}
				});
			},
			vsHiders: (colliders, group) => {
				if (currentState === 'dig') {
					return;
				}
				for (let i = 0; i < colliders.length; i++) {
					const hider = colliders[i];
					const r1 = self.body;
					const r2 = hider;
					const hit = overlap(r1, r2);

					if (hit) {
						self.changeState('dig');
						break;
					}
				}
			},
			vsPlayer: (player, group) => {
				const r1 = self.body;
				const r2 = player.body;
				const hit = overlap(r1, r2);

				if (hit) {
					player.receiveDamage(1, self);
				}
			},
			waitForTrigger: (triggerState) => {
				// call this function if u want to manually trigger
				// after that call onTrigger on demand
				_triggerState = triggerState;
				self.setVisible(false, false);
			},
			onTrigger: (from, initialFlipH, isPlaySound=true) => {
				// call this function when triggering
				self.flipH = initialFlipH;
				self.changeState(_triggerState);
				self.skin.visible = true;

				_triggerState = null;
				if (isPlaySound) {
					Sound.play('fxSuperT');
				}
			},

			disappear: () => {
				self.dead = true;
				self.detach();
			},
			kill: () => {
				_kill();
				self.setVisible(false, false);
				// self.addSfx('bodyExplode');
				self.explode('enemy');

				WaitTimer(1, self.detach);
			},
			detach: () => {
				if (!self.parent) {
					return;
				}
				_detach();
				_triggerState = null;
			},
			isToBeTriggered: () => {
				return !self.dead && _triggerState && self.parent;
			},
		}),
	);

	const _skins = ENEMIES_SKIN[self.type];

	self.speedX = getSpeedX();

	self.addSkin({
		// key should match TEnemySkinType
		dig: { texture: _skins.dig, loop: false },
		rise: { texture: _skins.rise, loop: false },
		run: { texture: _skins.run, loop: true },
	});
	self.skin.stop();

	self.skin.onComplete = (/** @type{TEnemySkinType}*/ animName) => {
		if (animName === 'rise') {
			self.changeState('run');
		}
		if (animName === 'dig') {
			self.disappear();
		}
	};

	function updateMovement() {
		if (currentState === 'run') {
			doRun();
		}
	}

	function doRise() {
		self.moving = false;
		self.resetVx();
		self.skin.play('rise');
		self.addSfx('emergeDusts');
	}

	function doDig() {
		self.moving = false;
		self.resetVx();
		self.skin.play('dig');
		self.addSfx('emergeDusts');
	}

	function doRun() {
		if (self.grounded) {
			self.moving = true;
			self.vx = self.flipH * self.speedX;
		}
		self.skin.play('run');
	}

	function getSpeedX() {
		switch (self.type) {
		case 'mojo':
			return 0.2;
		case 'ryan':
			return 0.3;
		case 'thor':
			return 0.4;
		default:
			return 0.5;
		}
	}

	return self;
}
