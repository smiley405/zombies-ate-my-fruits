import { DisplayObject, renderProps } from './DisplayObject';

/**
 * @type {FRect}
 */
export function Rectangle(x, y, width, height, color='#000') {
	const o = DisplayObject();
	const self = Object.assign(o, /** @type {TRect}*/({
		color,
		x,
		y,
		width,
		height,
		render: (ctx) => {
			if (!self.visible) {
				return;
			}

			ctx.fillStyle = self.color;
			ctx.fillRect(self.x, self.y, self.width, self.height);	
			renderProps(self, ctx);
		},
	}));

	return self;
}
