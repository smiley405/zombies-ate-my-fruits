/**
 * @typedef {{[name:string]: TItemsPoolStorage}} TItemsPoolBasket
 */

/**
 * @typedef {{[id:number]: TItemBase}} TItemsPoolUpdaters
 */

/**
 * @typedef {object} TItemsPoolStorage
 * @property {number} max
 * @property {TItemBase[]} pool
 */

/**
 * @typedef {object} TItemsPool
 * @property {voidFunc} init
 * @property {FItemUpdate} update
 * @property {FSceneRender} render
 * @property {FItemsPoolExtract} get
 * @property {voidFunc} detach
 */

/**
 * @callback FItemUpdate  
 * @param {TGroup} group
 * @param {TPlayer} player
 * @returns {void}
 */

/**
 * @callback FItemsPoolExtract
 * @param {TItemType} name
 * @returns {TItemBase}
 */

/**
 * @callback FItemsPool
 * @returns {TItemsPool}
 */

/**
 * @typedef {'apple' | 'corn' } TItemType
 */

/**
 * @typedef {object} TItemBase
 * @property {string} [ name ]
 * @property {number} points
 * @property {number} x
 * @property {number} y
 * @property {TRectBounds} followTarget
 * @property {number} followTargetSpeed
 * @property {number} width
 * @property {boolean} [ loop ]
 * @property {boolean} [ gotHit ]
 * @property {number} height
 * @property {TGroup} [parent]
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {boolean} [ active ]
 * @property {TRect} [ body ]
 * @property {TAnimatedSprite} [ skin ]
 * @property {voidFunc} addBody
 * @property {voidFunc} addSkin
 * @property {FActorSetBodyProps} setBody
 * @property {voidFunc} kill
 * @property {voidFunc} play
 * @property {voidFunc} onHit
 * @property {FItemVsPlayer} vsPlayer
 * @property {FAnimatedSpriteSeFrameIndex} stop
 * @property {FSceneRender} render
 * @property {FSceneUpdate} update
 * @property {FActorAddTo} addTo
 * @property {voidFunc} [destroy]
 * @property {FAnimatedSpriteOnComplete} [ onComplete ]
 */

/**
 * @callback FItemVsPlayer
 * @param {TPlayer} player
 * @param {TGroup} group
 * @returns {void}
 */

/**
 * @callback FItemBase
 * @param {string} name
 * @param {TSpriteTexture} texture
 * @returns {TItemBase}
 */
