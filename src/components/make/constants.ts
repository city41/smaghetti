import { TILE_SIZE } from '../../tiles/constants';

const GBA_SCREEN_WIDTH = 240;
const GBA_SCREEN_HEIGHT = 160;

// when telling sma4 how wide a room is, it's a number * this increment
export const ROOM_WIDTH_INCREMENT = 16;

export const PLAY_WINDOW_TILE_WIDTH = GBA_SCREEN_WIDTH / TILE_SIZE;
export const PLAY_WINDOW_TILE_HEIGHT = GBA_SCREEN_HEIGHT / TILE_SIZE;
export const INITIAL_ROOM_TILE_WIDTH = ROOM_WIDTH_INCREMENT * 6;

// this is the same as classic 1-2, an arbitrary early choice
export const INITIAL_ROOM_TILE_HEIGHT = 27;

export const INITIAL_PLAYER_X_TILE = 2;
export const INITIAL_PLAYER_Y_TILE = INITIAL_ROOM_TILE_HEIGHT - 2;

export const MIN_ROOM_TILE_WIDTH = ROOM_WIDTH_INCREMENT;
export const MAX_ROOM_TILE_WIDTH = ROOM_WIDTH_INCREMENT * 16;

export const MIN_ROOM_TILE_HEIGHT = PLAY_WINDOW_TILE_HEIGHT;

// 64 and up causes the map to wrap, and corrupts the level
export const MAX_ROOM_TILE_HEIGHT = 63;
