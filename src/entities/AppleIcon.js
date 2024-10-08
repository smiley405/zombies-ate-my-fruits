import { APPLE_SELECTED_ICON, APPLE_STATIC_ICON } from 'media/uiAssets';

import { IconBase } from './IconBase';

/**
 * @type {FIconBase}
 */
export function AppleIcon(name, width, height, color) {
	const self = IconBase(name, width, height, color);

	self.addSkin({
		selected: { texture: APPLE_SELECTED_ICON, loop: true },
		idle: { texture: APPLE_STATIC_ICON, loop: false },
	});

	self.skin.play('idle');

	self.skin.onComplete = (/** @type{TIconSkinType}*/ animName) => {
		// if (animName === 'rise') {
		// 	self.changeState('run');
		// }
		// if (animName === 'dig') {
		// 	self.disappear();
		// }
	};

	return self;
}
