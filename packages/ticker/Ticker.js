/**
 * @type {FTicker}
 */
export function Ticker(props) {
	const fps = props && props.fps ? props.fps : 60;
	let startTime = performance.now();
	let accumulator = 0;
	let totalUpdatersUID = 0;
	let totalRenderersUID = 0;
	let fpsdt = 1e3 / fps; // fps delta time
	let maxStep = 0.05; // for Timer: this is for usasge in seconds; else for ms- use 50 (i.e 1000/20)
	let timeScale = 1;
	/**
	 * @type {TTickerTimer}
	 */
	const timer = {
		dt: 0,
		fdt: 1/fps,
		edt: 0,
		time: Number.MIN_VALUE
	};

	/**
	 * @type {TTickerUpdaters}
	 */
	let updaters = {};
	/**
	 * @type {TTickerRenderers}
	 */
	let renderers = {};

	tick();

	function tick() {
		requestAnimationFrame(tick);

		const current = performance.now();
		timer.edt = current - startTime;
		startTime = current;
		timer.dt = Math.min(timer.edt, maxStep) * timeScale;
		timer.time += timer.dt;

		if (timer.edt > 1e3) {
			return;
		}

		accumulator += timer.edt;

		while(accumulator >= fpsdt) {
			update();
			accumulator -= fpsdt;
		}
		render();
	}

	/**
	 * @type {FTickerUpdate}
	 */
	function update() {
		for (let id in updaters) {
			updaters[id]();
		}
	}

	/**
	 * @type {FTickerRender}
	 */
	function render() {
		for (let id in renderers) {
			renderers[id]();
		}
	}

	/**
	 * @type {FTickerAdd}
	 */
	function add(type, callback) {
		let total = type === 'update' ? totalUpdatersUID : totalRenderersUID; 

		const obj = type === 'update' ? updaters : renderers;

		total += 1;
		if (!obj[total]) {
			obj[total] = callback;
		}

		if (type === 'update') {
			totalUpdatersUID = total;
		} else {
			totalRenderersUID = total;
		}

		return total;
	}

	/**
	 * @type {FTickerRemove}
	 */
	function remove(id, type) {
		const obj = type === 'update' ? updaters : renderers;

		if (obj[id]) {
			delete obj[id];
		}
	}

	return {
		add,
		remove,
		timer
	};
}
