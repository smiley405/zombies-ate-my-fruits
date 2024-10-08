/**
 * @typedef {{[name: string]: TMovieClipAddProps}} TMovieClipList
 */

/**
 * @typedef {{[name: string]: TAnimatedSprite}} TMovieClipAnimations
 */

/**
 * @typedef {object} TMovieClipAddProps
 * @property {boolean} [ loop ] 
 * @property {TSpriteTexture} texture 
 */

/**
 * @typedef {object} TMovieClipOnlyProps
 * @property {string} name 
 * @property {FAnimatedSpriteOnComplete} [ onComplete ]
 * @property {FMovieClipPlay} play
 * @property {FAnimatedSpriteSeFrameIndex} stop
 */

/**
 * @callback FMovieClipPlay
 * @param {string} name
 * @param {number} [frameIndex]
 * @returns {void}
 */

/**
 * @typedef {TSprite & TMovieClipOnlyProps} TMovieClip
 */

/**
 * Collection of AnimatedSprites
 * @callback FMovieClip
 * @param {TMovieClipList} list
 * @returns {TMovieClip}
 */
