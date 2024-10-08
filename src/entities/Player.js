import { btn, root, store } from '@game/Game';
import { Sound } from '@game/Sound';
import { WaitTimer } from '@packages/timer';
import { getChildIndex, overlap } from '@packages/utils/misc';
import {
	PLAYER_HURT,
	PLAYER_IDLE,
	PLAYER_JUMP,
	PLAYER_RUN,
	PLAYER_SHOOT_LASER,
	PLAYER_THROW,
} from 'media/playerAssets';

import { Actor } from './Actor';

/**
 * @type {FPlayer}
 */
export function Player(name, width, height, color) {
	let didJumpAttack = false;
	/**
	 * @type {TPlayerState}
	 */
	let currentState;
	/**
	 * @type {TPlayerPower[]}
	 */
	const powers = [];
	const jumpSpeedX = 0.8;
	const runSpeedX = 0.3;

	const o = Actor(name, width, height, color);
	const _addTo = o.addTo;
	const _update = o.update;
	const _kill = o.kill;
	const self = Object.assign(
		o,
		/** @type {TPlayer}*/ ({
			powers,
			addTo: (group, index) => {
				_addTo(group, index);
				self.setVisible(false, true);
				syncPowers();
			},
			update: () => {
				_update();
				updateMovement();
			},
			syncPowers,
			changeState: (state) => {
				currentState = state;

				switch (state) {
				case 'idle':
					doIdle();
					break;
				case 'run':
					doRun();
					break;
				case 'jump':
					doJump();
					break;
				case 'hurt':
					doHurt();
					break;
				case 'attack':
					doAttack();
					break;
				}
			},
			vsEnemyTriggers: (colliders, enemies, group) => {
				colliders.forEach((trigger, index) => {
					const r1 = self.body;
					const r2 = /** @type {TRect}*/ (trigger);
					const hit = overlap(r1, r2);

					if (hit) {
						let nodes = trigger.nodes;

						enemies.forEach((enemy) => {
							if (enemy.isToBeTriggered()) {
								// search matching linked node
								for (let i = 0; i < nodes.length; i++) {
									const pos = nodes[i];
									if (pos.x === enemy.x && pos.y === enemy.y) {
										const eFlipH = enemy.x > self.x ? -1 : 1;
										enemy.onTrigger(trigger, eFlipH);
										trigger.register(index);
										break;
									}
								}
							}
						});
					}

					if (trigger.isJobDone()) {
						const triggerIndex = getChildIndex(colliders, trigger); 
						colliders.splice(triggerIndex, 1);
						trigger.kill();
					}
				});
			},
			vsDoors: (colliders, group) => {
				for (let i = 0; i < colliders.length; i++) {
					const hurt = colliders[i];
					const r1 = self.body;
					const r2 = hurt;
					const hit = overlap(r1, r2);

					if (hit) {
						root.scene.next();
						break;
					}
				}
			},
			kill: () => {
				_kill();
				self.setVisible(false, false);
				// self.addSfx('blast');
				Sound.play('fxPunch');
				self.explode('player');
				WaitTimer(1, onKill);
			},
		}),
	);

	function onKill() {
		self.detach();
		root.scene.reload();
	}

	assignPowers();

	self.addSkin({
		// key should match TPlayerSkinType
		idle: { texture: PLAYER_IDLE },
		run: { texture: PLAYER_RUN },
		jump: { texture: PLAYER_JUMP, loop: false },
		hurt: { texture: PLAYER_HURT, loop: false },
		shootLaser: { texture: PLAYER_SHOOT_LASER, loop: false },
		throw: { texture: PLAYER_THROW, loop: false },
	});
	self.skin.play('idle');

	self.skin.onComplete = (/** @type{TPlayerSkinType}*/ animName) => {
		const isAttackAnim = animName === 'throw' || animName === 'shootLaser';

		if (isAttackAnim) {
			self.attacking = false;
			self.gravity = self.jumping ? self.jGravity : self.dGravity;
		}
	};

	self.onLanded = () => {
		self.addSfx('impactDusts');
		Sound.play('fxLanded');
	};

	btn.is('jump').onDown = onJump;
	btn.is('attack').onDown = onAttack;
	btn.is('select').onDown = onSelect;

	function updateMovement() {
		if (btn.is('right').down) {
			if (!self.attacking) {
				self.flipH = 1;
				self.changeState('run');
			}
		} else if (btn.is('left').down) {
			if (!self.attacking) {
				self.flipH = -1;
				self.changeState('run');
			}
		} else {
			if (self.grounded && !self.attacking) {
				self.changeState('idle');
			}
		}

		if (self.grounded) {
			self.jumping = false;
			didJumpAttack = false;
		}

		if (self.attacking) {
			self.resetVx();
			self.resetVy();
			self.voidGravity();
		}
	}

	function doIdle() {
		self.moving = false;
		self.resetVx();

		self.skin.play('idle');
	}

	function doRun() {
		if (!self.jumping) {
			self.speedX = runSpeedX;
		}
		self.moving = true;
		self.vx = self.flipH * self.speedX;

		if (self.grounded) {
			self.skin.play('run');
		}
	}

	function doJump() {
		self.speedX = jumpSpeedX;
		self.jumping = true;
		self.grounded = false;
		self.gravity = self.jGravity;
		self.vy -= self.jForce;

		self.skin.play('jump');
		Sound.play('fxSpawnD');
	}

	function doHurt() {
		self.skin.play('hurt');
	}

	function doAttack() {
		const attackType = self.currentPower.name;
		/**
		 * @type {TPlayerSkinType}
		 */
		let animName = 'throw';

		self.attacking = true;

		if (self.jumping && !didJumpAttack) {
			didJumpAttack = true;
		}

		addPower(attackType);

		if (attackType === 'laserBeam') {
			animName = 'shootLaser';
		}

		self.skin.play(animName);

	}

	/**
	 * @param {TPowerType} type
	 */
	function addPower(type) {
		switch (type) {
		case 'fireball': {
			const mc = root.powerPool.get(type);

			if (!mc) {
				return;
			}

			mc.addTo(self.parent);
			mc.x = self.x + width / 2 - mc.width / 2;
			mc.y = self.y;
			mc.flipH = self.flipH;
			mc.play();
			Sound.play('fxPunch');
			decreasePower();
			break;
		}
		case 'laserBeam': {
			const mc = root.powerPool.get(type);

			if (!mc) {
				return;
			}

			mc.addTo(self.parent);
			mc.flipH = self.flipH;
			mc.scaleX = self.flipH;

			const offsetX = 2;
			mc.x = !self.isFlipH() ? self.x + self.width - offsetX : self.x - mc.width + offsetX;
			mc.y = self.y;

			mc.play();
			Sound.play('fxPistol');
			decreasePower();
			break;
		}
		}
	}

	function assignPowers() {
		powers.length = 0;
		powers.push(store.fireBall);
		powers.push(store.laserBeam);
		self.currentPower = powers[0];
	}

	function syncPowers() {
		if (!powers.length) {
			return;
		}
		powers[0] = store.fireBall;
		powers[1] = store.laserBeam;

		if (!self.currentPower.total) {
			onSelect();
		}
	}

	/**
	 * @param {TPowerType} name
	 */
	function increasePower(name) {
		const power = powers.filter((obj) => obj.name === name)[0];
		let total = power.total;

		total += 1;

		if (total > power.max) {
			total = power.max;
		}

		power.total = total;
	}

	function decreasePower() {
		let total = self.currentPower.total;

		total -= 1;

		if (total < 0) {
			total = 0;
		}

		self.currentPower.total = total;

		if (!self.currentPower.total) {
			for (let i = 0; i < powers.length; i++) {
				const power = powers[i];

				if (power.total) {
					setCurrentPower(i);
					break;
				}
			}
		}
	}

	function onSelect() {
		if (self.dead) {
			return;
		}

		let powerIndex = powers.indexOf(self.currentPower);

		powerIndex += 1;

		const capIndex = () => {
			if (powerIndex >= powers.length) {
				powerIndex = 0;
			}
		};

		// check power count
		powers.forEach((power, id) => {
			if (id === powerIndex && power.total === 0) {
				powerIndex += 1;

				capIndex();
			}
		});

		capIndex();

		setCurrentPower(powerIndex);
		// console.log(self.currentPower.name);
	}

	function setCurrentPower(powerIndex=0) {
		const _currentPower = self.powers[powerIndex];
		if (!_currentPower.total) {
			return;
		}
		self.currentPower = self.powers[powerIndex];
		store.currentPowerName = self.currentPower.name;
	}

	function onJump() {
		if (self.jumping) {
			return;
		}

		if (self.grounded && !self.attacking) {
			self.changeState('jump');
		}
	}

	function onAttack() {
		if (self.dead) {
			return;
		}
		if (self.attacking || didJumpAttack || self.currentPower.total === 0) {
			return;
		}

		self.changeState('attack');
	}

	return self;
}
