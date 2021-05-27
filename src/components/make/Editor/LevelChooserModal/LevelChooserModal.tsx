import React, { ReactNode } from 'react';
import { Modal } from '../../../Modal';
import { RoomThumbnail } from '../../../RoomThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../constants';
import { ROOM_TYPE_SETTINGS } from '../../../../levelData/constants';
import { getExampleLevel } from '../../../FileLoader/files';
import { deserialize } from '../../../../level/deserialize';
import { LOCALSTORAGE_KEY } from '../../editorSlice';

type PublicLevelChooserModalProps = {
	isOpen: boolean;
};

type InternalLevelChooserModalProps = {
	onLocalStorageLevelChosen: () => void;
	onExampleLevelChosen: () => void;
	onBlankLevelChosen: () => void;
};

const EMPTY_ROOM: RoomData = {
	settings: ROOM_TYPE_SETTINGS.underground,
	actors: {
		entities: [],
		matrix: [],
	},
	stage: {
		entities: [],
		matrix: [],
	},
	roomTileHeight: PLAY_WINDOW_TILE_HEIGHT,
	roomTileWidth: PLAY_WINDOW_TILE_WIDTH * 2,
	paletteEntries: [],
};

function LevelButton({
	caption,
	onClick,
	children,
}: {
	caption: string;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button className="relative border-2 border-white group" onClick={onClick}>
			{children}
			<div className="absolute top-0 left-0 w-full h-full block group-hover:hidden bg-white opacity-25" />
			<div className="w-full grid place-items-center font-bold transform">
				<div className="bg-gray-700 group-hover:bg-blue-500 w-full py-1">
					{caption}
				</div>
			</div>
		</button>
	);
}

function LevelChooserModal({
	isOpen,
	onLocalStorageLevelChosen,
	onExampleLevelChosen,
	onBlankLevelChosen,
}: PublicLevelChooserModalProps & InternalLevelChooserModalProps) {
	const serializedExampleLevel = getExampleLevel();

	const exampleRoom = serializedExampleLevel
		? deserialize(serializedExampleLevel.data).levelData.rooms[0]
		: null;

	const localStorageData = localStorage[LOCALSTORAGE_KEY];
	const localRoom = localStorageData
		? deserialize(JSON.parse(localStorageData).levelData).levelData.rooms[0]
		: EMPTY_ROOM;

	return (
		<Modal title="Choose a starting point" isOpen={isOpen}>
			<div className="grid grid-cols-2 items-center justify-items-center pb-2">
				<LevelButton
					caption={
						localStorageData ? 'Last level you worked on' : 'Empty level'
					}
					onClick={onLocalStorageLevelChosen}
				>
					<RoomThumbnail
						upperLeftTile={{
							x: 0,
							y: localRoom.roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
						}}
						widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
						heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
						scale={0.65}
						room={localRoom}
					/>
				</LevelButton>
				<LevelButton caption="Example Level" onClick={onExampleLevelChosen}>
					{exampleRoom && (
						<RoomThumbnail
							upperLeftTile={{
								x: 0,
								y: exampleRoom.roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
							}}
							widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
							heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
							scale={0.65}
							room={exampleRoom}
						/>
					)}
				</LevelButton>
			</div>
			{localStorageData && (
				<a
					className="text-blue-300 block w-full text-center hover:underline cursor-pointer"
					onClick={onBlankLevelChosen}
				>
					or start fresh
				</a>
			)}
		</Modal>
	);
}

export { LevelChooserModal };
export type { PublicLevelChooserModalProps };
