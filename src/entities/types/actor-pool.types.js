/**
 * @typedef {object} TActorPool
 * @property {voidFunc} init
 * @property {voidFunc} initPlayer
 * @property {voidFunc} initEnemies
 * @property {voidFunc} detach
 * @property {(name:TEnemyType)=>TEnemy} getEnemy
 * @property {()=>TPlayer} getPlayer
 */

/**
 * @callback FActorPool
 * @returns {TActorPool}
 */

/**
 * @typedef {object} TEnemyPoolStorage
 * @property {number} max
 * @property {TEnemy[]} pool
 */
