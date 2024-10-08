import { CORN_SELECTED_ICON, CORN_STATIC_ICON } from 'media/uiAssets';

import { IconBase } from './IconBase';

/**
 * @type {FIconBase}
 */
export function CornIcon(name, width, height, color) {
	const self = IconBase(name, width, height, color);

	self.addSkin({
		selected: { texture: CORN_SELECTED_ICON, loop: true },
		idle: { texture: CORN_STATIC_ICON, loop: false },
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
