import { TILE_SIZE } from '../tiles/constants';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../components/editor/constants';

const INCREMENT = 0.25;

const PLAY_WINDOW_WIDTH = PLAY_WINDOW_TILE_WIDTH * TILE_SIZE;
const PLAY_WINDOW_HEIGHT = PLAY_WINDOW_TILE_HEIGHT * TILE_SIZE;

function getPlayerScaleFromWindow(verticalBuffer = 0): number {
	if (typeof window === 'undefined') {
		return 1;
	}

	const bestRawScale = Math.min(
		window.innerWidth / PLAY_WINDOW_WIDTH,
		(window.innerHeight - verticalBuffer) / PLAY_WINDOW_HEIGHT
	);

	return Math.floor(bestRawScale / INCREMENT) * INCREMENT;
}

export { getPlayerScaleFromWindow };
