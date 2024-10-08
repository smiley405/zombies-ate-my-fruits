import { MovieClip, Rectangle } from '@packages/display';

/**
 * @type {FIconBase}
 */
export function IconBase(name, width=0, height=0, color='#fff') {
	const body = Rectangle(0, 0, width, height, color);
	body.name = `${name}.body`;

	/**
	 * @type {TIconBase}
	 */
	const self = {
		x: 0,
		y: 0,
		width,
		height,
		name,
		body,
		addTo: (group, index) => {
			if (index !== undefined) {
				group.addAt(self.body, index);
				group.addAt(self.skin, index);
			} else {
				group.add(self.body);
				group.add(self.skin);
			}
			self.parent = group;
		},
		setBody: (width, height, color) => {
			self.body.width = width;
			self.body.height = height;
			self.body.color = color ? color : self.body.color;
		},
		addSkin: (list) => {
			self.skin = MovieClip(list);
			self.skin.name = `${name}.skin`;
		},
		update: () => {
			self.body.update();
			updateSkin();
		},
		render: (ctx) => {
			self.body.render(ctx);
			self.skin.render(ctx);
		},
		reset: () => {
			if (self.skin) {
				self.skin.stop();
			} 

			self.parent = null;
		},
		detach: () => {
			self.skin.detach();
			self.body.detach();
			self.parent = null;
			self.reserved = false;
		},
		play: (animName) => {
			if (self.skin) {
				self.skin.play(animName);
			}
		}
	};

	function updateSkin() {
		const skin = self.skin;
		if (skin) {
			skin.x = self.body.x;
			skin.y = self.body.y;
			skin.update();
		}
	}

	Object.defineProperties(self, {
		x: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.x = value;
			},
			get: () => {
				return self.body.x;
			}
		},
		y: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.y = value;
			},
			get: () => {
				return self.body.y;
			}
		},
		width: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.width = value;
			},
			get: () => {
				return self.body.width;
			}
		},
		height: {
			/**
			 * @param {number} value
			 */
			set: (value) => {
				self.body.height = value;
			},
			get: () => {
				return self.body.height;
			}
		},
		active: {
			get: () => {
				return self.skin.parent && self.body.parent && !self.skin.visible;
			}
		}
	});

	return self;
}
