/**
 * @typedef {object} TScene
 * @property {number} uid
 * @property {TStage} stage
 * @property {FSceneRender} render
 * @property {voidFunc} update
 * @property {voidFunc} destroy
 */

/**
 * @callback FSceneUpdate  
 * @returns {void}
 */

/**
 * @callback FSceneRender  
 * @param {CanvasRenderingContext2D} ctx 
 * @returns {void}
 */

/**
 * @callback FScene
 * @returns {TScene}
 */
