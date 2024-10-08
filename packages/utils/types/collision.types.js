/**
 * @typedef {object} THitTestResult
 * @property {boolean} [ hit ]
 * @property {TCollisionSide} side
 * @property {TPoint} overlap
 */

/**
 * @typedef {'top' | 'bottom' | 'left' | 'right' | ''} TCollisionSide
 */

/**
 * @callback FHitTest
 * @param {TRect} source
 * @param {TRect} other
 * @returns {THitTestResult}
 */

/**
 * @callback FOverlap
 * @param {TRectBounds} source
 * @param {TRectBounds} other
 * @returns {boolean}
 */
