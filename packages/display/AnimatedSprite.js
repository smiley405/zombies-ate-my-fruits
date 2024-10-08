import { ticker } from '@game/Game';
import { toCanvasPool } from '@packages/render/CanvasPool';

import { DisplayObject, renderProps } from './DisplayObject';

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {TSpriteTexture} texture
 * @param {number} currentFrame
 * @param {number} [ offsetX ]
 * @param {number} [ offsetY ]
 */
export function renderTexture(ctx, texture, currentFrame, offsetX=0, offsetY=0) {
	const frames = texture.frames;
	const fw = texture.w;
	const palette = texture.palette;

	let frameData = frames.split('|')[currentFrame];
	frameData = frameData.replace(/(\D)(\d+)/g, (_, char, count) => char.repeat(count));
	[...frameData].forEach((c, i) => {
		const color = palette[c];
		if (color === undefined) {
			return;
		}
		const fx = i % fw;
		const fy = Math.floor(i / fw);
		ctx.fillStyle = color;
		ctx.fillRect(fx+offsetX, fy+offsetY, 1, 1);
	});
}

/**
 * @type {FAnimatedSprite}
 */
export function AnimatedSprite(texture, play=true, loop=true) {
	const frames = texture.frames;
	const fps = texture.fps;
	const totalFrames = frames.split('|').length;

	const o = DisplayObject();
	const _detach = o.detach;

	let currentFrame = 0;
	let accumulator = 0;
	let playing = play;

	/**
	 * @type {TCanvasPoolProps[]}
	 */
	const buffers = Array.from({length: totalFrames}, (_, i) => toCanvasPool(o.uid + '_' + i)); 

	const self = Object.assign(o,  /** @type {TAnimatedSprite}*/({
		texture,
		loop,
		render: (ctx) => {
			if (!self.visible || !self.texture) {
				return;
			}

			const buffer = buffers[currentFrame];
			const bcanvas = buffer.canvas;
			const bctx = buffer.ctx;

			if (buffer.cached) {
				renderProps(self, ctx);
				ctx.drawImage(bcanvas, 0, 0);
				return;
			}

			buffer.cached = true;
			bcanvas.width = ctx.canvas.width;
			bcanvas.height = ctx.canvas.height;

			renderTexture(bctx, self.texture, currentFrame);
			renderProps(self, bctx);
		},
		update: () => {
			if (!playing) {
				return;
			}

			if (!self.loop && currentFrame == totalFrames - 1) {
				self.stop();
				if (self.onComplete) {
					self.onComplete(self.name);
				}
				return;
			}

			accumulator += ticker.timer.fdt;

			while(accumulator * fps >= 1) {
				currentFrame = ++currentFrame % totalFrames;
				accumulator -= 1 / fps;
			}
		},
		start: (frameIndex = 0) => {
			if (!self.playing) {
				reset();
				setCurrentFrame(frameIndex);
				playing = true;
			}
		},
		stop: (frameIndex) => {
			setCurrentFrame(frameIndex);
			playing = false;
		},
		destroy: () => {
			// buffers.forEach((_,i) => {
			// 	dropCanvasPool(o.uid + '_' + i);
			// });
			// buffers.length = 0;
			reset();
		},
		detach: () => {
			_detach();
			reset();
		}
	}));

	function reset() {
		self.stop();
		playing = false;
		currentFrame = 0;
		accumulator = 0;
	}

	/**
	 * @param {number} frameIndex
	 */
	function setCurrentFrame(frameIndex) {
		currentFrame = frameIndex !== undefined ? frameIndex : currentFrame;
	}

	Object.defineProperties(self, {
		playing: {
			get: () => playing,
		},
		currentFrame: {
			get: () => currentFrame,
		},
		totalFrames: {
			get: () => totalFrames,
		},
	});

	if (texture) {
		self.width = texture.w; 
		self.height = texture.h; 
	}

	return self;
}
