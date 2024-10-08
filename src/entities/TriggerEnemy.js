import { Rectangle } from '@packages/display';

/**
 * @type {FTriggerEnemy}
 */
export function TriggerEnemy(nodeList, width, height, color) {
	/**
	 * @type {TNodes}
	 */
	let nodes = nodeList;
	/**
	 * @type {boolean[]}
	 */
	let enemiesTriggered = nodes.map(() => false);

	const o = Rectangle(0, 0, width, height, color);

	const self = Object.assign(o, /** @type {TTriggerEnemy}*/({
		nodes,
		width,
		height,
		register: (index) => {
			// on each trigger call this function to update the list;
			enemiesTriggered[index] = true;
		},
		isJobDone: () => {
			return !enemiesTriggered.includes(false);
		},
		kill: ()=> {
			self.detach();
		}
	}));

	return self;
}
