/**
 * @typedef {object} TDisplayObject
 * @property {number} uid - private only
 * @property {string} [name]
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {number} scaleX
 * @property {number} scaleY
 * @property {number} pivotX
 * @property {number} pivotY
 * @property {number} rotation
 * @property {boolean} visible
 * @property {number} alpha
 * @property {TGroup} [parent]
 * @property {number} gx
 * @property {number} gy
 * @property {FSceneRender} [render]
 * @property {FSceneUpdate} [update]
 * @property {voidFunc} [destroy]
 * @property {FRemoveFromParent} detach
 */

/**
 * @callback FRemoveFromParent  
 * @returns {void}
 */

/**
 * @typedef {object} TDisplayobjectWithUID
 * @property {number} [ uid ]
 */

/**
 * @callback FDisplayObject
 * @returns {TDisplayObject}
 */
