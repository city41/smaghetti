import { TILE_SIZE } from '../../tiles/constants';

const GBA_SCREEN_WIDTH = 240;
const GBA_SCREEN_HEIGHT = 160;

// when telling sma4 how wide a room is, it's a number * this increment
export const ROOM_WIDTH_INCREMENT = 16;

export const PLAY_WINDOW_TILE_WIDTH = GBA_SCREEN_WIDTH / TILE_SIZE;
export const PLAY_WINDOW_TILE_HEIGHT = GBA_SCREEN_HEIGHT / TILE_SIZE;
export const INITIAL_ROOM_TILE_WIDTH = ROOM_WIDTH_INCREMENT * 6;

// this is the height of the end of level backdrop + 1
export const INITIAL_ROOM_TILE_HEIGHT = 27;

export const INITIAL_PLAYER_X_TILE = 2;
export const INITIAL_PLAYER_Y_TILE = INITIAL_ROOM_TILE_HEIGHT - 2;

export const MAX_LEVEL_TILE_WIDTH = 240;
export const MIN_LEVEL_TILE_WIDTH = PLAY_WINDOW_TILE_WIDTH;

export const MAX_LEVEL_TILE_HEIGHT = 240;
export const MIN_LEVEL_TILE_HEIGHT = PLAY_WINDOW_TILE_HEIGHT;
