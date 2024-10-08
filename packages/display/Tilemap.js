import { dropCanvasPool, toCanvasPool } from '@packages/render/CanvasPool';

import { renderTexture } from './AnimatedSprite';
import { DisplayObject } from './DisplayObject';

/**
 * @type {FTilemap}
 */
export function Tilemap(tilesTexture, tilesData, gridCellsX) {
	// const frames = tilesTexture.frames;
	// const palette = tilesTexture.palette;
	// const fw = tilesTexture.w;
	// const totalFrames = frames.split('|').length;

	const o = DisplayObject();
	const buffer = toCanvasPool(String(o.uid));
	const bcanvas = buffer.canvas;
	const bctx = buffer.ctx;

	const self = Object.assign(o,  /** @type {TTilemap}*/({
		texture: tilesTexture,
		render: (ctx) => {
			if (!self.visible || !self.texture) {
				return;
			}

			if (buffer.cached) {
				ctx.drawImage(bcanvas, 0, 0);
				return;
			}

			buffer.cached = true;
			bcanvas.width = ctx.canvas.width; 
			bcanvas.height = ctx.canvas.height; 
			const w = tilesTexture.w;

			tilesData.forEach((id, i) => {
				if (id > -1) {
					const tx = i % gridCellsX * w;
					const ty = Math.floor(i / gridCellsX) * w;
					renderTexture(bctx, self.texture, id, tx, ty);
				}
			});
		},
		destroy: ()=> {
			dropCanvasPool(String(o.uid));
		}
	}));

	if (tilesTexture) {
		self.width = tilesTexture.w; 
		self.height = tilesTexture.h; 
	}

	return self;
}
