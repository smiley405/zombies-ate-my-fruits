/**
 * @typedef {object} TEnemyOnlyProps
 * @property {TEnemyType} type
 * @property {voidFunc} watchFlip
 * @property {voidFunc} disappear
 * @property {boolFunc} [ isToBeTriggered ]
 * @property {FActorVsRects} vsReversers
 * @property {FActorVsRects} vsHiders
 * @property {FEnemyVsPlayer} vsPlayer
 * @property {FEnemyOnTrigger} onTrigger
 * @property {(triggerState: TEnemyState)=>void} waitForTrigger
 * @property {(state: TEnemyState) => void} changeState
 */

/**
 * @typedef {TActor & TEnemyOnlyProps} TEnemy
 */

/**
 * @callback FEnemyOnTrigger
 * @param {TTriggerEnemy} from
 * @param {number} initialFlipH
 * @param {boolean} [ isPlaySound ]
 * @returns {void}
 */

/**
 * @callback FEnemy
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {TEnemy}
 */

/**
 * @callback FEnemyVsPlayer
 * @param {TPlayer} player
 * @param {TGroup} group
 * @returns {void}
 */

/**
 * @typedef {'dig' | 'rise' | 'run' | 'none'} TEnemyState
 */

/**
 * @typedef {'dig' | 'rise' | 'run'} TEnemySkinType
 */

/**
 * @typedef {'ryan' | 'mojo' | 'thor' } TEnemyType
 */

