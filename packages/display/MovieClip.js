import { AnimatedSprite } from './AnimatedSprite';
import { DisplayObject } from './DisplayObject';

/**
 * @type {FMovieClip}
 */
export function MovieClip(list) {
	/**
	 * @type {TMovieClipAnimations}
	 */
	let animations = {};
	/**
	 * @type {TAnimatedSprite}
	 */
	let currentAnim;

	for (let name in list) {
		const data = list[name];
		const anim = AnimatedSprite(data.texture, false);
		anim.loop = data.loop ?? anim.loop;
		anim.name = name;
		animations[name] = anim;
		currentAnim = anim;
	}

	const o = DisplayObject();

	const self = Object.assign(o, /** @type {TMovieClip}*/ ({
		render: (ctx) => {
			if (!self.visible || !currentAnim) {
				return;
			}

			currentAnim.render(ctx);
		},
		update: () => {
			currentAnim.update();
			updateAnimations();
		},
		play: (name, frameIndex) => {
			if (isAnimPlaying(name)) {
				return;
			}
			if (currentAnim) {
				currentAnim.stop();
				// currentAnim.visible = false;
				currentAnim.onComplete = null;
			}
			currentAnim = animations[name];
			currentAnim.onComplete = (name) => {
				if (self.onComplete) {
					self.onComplete(name);
				}
			};

			currentAnim.start(frameIndex);
		},
		stop: (frameIndex) => {
			if (currentAnim) {
				currentAnim.stop(frameIndex);
			}
		},
	}));

	function updateAnimations() {
		for (let name in animations) {
			const anim = animations[name];
			copyProps(self, anim);
		}
	}

	/**
	 * @param {string} animName
	 * @returns {boolean}
	 */
	function isAnimPlaying(animName) {
		return currentAnim && currentAnim.playing && animName === currentAnim.name;
	}

	/**
	 * @param {TDisplayObject} from
	 * @param {TDisplayObject} to
	 */
	function copyProps(from, to) {
		const commonProps = [
			'x',
			'y',
			'alpha',
			'width',
			'height',
			'scaleX',
			'scaleY',
			'pivotX',
			'pivotY',
			'rotation',
			'visible',
		];
		commonProps.forEach((key) => {
			to[key] = from[key];
		});
	}

	return self;
}
