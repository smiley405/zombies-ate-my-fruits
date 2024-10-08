/**
 * @typedef {{[name:string]: TPowerPoolStorage}} TPowerPoolBasket
 */

/**
 * @typedef {{[id:number]: TPowerBase}} TPowerPoolUpdaters
 */

/**
 * @typedef {object} TPowerPoolStorage
 * @property {number} max
 * @property {TPowerBase[]} pool
 */

/**
 * @typedef {object} TPowerPool
 * @property {voidFunc} init
 * @property {FPowerUpdate} update
 * @property {FSceneRender} render
 * @property {FPowerPoolExtract} get
 * @property {voidFunc} detach
 */

/**
 * @callback FPowerUpdate  
 * @param {TGroup} group
 * @param {TRect[]} platforms
 * @param {TEnemy[]} enemies
 * @returns {void}
 */

/**
 * @callback FPowerPoolExtract
 * @param {TPowerType} name
 * @returns {TPowerBase}
 */

/**
 * @callback FPowerPool
 * @returns {TPowerPool}
 */

/**
 * @typedef {'fireball' | 'laserBeam' } TPowerType
 */

/**
 * @typedef {object} TPowerBase
 * @property {string} [name]
 * @property {number} x
 * @property {number} y
 * @property {number} vx
 * @property {number} speedX
 * @property {number} scaleX
 * @property {boolean} [ allowHit ]
 * @property {boolean} [ loop ]
 * @property {TRect} [ body ]
 * @property {TAnimatedSprite} [ skin ]
 * @property {number} flipH - 1 or -1
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {number} width
 * @property {number} height
 * @property {TGroup} [parent]
 * @property {FSceneRender} render
 * @property {FSceneUpdate} update
 * @property {voidFunc} [destroy]
 * @property {FActorAddTo} addTo
 * @property {FActorVsRects} vsPlatforms
 * @property {(enemies:TEnemy[], group:TGroup)=>void} vsEnemies
 * @property {voidFunc} addBody
 * @property {voidFunc} addSkin
 * @property {voidFunc} kill
 * @property {voidFunc} play
 * @property {voidFunc} stop
 * @property {(platform:TRect)=>void} onHitPlatform
 * @property {(enemy:TEnemy)=>void} onHitEnemy
 * @property {boolean} [ active ]
 * @property {FAnimatedSpriteOnComplete} [ onComplete ]
 */

/**
 * @callback FPowerBase
 * @param {string} name
 * @param {TSpriteTexture} texture
 * @returns {TPowerBase}
 */
