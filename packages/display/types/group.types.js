/**
 * @typedef {object} TGroupOnlyProps
 * @property {TGroupChildren} children
 * @property {FAddChild} add
 * @property {FAddChildAt} addAt
 * @property {FRemoveChild} remove
 * @property {FRemoveChildren} removeAll
 * @property {FForEachChildOnRender} [onEachRender]
 * @property {FSceneRender} render
 * @property {FSwap} swap
 */

/**
 * @callback FAddChild
 * @param {TDisplayObject} child
 * @returns {void}
 */

/**
 * @callback FAddChildAt
 * @param {TDisplayObject} child
 * @param {number} index
 * @returns {void}
 */

/**
 * @callback FRemoveChild
 * @param {TDisplayObject} child
 * @returns {void}
 */

/**
 * @callback FRemoveChildren
 * @returns {void}
 */

/**
 * @callback FSwap
 * @param {TDisplayObject} child1
 * @param {TDisplayObject} child2
 * @returns {void}
 */

/**
 * @typedef {TDisplayObject[]} TGroupChildren
 */

/**
 * @typedef {TDisplayObject & TGroupOnlyProps} TGroup
 */

/**
 * @callback FGroup
 * @returns {TGroup}
 */

/**
 * @callback FForEachChildOnRender
 * @param {TDisplayObject} child
 * @returns {void}
 */
