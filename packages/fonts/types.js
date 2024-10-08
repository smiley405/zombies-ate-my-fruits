/**
 * @typedef {object} TBitmapFontOnlyProps
 * @property {number} [ gap ] - letter spacing
 * @property {string} [ text ]
 */

/**
 *  @typedef {[letter:string, letterWidth:number][]} TBitmapFontFrames
 */ 

/**
 *  @typedef {TSprite & TBitmapFontOnlyProps} TBitmapFont
 */ 

/**
 * @callback FBitmapFont
 * @param {TSpriteTexture} fontTexture
 * @param {TBitmapFontFrames} fontFrames
 * @param {number} fontTilesetColumns
 * @param {string} [ text ]
 * @param {number} [ gap ] - letter spacing
 * @returns {TBitmapFont}
 */
