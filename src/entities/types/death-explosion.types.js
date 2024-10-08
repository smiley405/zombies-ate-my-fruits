/**
 * @typedef {object} TDeathExplosionParticle
 * @property {number} uid
 * @property {number} x
 * @property {number} y
 * @property {number} vx
 * @property {number} vy
 * @property {number} g - gravity
 * @property {number} dg - default gravity
 * @property {number} speedX
 * @property {number} alpha
 * @property {TGroup} [parent]
 * @property {boolean} [ grounded ]
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {FSceneRender} [ render ]
 * @property {FDeathExplosionUpdate} update
 * @property {voidFunc} [destroy]
 * @property {FActorAddTo} addTo
 * @property {voidFunc} kill
 * @property {boolean} [ active ]
 */

/**
 * @callback FDeathExplosionParticle
 * @param {TSpriteTexture} texture
 * @param {number} x
 * @param {number} y
 * @returns {TDeathExplosionParticle}
 */

/**
 * @typedef {object} TDeathExplosion
 * @property {string} [ name ]
 * @property {voidFunc} kill
 * @property {FSceneRender} [ render ]
 * @property {FDeathExplosionUpdate} update
 * @property {FDeathExplosionAddTo} addTo
 * @property {boolean} [ active ]
 */

/**
 * @callback FDeathExplosionAddTo
 * @param {number} [ x ]
 * @param {number} [ y ]
 * @param {TGroup} group
 * @param {number} [ index ]
 * @returns {void}
 */

/**
 * @callback FDeathExplosion
 * @param {string} name
 * @param {TSpriteTexture} texture
 * @param {number} [ lifetime ] - in seconds
 * @returns {TDeathExplosion}
 */


/**
 * @typedef {{[name:string]: TDeathExplosionPoolStorage}} TDeathExplosionPoolBasket
 */

/**
 * @typedef {{[id:number]: TDeathExplosion}} TDeathExplosionPoolUpdaters
 */

/**
 * @typedef {object} TDeathExplosionPoolStorage
 * @property {number} max
 * @property {TDeathExplosion[]} pool
 */

/**
 * @typedef {object} TDeathExplosionPool
 * @property {voidFunc} init
 * @property {FDeathExplosionUpdate} update
 * @property {FSceneRender} render
 * @property {FDeathExplosionPoolExtract} get
 * @property {voidFunc} detach
 */

/**
 * @callback FDeathExplosionUpdate  
 * @param {TRect[]} platforms
 * @param {TRect[]} hurts
 * @returns {void}
 */

/**
 * @callback FDeathExplosionPoolExtract
 * @param {TDeathExplosionType} name
 * @returns {TDeathExplosion}
 */

/**
 * @callback FDeathExplosionPool
 * @returns {TDeathExplosionPool}
 */

/**
 * @typedef {'player' | 'enemy' } TDeathExplosionType
 */
