import { getUID } from '@packages/utils/misc';

/**
 * @param {TDisplayObject} self
 * @param {CanvasRenderingContext2D} ctx
 */
export function renderProps(self, ctx) {
	// round pixels
	// const _x =(self.x + self.width * self.pivotX) | 0;
	// const _y = (self.y + self.height * self.pivotY) | 0;
	const _x = self.x + self.width * self.pivotX;
	const _y = self.y + self.height * self.pivotY;
	ctx.setTransform(self.scaleX, 0, 0, self.scaleY, _x, _y);
	// ctx.rotate(self.rotation);
}

/**
 * @type {FDisplayObject}
 */
export function DisplayObject() {
	let _alpha = 1;

	/**
	 * @type {TDisplayObject}
	 */
	let self = {
		x: 0,
		y: 0,
		alpha: 1,
		width: 0,
		height: 0,
		scaleX: 1,
		scaleY: 1,
		pivotX: 0,
		pivotY: 0,
		rotation: 0,
		visible: true,
		uid: getUID(),
		gx: 0,
		gy: 0,
		detach: () => {
			if (self.parent) {
				self.parent.remove(self);
			}
		},
		render: () => {},
		update: () => {}
	};

	Object.defineProperties(self, {
		alpha: {
			get: () => {
				return self.parent ? self.parent.alpha * _alpha : _alpha;
			},
			/**
			 * @param {number} value
			 */
			set: (value) => {
				_alpha = value;
			}
		}, 
		gx: {
			get: () => {
				return self.parent ? self.x + self.parent.gx : self.x;
			}
		},
		gy: {
			get: () => {
				return self.parent ? self.y + self.parent.gy : self.y;
			}
		},
	});

	return self;
}
