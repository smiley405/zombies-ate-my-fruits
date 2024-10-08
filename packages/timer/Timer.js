import { ticker } from '@game/Game';
import { getUID } from '@packages/utils/misc';

/**
 * @type {TTimers}
 */
const timers = {}; 

/**
 * @type {FKillTimers}
 */
export function killTimers() {
	for (let key in timers) {
		if (timers[key]) {
			timers[key].kill();
		}
	}
}

export function updateTimers() {
	for (let key in timers) {
		if (timers[key]) {
			timers[key]._update();
		}
	}
}

/**
 * @type {FTimer}
 */
function Timer(duration=0) {
	const uid = getUID();
	const tickerTimer = ticker.timer;
	let running = true;
	let base = tickerTimer.time;
	let last = tickerTimer.time;
	
	/**
	 * @type {TTimer}
	 */
	const self = {
		dt: 0,
		uid,
		_update: () => {
			last = tickerTimer.time;
		},
		kill: () => {
			running = false;
			delete timers[uid];
		},
		reset: () => {
			base = tickerTimer.time;
		}
	};

	Object.defineProperties(self, {
		dt: {
			get: () => tickerTimer.time - base - duration
		},
		running: {
			get: () => running
		}
	});

	timers[uid] = self;

	return self;
}

/**
 * @type {FIntervalTimer}
 */
export function IntervalTimer(duration, callback) {
	const self = Timer(duration);
	const _update = self._update;
	self._update = () => {
		if (self.running && self.dt > duration) {
			if (callback) callback();
			self.reset();
		}
		_update();
	};
	return self;
}

/**
 * @type {FWaitTimer}
 */
export function WaitTimer(duration, callback) {
	const self = Timer(duration);
	const _update = self._update;
	const _kill = self.kill;

	self.kill = () => {
		_kill();
		if (callback) callback();
	};
	self._update = () => {
		if (self.running && self.dt > duration) {
			self.kill();
		}
		_update();
	};
	return self;
}
