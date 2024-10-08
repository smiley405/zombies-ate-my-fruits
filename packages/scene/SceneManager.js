/**
 * @type {FSceneManager}
 */
export function SceneManager() {
	/**
	 * @type {TScene}
	 */
	let _scene;

	/**
	 * @type {TSceneManager}
	 */
	let self = {
		set: (scene) => {
			if (_scene) {
				_scene.destroy();
			}
			_scene = scene();
		},
		render: (ctx) => {
			const canvas = ctx.canvas;
			if (_scene) {
				ctx.setTransform(1,0,0,1,0,0);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				_scene.render(ctx);
			} else {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		},
		update: () => {
			if (_scene) {
				_scene.update();
			}
		},
		clear: () => {
			if (_scene) {
				_scene.destroy();
			}
			_scene = null;
		}
	};

	return self;
}
