import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

type OnPressCallback = (gamepad: Array<Gamepad | null>) => void;

function useGamepads(
	onPressCallback: OnPressCallback,
	dependencies: unknown[]
) {
	const previousGamepadsData = useRef<Array<Gamepad | null>>([]);

	useEffect(() => {
		let disconnected = false;

		function handlePoll() {
			const nextData = Array.from(navigator.getGamepads());

			if (!isEqual(previousGamepadsData.current, nextData)) {
				previousGamepadsData.current = nextData;
				onPressCallback(nextData);
			}

			if (!disconnected) {
				requestAnimationFrame(handlePoll);
			}
		}

		// window.addEventListener('gamepadconnected', handlePoll);
		// window.addEventListener('gamepaddisconnected', handlePoll);
		requestAnimationFrame(handlePoll);

		return () => {
			disconnected = true;

			// window.removeEventListener('gamepadconnected', handlePoll);
			// window.removeEventListener('gamepaddisconnected', handlePoll);
		};
	}, [onPressCallback, ...dependencies]);
}

export { useGamepads };
