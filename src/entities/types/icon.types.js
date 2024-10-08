/**
 * @typedef {object} TIconBaseOnlyProps
 * @property {string} [ name ]
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {TGroup} [parent]
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {boolean} [ active ]
 * @property {TRect} [ body ]
 * @property {TMovieClip} [ skin ]
 * @property {(list:TMovieClipList) => void} addSkin
 * @property {FSceneRender} render
 * @property {FSceneUpdate} update
 * @property {FActorAddTo} addTo
 * @property {FActorSetBodyProps} setBody
 * @property {(animName: TIconSkinType ) => void} play
 * @property {voidFunc} reset
 * @property {voidFunc} detach
 */

/**
 * @typedef {TIconBaseOnlyProps} TIconBase
 */

/**
 * @typedef {'idle' | 'selected' } TIconSkinType
 */

/**
 * @callback FIconBase
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {TIconBase}
 */
