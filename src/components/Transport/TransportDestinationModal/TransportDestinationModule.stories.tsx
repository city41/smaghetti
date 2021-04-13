import React from 'react';
import { Meta } from '@storybook/react';

import { TransportDestinationModal } from './TransportDestinationModal';
import { RoomState } from '../../make/editorSlice';

const meta: Meta = {
	title: 'TransportDestinationModal',
	component: TransportDestinationModal,
};

export default meta;

const EMPTY_ROOM: RoomState = {
	entities: [],
	tiles: [],
	transports: [],
	roomTileWidth: 16,
	roomTileHeight: 15,
	currentPaletteEntry: 'Goomba',
	canDecreaseScale: false,
	canIncreaseScale: false,
	scale: 1,
	paletteEntries: [],
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
			exitType={0}
		/>
	);
};

export const LevelThatScrolls = () => {
	return (
		<TransportDestinationModal
			isOpen
			onRequestClose={() => {}}
			rooms={[BIG_ROOM]}
			exitType={0}
		/>
	);
};