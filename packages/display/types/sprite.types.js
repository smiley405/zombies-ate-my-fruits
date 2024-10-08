/**
 * @typedef {object} TSpriteOnlyProps
 * @property {TSpriteTexture} [ texture ]
 */

/**
 * @typedef {object} TSpriteTexture
 * @property {string} frames
 * @property {{[key: string]: string}} palette
 * @property {number} w
 * @property {number} h
 * @property {number} [fps]
 */

/**
 * @typedef {TDisplayObject & TSpriteOnlyProps} TSprite
 */

/**
 * @callback FSprite
 * @param {TSpriteTexture} texture
 * @returns {TSprite}
 */
