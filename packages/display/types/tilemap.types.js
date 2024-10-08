/**
 * @typedef {object} TTilemapOnlyProps
 * @property {string} [ name ]
 */

/**
 *  @typedef {TSprite & TTilemapOnlyProps} TTilemap
 */ 

/**
 * @typedef {number[]} TTilesData
 */

/**
 * @callback FTilemap
 * @param {TSpriteTexture} tilesTexture
 * @param {TTilesData} tilesData
 * @param {number} gridCellsX
 * @param {number} [ gridCellsY ]
 * @returns {TTilemap}
 */
