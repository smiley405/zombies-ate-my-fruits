import { Group } from './Group';

/**
 * @type {FStage}
 */
export function Stage() {
	const self = Object.assign(Group(), /** @type {TStage}*/({
		isStage: true,
		name: 'stage'
	}));

	return self;
}
