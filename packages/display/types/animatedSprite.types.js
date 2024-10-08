/**
 * @typedef {object} TAnimatedSpriteOnlyProps
 * @property {string} [ name ]
 * @property {boolean} [ loop ]
 * @property {boolean} [ playing ] - readonly
 * @property {number} totalFrames - readonly
 * @property {number} currentFrame - readonly
 * @property {FAnimatedSpriteOnComplete} [ onComplete ]
 * @property {FAnimatedSpriteSeFrameIndex} start
 * @property {FAnimatedSpriteSeFrameIndex} stop
 * @property {FSceneUpdate} update
 */

/**
 * @callback FAnimatedSpriteSeFrameIndex
 * @param {number} [frameIndex]
 * @returns {void}
 */

/**
 * @callback FAnimatedSpriteOnComplete
 * @param {string} [name]
 * @returns {void}
 */

/**
 * @typedef {TSprite & TAnimatedSpriteOnlyProps} TAnimatedSprite
 */

/**
 * @callback FAnimatedSprite
 * @param {TSpriteTexture} texture
 * @param {boolean} [play]
 * @param {boolean} [loop]
 * @returns {TAnimatedSprite}
 */
