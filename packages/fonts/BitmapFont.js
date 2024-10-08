import { DisplayObject, renderProps, renderTexture } from '@packages/display';
import { dropCanvasPool, toCanvasPool } from '@packages/render/CanvasPool';

/**
 * @type {FBitmapFont}
 */
export function BitmapFont(fontTexture, fontFrames, fontTilesetColumns, text, gap=1) {
	const o = DisplayObject();
	const _render = o.render;

	let _text = text;
	let _gap = gap;
	let buffer = toCanvasPool(String(o.uid));
	let bcanvas = buffer.canvas;
	let bctx = buffer.ctx;

	const self = Object.assign(o, /** @type {TBitmapFont}*/({
		text: _text,
		texture: fontTexture,
		render: (ctx) => {
			if (!self.visible || !self.texture) {
				return;
			}

			if (buffer.cached) {
				renderProps(self, ctx);
				ctx.drawImage(bcanvas, 0, 0);
				return;
			}

			buffer.cached = true;

			const frames = getTextFrames(); 
			const w = fontTexture.w;
			const col = fontTilesetColumns;

			bcanvas.width = ctx.canvas.width; 
			bcanvas.height = ctx.canvas.height;

			frames.forEach((frame, i) => {
				const id = frame.id; 
				let tx = i % col * w;
				if (i) {
					const prevFramesWidth = frames.map(val => val.w).filter((_, j) => j<i);
					const totalPrevFramesWidth = prevFramesWidth.reduce((a, b) => a + b, 0);

					tx = totalPrevFramesWidth + self.gap * i;
				}
				// const ty = Math.floor(i / col) * w;
				const ty = 0;
				renderTexture(bctx, self.texture, id, tx, ty);
			});
			renderProps(self, bctx);
		},
		destroy: ()=> {
			dropCanvasPool(String(o.uid));
		},
	}));

	/**
	 * @returns {{id:number, w:number, l:string}[]}
	 */
	function getTextFrames() {
		const texts = _text.split('');
		const letters = fontFrames.map(val => val[0]);
		const letterWidths = fontFrames.map(val => val[1]);
		const frames = texts.map(letter => {
			const letterIndex = letters.indexOf(letter);
			const letterWidth = letterWidths[letterIndex];
			return {id:letterIndex, w:letterWidth, l:letter};
		});

		return frames;
	}

	if (fontTexture) {
		self.width = fontTexture.w; 
		self.height = fontTexture.h; 
	}

	function recreateBuffer() {
		// re-create buffer
		buffer = toCanvasPool(String(o.uid));
		bcanvas = buffer.canvas;
		bctx = buffer.ctx;
	}

	Object.defineProperties(self, {
		text: {
			/**
			 * @param {string} value
			 */
			set: (value) => {
				if (_text === value) {
					return;
				}
				_text = value;
				self.destroy();
				recreateBuffer();
			},
			get: () => {
				return _text;
			}
		},
		gap: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				_gap = value;
				self.destroy();
				recreateBuffer();
			},
			get: () => {
				return _gap;
			}
		}
	});
	return self;
}
