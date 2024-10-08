/**
 * @callback FCanvasLayers
 * @returns {TCanvasLayers}
 */

/**
 * @typedef {object} TCanvasLayers
 * @property {FCanvasLayersAdd} add
 * @property {FCanvasLayersRemove} remove
 * @property {FCanvasLayersGet} get
 */

/**
 * @callback FCanvasLayersAdd
 * @param {string} id
 * @param {number} width
 * @param {number} height
 * @returns {TCanvasLayer}
 */

/**
 * @callback FCanvasLayersRemove
 * @param {string} id
 * @returns {void}
 */

/**
 * @callback FCanvasLayersGet
 * @param {string} id
 * @returns {TCanvasLayer}
 */

/**
 * @typedef {object} TCanvasLayer
 * @property {string} id
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} ctx
 */

