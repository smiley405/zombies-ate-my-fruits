/**
 * @typedef {object} TCanvasPoolProps
 * @property {boolean} [ cached ]
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 */

/**
 * @typedef {{[uid: string]: TCanvasPoolProps}} TCanvasPool
 */

/**
 * @callback FToPool
 * @param {string} uid 
 * @returns {TCanvasPoolProps}
 */

/**
 * @callback FDropPool
 * @param {string} uid
 */
