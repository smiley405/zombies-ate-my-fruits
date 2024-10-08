/**
 * @typedef {object} TPlayerOnlyProps
 * @property {FPlayerVsEnemyTriggers} vsEnemyTriggers
 * @property {FActorVsRects} vsDoors
 * @property {TPlayerPower} [ currentPower ]
 * @property {TPlayerPower[]} powers
 * @property {(state: TPlayerState) => void} changeState
 * @property {voidFunc} syncPowers
 */

/**
 * @typedef {TActor & TPlayerOnlyProps} TPlayer
 */

/**
 * @callback FPlayer
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {TPlayer}
 */

/**
 * @callback FPlayerVsEnemyTriggers
 * @param {TTriggerEnemy[]} collidiers
 * @param {TEnemy[]} enemies
 * @param {TGroup} group
 * @returns {TPlayer}
 */

/**
 * @typedef {'idle' | 'run' | 'jump' | 'attack' | 'hurt'} TPlayerState
 */

/**
 * @typedef {'idle' | 'run' | 'jump' | 'throw' | 'hurt' | 'shootLaser'} TPlayerSkinType
 */

/**
 * @typedef {object} TPlayerPower
 * @property {TPowerType} name
 * @property {number} total
 * @property {number} max
 */

