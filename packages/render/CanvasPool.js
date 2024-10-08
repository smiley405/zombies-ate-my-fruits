/**
 * @type {TCanvasPool}
 */
const pool = {};

/**
 * @type {FToPool} 
 */
export function toCanvasPool(uid) {
	if (!pool[uid]) {
		const _canvas = document.createElement('canvas');
		const _ctx = _canvas.getContext('2d');

		pool[uid] = {canvas: _canvas, ctx: _ctx};
	}

	return pool[uid];
}

/**
 * @type {FDropPool}
 */
export function dropCanvasPool(uid) {
	if (pool[uid]) {
		delete pool[uid];
	}
}
