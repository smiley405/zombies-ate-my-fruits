/**
 * @typedef {object} TActor
 * @property {number} uid
 * @property {string} [name]
 * @property {number} x
 * @property {number} y
 * @property {number} vx
 * @property {number} vy
 * @property {number} health
 * @property {number} alpha
 * @property {number} gravity
 * @property {number} dGravity - default gravity
 * @property {number} jGravity - jump gravity
 * @property {number} jForce - jump force
 * @property {number} speedX
 * @property {boolean} [ attacking ]
 * @property {boolean} [ reserved ] - when extracted from pool but not spawned
 * @property {boolean} [ dead ]
 * @property {boolean} [ grounded ]
 * @property {boolean} [ jumping ]
 * @property {boolean} [ falling ]
 * @property {boolean} [ moving ]
 * @property {TRect} [ body ]
 * @property {TMovieClip} [ skin ]
 * @property {number} flipH - 1 or -1
 * @property {number} width
 * @property {number} height
 * @property {TGroup} [parent]
 * @property {FSceneRender} render
 * @property {FSceneUpdate} update
 * @property {voidFunc} [destroy]
 * @property {FRemoveFromParent} detach
 * @property {FActorAddTo} addTo
 * @property {FActorSetVisibility} setVisible
 * @property {FActorSetBodyProps} setBody
 * @property {FActorVsRects} vsPlatforms
 * @property {FActorVsRects} vsHurts
 * @property {FActorReceiveDamage} receiveDamage
 * @property {(list:TMovieClipList) => void} addSkin
 * @property {voidFunc} doFlipH
 * @property {voidFunc} kill
 * @property {voidFunc} reset
 * @property {voidFunc} voidGravity
 * @property {voidFunc} resetGravity
 * @property {voidFunc} resetVx
 * @property {voidFunc} resetVy
 * @property {voidFunc} resetGravity
 * @property {voidFunc} onLanded
 * @property {boolFunc} isFlipH
 * @property {boolean} [ active ]
 * @property {FActorAddSfx} addSfx
 * @property {FActorExplode} explode
 */

/**
 * @callback FActorExplode
 * @param {TDeathExplosionType} type
 * @returns {void}
 */

/**
 * @callback FActorAddSfx
 * @param {TSfxType} type
 * @returns {void}
 */

/**
 * @callback FActorIsFlipH
 * @returns {boolean}
 */

/**
 * @callback FActorReceiveDamage
 * @param {number} amount
 * @param {*} from - any displayObject
 * @returns {void}
 */

/**
 * @callback FActorVsRects
 * @param {TRect[]} colliders
 * @param {TGroup} group
 * @returns {void}
 */

/**
 * @callback FActorAddTo
 * @param {TGroup} group
 * @param {number} [ index ]
 * @returns {void}
 */

/**
 * @callback FActorSetVisibility
 * @param {boolean} bodyVisible
 * @param {boolean} skinVisible
 * @returns {void}
 */

/**
 * @callback FActorSetBodyProps
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {void}
 */

/**
 * @callback FActor
 * @param {string} name
 * @param {number} width
 * @param {number} height
 * @param {string} [ color ]
 * @returns {TActor}
 */
