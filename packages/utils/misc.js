let _totalUID = 0;

export function getUID() {
	return _totalUID += 1;
}

/**
 * @type {FHitTest}
 */
export function hitTest(r1, r2) {
	// TODO:: this is not accurate, wall tunneling effect is seen. Find a better collision like SAT
	/**
	 * avoid using this function on speed collision;; like super fast moving objects
	 */
	const dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
	const dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
	const dw = (r1.width + r2.width) / 2;
	const dh = (r1.height + r2.height) / 2;
	/**
	 * @type {THitTestResult}
	 */
	const collision = {side: '', overlap: null};

	if (Math.abs(dx) < dw && Math.abs(dy) < dh) {
		collision.overlap = {
			x: dw - Math.abs(dx),
			y: dh - Math.abs(dy)
		};

		if (collision.overlap.x >= collision.overlap.y) {
			collision.side = dy > 0 ? 'top' : 'bottom';
		}
		else {
			collision.side = dx > 0 ? 'left' : 'right';
		}
	}

	collision.hit = Boolean(collision.side);

	return collision;
}

/**
 * @type {FOverlap}
 */
export function overlap(r1, r2) {
	var isInHoriztonalBounds = r1.x < r2.x + r2.width && r1.x + r1.width > r2.x;
	var isInVerticalBounds = r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;

	return isInHoriztonalBounds && isInVerticalBounds;
}

/**
 * @param {TDisplayobjectWithUID[]} children
 * @param {TDisplayobjectWithUID} child
 * @returns {number}
 */
export function getChildIndex(children, child) {
	return children.findIndex(o => o.uid === child.uid); 
}

/**
 * @param {number} ms
 * @returns {number}
 */
export function toSeconds(ms) {
	return ms/1000;
}

/**
 * @param {number} duration
 * @returns {number}
 */
export function msToFps(duration) {
	// only 2 decimal places;
	var num = 1000 / duration;
	return Math.floor(num * 100)/100;
}

/**
 * @param {number} fps
 * @returns {number}
 */
export function fpsToMs(fps) {
	// only 2 decimal places;
	var num = 1000 / fps;
	return Math.floor(num * 100)/100;
}

/**
 * @param {Partial<TSpriteTexture>} texture
 * @param {number} frameWidth
 * @param {number} frameHeight
 * @returns {TSpriteTexture}
 */
export function mergeTexture(texture, frameWidth, frameHeight) {
	texture.w = frameWidth;
	texture.h = frameHeight;
	return /** @type {TSpriteTexture}*/(texture);
}

/**
 * @function
 * @template A
 * @param {A} item 
 * @param {A[]} arr 
 * @returns {A[]}
 */
export function removeArrayElement(item, arr) {
	for (var i = arr.length; i >= 0; i--) {
		if (arr[i] === item) {
			arr.splice(i, 1);
			return arr;
		}
	}
	return arr;
}

/**
 * @param {TPoint} follower
 * @param {TPoint} leader
 * @param {number} speed
 * @param {boolean} followX
 * @param {boolean} followY
 * @returns {void}
 */
export function followConstant(follower, leader, speed, followX=true, followY=true) {
	// Figure out the distance between the sprites
	var vx = leader.x - follower.x,
		vy = leader.y - follower.y,
		distance = Math.sqrt(vx * vx + vy * vy);

	// Move the follower if it's more than 1 move
	// away from the leader
	if (distance >= speed) {
		if (followX) {
			follower.x += (vx / distance) * speed;
		}
		if (followY) {
			follower.y += (vy / distance) * speed;
		}
	}
}

