/**
 * @typedef {{x:number, y:number}[]} TNodes
 */

/**
 * @typedef {object} TTriggerEnemyOnlyProps
 * @property {(index:number)=>void} register
 * @property {boolFunc} isJobDone
 * @property {voidFunc} kill
 * @property {TNodes} nodes
 */

/**
 * @typedef {TRect & TTriggerEnemyOnlyProps} TTriggerEnemy
 */

/**
 * @callback FTriggerEnemy
 * @param {TNodes} nodeList
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {TTriggerEnemy}
 */
