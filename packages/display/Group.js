import { getChildIndex, removeArrayElement } from '@packages/utils/misc';

import { DisplayObject, renderProps } from './DisplayObject';

/**
 * @type {FGroup}
 */
export function Group() {
	let _calcWidth = 0;
	let _calcHeight = 0;
	/**
	 * @type {TGroupChildren}
	 */
	let _children = [];

	const self = Object.assign(DisplayObject(), /** @type {TGroup}*/({
		children: _children,
		add: (child) => {
			if (child.parent) {
				child.detach();
			}
			child.parent = self;
			self.children.push(child);
			calculateSize();
		},
		addAt: (child, index) => {
			if (child.parent) {
				child.detach();
			}
			child.parent = self;
			_children.splice(index, 0, child);
			calculateSize();
		},
		swap: (child1, child2) => {
			if (child1.uid === child2.uid) return;
			const index1 = getChildIndex(_children, child1); 
			const index2 = getChildIndex(_children, child2); 

			if (index1 < 0 || index2 < 0) return;

			_children[index1] = child2;
			_children[index2] = child1;
		},
		remove: (child) => {
			if (child.parent && child.parent.uid === self.uid) {
				// const index = getChildIndex(_children, child); 
				// _children.splice(index, 1);
				removeArrayElement(child, self.children);
				child.parent = null;
				calculateSize();
			}
		},
		removeAll: () => {
			_children.forEach(child => {
				self.remove(child);
			});

			_children.length = 0;
			calculateSize();
		},
		render: (ctx) => {
			_children.forEach(child => {
				ctx.globalAlpha = child.alpha;
				renderProps(self, ctx);
				if (child.render) {
					child.render(ctx);
				}
				if (self.onEachRender) {
					self.onEachRender(child);
				}
			});
		},
		update: () => {
			_children.forEach(child => {
				if (child.update) {
					child.update();
				}
			});
		},
		destroy: () => {
			_children.forEach(child => {
				if (child.destroy) {
					child.destroy();
				}
			});
			self.removeAll();
		},
	}));

	function calculateSize() {
		if (_children.length > 0) {
			_calcWidth = 0;
			_calcHeight = 0;

			_children.forEach(child => {
				if (child.x + child.width > _calcWidth) {
					_calcWidth = child.x + child.width;
				}
				if (child.y + child.height > _calcHeight) {
					_calcHeight = child.y + child.height;
				}
			});
			self.width = _calcWidth;
			self.height = _calcHeight;
		}
	}

	return self;

}
