import { BitmapFont } from '@packages/fonts';
import { TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS } from 'media/tinyFont';

/**
 * @param {string} value
 * @returns {TBitmapFont}
 */
export function Text(value) {
	const btext = BitmapFont(TINY_FONT, TINY_FONT_FRAMES, TINY_FONT_TILESET_COLUMNS, value);

	return btext;
}
