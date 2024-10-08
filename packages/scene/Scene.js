import { Stage } from '@packages/display';
import { getUID } from '@packages/utils/misc';

/**
 * @type {FScene}
 */
export function Scene() {
	const stage = Stage();

	/**
	 * @type {TScene}
	 */
	let self = {
		uid: getUID(),
		stage,
		render: (ctx) => {
			stage.render(ctx);
		},
		update: () => {
			stage.update();
		},
		destroy: () => {
			stage.destroy();
		}
	};

	return self;
}
