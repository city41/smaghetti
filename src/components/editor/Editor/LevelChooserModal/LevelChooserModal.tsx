import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Modal } from '../../../Modal';
import { RoomThumbnail } from '../../../RoomThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../constants';
import { getExampleLevel } from '../../../FileLoader/files';
import { deserialize } from '../../../../level/deserialize';
import { initialRoomState, LOCALSTORAGE_KEY } from '../../editorSlice';
import { convertLevelToLatestVersion } from '../../../../level/versioning/convertLevelToLatestVersion';
import { SavedLevels } from './SavedLevels';

import styles from './LevelChooserModal.module.css';

type PublicLevelChooserModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

type InternalLevelChooserModalProps = {
	onLocalStorageLevelChosen: () => void;
	onExampleLevelChosen: () => void;
	onBlankLevelChosen: () => void;
	isLoggedIn: boolean;
	isAdmin: boolean;
	loadingLevelsState: 'none' | 'dormant' | 'loading' | 'error' | 'success';
	savedLevels: Array<Level | BrokenLevel>;
	onLevelChosen: (level: Level) => void;
	onDeleteLevel: (level: Level | BrokenLevel) => void;
	onTogglePublishLevel: (level: Level) => void;
};

const THUMBNAIL_SCALE = 0.5;

const EMPTY_ROOM = initialRoomState;

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
	isLoggedIn,
	isAdmin,
	loadingLevelsState,
	savedLevels,
	onLevelChosen,
	onDeleteLevel,
	onTogglePublishLevel,
	onRequestClose,
}: PublicLevelChooserModalProps & InternalLevelChooserModalProps) {
	const serializedExampleLevel = getExampleLevel();

	const exampleRoom = serializedExampleLevel
		? deserialize(serializedExampleLevel.data).rooms[0]
		: EMPTY_ROOM;

	const localStorageData = localStorage[LOCALSTORAGE_KEY];
	let convertedLocalStorage;
	try {
		convertedLocalStorage = localStorageData
			? convertLevelToLatestVersion(JSON.parse(localStorageData))
			: null;
	} catch (e) {
		convertedLocalStorage = null;
	}

	const localRoom = convertedLocalStorage
		? deserialize(convertedLocalStorage.data).rooms[0]
		: EMPTY_ROOM;

	return (
		<Modal
			className={styles.modal}
			title="Choose what to work on"
			isOpen={isOpen}
			onXClick={onRequestClose}
		>
			<div
				style={{ height: isLoggedIn ? '60vh' : 'auto' }}
				className="thinScrollbar overflow-y-auto pr-4 -mr-4"
			>
				<div
					className={clsx(
						'grid grid-cols-2 gap-x-3 items-center justify-items-center pb-2',
						{
							'grid-cols-2': !localStorageData,
							'grid-cols-3': !!localStorageData,
						}
					)}
				>
					<LevelButton caption="Start empty" onClick={onBlankLevelChosen}>
						<RoomThumbnail
							upperLeftTile={{
								x: 0,
								y: localRoom.roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
							}}
							widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
							heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
							scale={THUMBNAIL_SCALE}
							room={EMPTY_ROOM}
						/>
					</LevelButton>
					{localStorageData && (
						<LevelButton
							caption="Last session"
							onClick={onLocalStorageLevelChosen}
						>
							<RoomThumbnail
								upperLeftTile={{
									x: 0,
									y: localRoom.roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
								}}
								widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
								heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
								scale={THUMBNAIL_SCALE}
								room={localRoom}
							/>
						</LevelButton>
					)}
					<LevelButton caption="Example Level" onClick={onExampleLevelChosen}>
						{exampleRoom && (
							<RoomThumbnail
								upperLeftTile={{
									x: 0,
									y: exampleRoom.roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
								}}
								widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
								heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
								scale={THUMBNAIL_SCALE}
								room={exampleRoom}
							/>
						)}
					</LevelButton>
				</div>
				{isLoggedIn && (
					<div className="mt-4 bg-green-200 text-green-900 p-2 text-sm">
						Publishing a level lists it on the{' '}
						<a
							className="text-blue-500"
							target="_blank"
							rel="noreferrer"
							href="/levels"
						>
							levels page
						</a>
						. Anyone can load your published levels into the editor to try them,
						but they can not save them (not even a copy). Published levels need
						to abide by the{' '}
						<a
							className="text-blue-500"
							target="_blank"
							rel="noreferrer"
							href="/tos"
						>
							terms of service
						</a>
						.
					</div>
				)}
				{loadingLevelsState !== 'none' && (
					<>
						<hr className="mt-6 mb-8" />
						<SavedLevels
							loadingState={loadingLevelsState}
							levels={savedLevels}
							isAdmin={isAdmin}
							thumbnailScale={THUMBNAIL_SCALE}
							onLevelChosen={onLevelChosen}
							onDeleteLevel={onDeleteLevel}
							onTogglePublishLevel={onTogglePublishLevel}
						/>
					</>
				)}
			</div>
		</Modal>
	);
}

export { LevelChooserModal };
export type { PublicLevelChooserModalProps };
