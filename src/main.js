import { Game } from './Game';

window.onload = () => {
	// Test();
	Game();
	window.focus();
	document.body.addEventListener('click', function() {
		window.focus();
	}, false);
};

