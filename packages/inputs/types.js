/**
 * @callback FKeyboard
 * @param {TKeyboardKeys} keys
 * @returns {TKeybaord}
 */

/**
 * @typedef {{[name: string]: string}} TKeyboardKeys
 */

/**
 * @typedef {{[name: string]: TKeyState}} TKeyboardInputkeys
 */

/**
 * @typedef {object} TKeyState
 * @property {string} code
 * @property {boolean} [down]
 * @property {voidFunc} [onDown]
 */

/**
 * @typedef {object} TKeybaord
 * @property {(key:string)=>TKeyState} is
 */

/**
 * @callback FKeyIsDown 
 * @param {TGameKeyMapping} key
 * @returns {boolean}
 */

/**
 * @typedef {'k' | 'a' | 'd' | 'j' | 'h' | ' '} TGameKeyCode
 */

/**
 * @typedef {'jump' | 'left' | 'right' | 'slash' | 'shoot' | 'ok'} TGameKeyMapping
 */

