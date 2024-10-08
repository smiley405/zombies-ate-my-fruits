/**
 * @typedef {object} TRectOnlyProps
 * @property {TFillStyle} color
 */

/**
 * @typedef {TDisplayObject & TRectOnlyProps} TRect
 */

/**
 * @callback FRect
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {TFillStyle} [color]
 * @returns {TRect}
 */

/**
 * @typedef {string | CanvasGradient | CanvasPattern} TFillStyle
 */
