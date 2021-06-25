import React from 'react';
import { Meta } from '@storybook/react';

import { TransportDestinationModal } from './TransportDestinationModal';
import { RoomState } from '../../editor/editorSlice';
import {
	BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES,
	BACKGROUND_GRAPHIC_VALUES,
	MUSIC_VALUES,
} from '../../../levelData/constants';

const meta: Meta = {
	title: 'TransportDestinationModal',
	component: TransportDestinationModal,
};

export default meta;

const EMPTY_ROOM: RoomState = {
	settings: {
		music: MUSIC_VALUES.Underground,
		bgColor: 0,
		bgGraphic: BACKGROUND_GRAPHIC_VALUES.underground,
		bgExtraColorAndEffect: BACKGROUND_EXTRA_COLOR_AND_EFFECT_VALUES.none,
	},
	actors: {
		entities: [],
		matrix: [],
		locked: false,
	},
	stage: {
		entities: [],
		matrix: [],
		locked: false,
	},
	roomTileWidth: 16,
	roomTileHeight: 15,
	currentPaletteEntry: 'Goomba',
	canDecreaseScale: false,
	canIncreaseScale: false,
	scale: 1,
	paletteEntries: [],
	validEntityTypes: [],
	editorVisibleWindow: {
		height: 0,
		width: 0,
		offset: {
			x: 0,
			y: 0,
		},
	},
	scrollOffset: { x: 0, y: 0 },
};

const BIG_ROOM: RoomState = {
	...EMPTY_ROOM,
	roomTileWidth: 150,
	roomTileHeight: 60,
};

export const Basic = () => {
	return (
		<TransportDestinationModal
			isOpen
			onRequestClose={() => {}}
			rooms={[EMPTY_ROOM]}
		/>
	);
};

export const LevelThatScrolls = () => {
	return (
		<TransportDestinationModal
			isOpen
			onRequestClose={() => {}}
			rooms={[BIG_ROOM]}
		/>
	);
};
