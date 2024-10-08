/**
 * @callback FKillTimers
 * @returns {void}
 */

/**
 * @callback FTimer
 * @param {number} duration - in seconds
 * @returns {TTimer}
 */

/**
 * @typedef {object} TTimer
 * @property {number} uid
 * @property {number} dt - delta time
 * @property {voidFunc} _update
 * @property {voidFunc} kill
 * @property {voidFunc} reset
 * @property {boolFunc} [ running ]
 */

/**
 * @callback FIntervalTimer
 * @param {number} duration - in seconds
 * @param {voidFunc} [ callback ]
 * @returns {TTimer}
 */

/**
 * @callback FWaitTimer
 * @param {number} duration - in seconds
 * @param {voidFunc} [ callback ]
 * @returns {TTimer}
 */

/**
 * @typedef {{[uid:number]: TTimer}} TTimers 
 */
