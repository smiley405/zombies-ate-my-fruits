/**
 * @param {number} value
 * @returns {string}
 */
export function toPx(value) {
	return value + 'px';
}

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
export function getElementById(id) {
	return /** @type {HTMLElement} */(document.getElementById(id));
}

/**
 * @param {string} id
 * @returns {HTMLButtonElement}
 */
export function getButtonElementById(id) {
	return /** @type {HTMLButtonElement} */(document.getElementById(id));
}

