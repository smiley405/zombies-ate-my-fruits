/**
 * @typedef {object} TRoot
 * @property {TRootSceneManager} scene
 * @property {TCanvasLayers} layers
 * @property {TActorPool} actorPool
 * @property {TSfxPool} sfxPool
 * @property {TPowerPool} powerPool
 * @property {TDeathExplosionPool} dexpPool
 * @property {TItemsPool} itemsPool
 */

/**
 * @typedef {object} TRootSceneManager
 * @property {FRootSetScene} set
 * @property {FRootSceneRender} render
 * @property {FSceneUpdate} update
 * @property {voidFunc} next
 * @property {voidFunc} reload
 */

/**
 * @callback FRootSetScene
 * @param {number} sceneIndex
 * @returns {void}
 */

/**
 * @callback FRootSceneRender  
 * @param {TCanvasLayer} fgScene 
 * @param {TCanvasLayer} bgScene 
 * @param {TCanvasLayer} uiScene 
 * @returns {void}
 */


/**
 * @typedef {object} TStore
 * @property {number} [ sceneIndex ]
 * @property {TPlayerPower} fireBall
 * @property {TPlayerPower} laserBeam
 * @property {TPowerType} currentPowerName
 * @property {boolean} [ loaded ]
 * @property {boolean} [ gameOver ]
 * @property {boolean} [ gameWin ]
 * @property {voidFunc} resetPlayerProgress
 * @property {FStoreSetPlayerPower} setPlayerPower
 */

/**
 * @callback FStoreSetPlayerPower  
 * @param {TPowerType} powerType 
 * @param {number} total 
 * @returns {void}
 */
