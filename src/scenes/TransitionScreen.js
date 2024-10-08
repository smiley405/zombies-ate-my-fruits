import { GAME_HEIGHT, GAME_WIDTH } from '@game/const';
import { Text } from '@game/GameUtils';
import { Rectangle } from '@packages/display';
import { WaitTimer } from '@packages/timer';

/**
 * @type {FTransitionScreen}
 */
export function TransitionScreen() {
	let active = true;
	const lifetime = 3;
	const o = Rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT);
	const loadingText = Text('Loading...');
	const self = Object.assign(o,  /** @type {TTransitionScreen}*/({
		addTo: (group, index) => {
			if (index !== undefined) {
				group.addAt(self, index);
			} else {
				group.add(self);
			}

			loadingText.x = GAME_WIDTH/2 - 15;
			loadingText.y = GAME_HEIGHT/2;
			group.add(loadingText);

			self.parent = group;
			WaitTimer(lifetime, self.kill);
		},
		kill: () => {
			self.detach();
			loadingText.detach();
			active = false;
		}
	}));

	Object.defineProperties(self, {
		active: {
			get: () => {
				return active;
			}
		}
	});

	return self;
}
