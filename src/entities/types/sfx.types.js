/**
 * @typedef {{[name:string]: TSfxPoolStorage}} TSfxPoolBasket
 */

/**
 * @typedef {{[id:number]: TSfxBase}} TSfxPoolUpdaters
 */

/**
 * @typedef {object} TSfxPoolStorage
 * @property {number} max
 * @property {TSfxBase[]} pool
 */

/**
 * @typedef {object} TSfxPool
 * @property {voidFunc} init
 * @property {FSceneUpdate} update
 * @property {FSfxPoolExtract} get
 * @property {voidFunc} detach
 */

/**
 * @callback FSfxPoolExtract
 * @param {TSfxType} name
 * @returns {TSfxBase}
 */

/**
 * @callback FSfxPool
 * @returns {TSfxPool}
 */

/**
 * @typedef {object} TSfxBaseOnlyProps
 * @property {boolean} [ active ]
 * @property {voidFunc} kill
 */

/**
 * @typedef {TAnimatedSprite & TSfxBaseOnlyProps} TSfxBase
 */

/**
 * @callback FSfxBase
 * @param {string} name
 * @param {TSpriteTexture} texture
 * @returns {TSfxBase}
 */

/**
 * @typedef {'impactDusts' | 'emergeDusts' | 'fireballImpact' | 'blast' | 'bodyExplode'} TSfxType
 */
