/**
 * @type {FKeyboard}
 */
export function Keyboard(keys) {
	/**
	 * @type {TKeyboardInputkeys}
	 */
	const inputKeys = {}; 

	for (let key in keys) {
		inputKeys[key] = {
			code: keys[key],
			down: false,
		};
	}

	window.addEventListener('keydown', onKeyDownHandler, false);
	window.addEventListener('keyup', onKeyUpHandler, false);

	/**
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	function onKeyDownHandler(e) {
		setKeyPressState(e.key, true);
		// e.preventDefault();
	}

	/**
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	function onKeyUpHandler(e) {
		setKeyPressState(e.key, false);
		// e.preventDefault();
	}

	/**
	 * @param {string} keyCode
	 * @param {boolean} isDown
	 * @returns {void}
	 */
	function setKeyPressState(keyCode, isDown) {
		const keys = Object.keys(inputKeys);
		keys.forEach(key => {
			const inputKey = inputKeys[key];

			if (keyCode === inputKey.code) {
				if (isDown) {
					if (!inputKey.down && inputKey.onDown) {
						inputKey.onDown();
					}
				}

				inputKey.down = isDown;
			}
		});
	}

	return {
		is: (key) => {
			return inputKeys[key];
		},
	};
}
