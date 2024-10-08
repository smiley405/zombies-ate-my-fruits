/**
 * @callback FTicker
 * @param {FTickerProps} [props]
 * @returns {TTicker}
 */

/**
 * @typedef {object} TTicker
 * @property {FTickerAdd} add
 * @property {FTickerRemove} remove
 * @property {TTickerTimer} timer
 */

/**
 * @typedef {object} TTickerTimer
 * @property {number} dt - delta time
 * @property {number} fdt - fixed delta time
 * @property {number} edt - elapsed time
 * @property {number} time - time since loaded
 */

/**
 * @callback FTickerUpdate
 * @param {number} [dt]
 * @returns {void}
 */

/**
 * @callback FTickerAdd
 * @param {TTickerTypes} type
 * @param {FTickerUpdate} callback
 * @returns {number}
 */

/**
 * @callback FTickerRemove
 * @param {number} id
 * @param {TTickerTypes} type
 * @returns {void}
 */

/**
 * @typedef {'update' | 'render'} TTickerTypes
 */

/**
 * @typedef {object} FTickerProps
 * @property {number} [fps]
 * @property {FTickerOnVisibilityChange} [onVisibilityChange]
 */

/**
 * @callback FTickerOnVisibilityChange
 * @param {boolean} [visible]
 * @returns {void}
 */

/**
 * @typedef {{[id: string]: FTickerUpdate}} TTickerUpdaters
 */

/**
 * @typedef {{[id: string]: FTickerRender}} TTickerRenderers
 */

/**
 * @typedef {() => void} FTickerRender
 */
