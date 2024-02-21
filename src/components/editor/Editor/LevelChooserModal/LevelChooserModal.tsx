import React, { ReactNode, useState } from 'react';
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
import { SaveFileList } from '../../../levels/Levels2Page/SaveFileList';
import { downloadSetOfLevelsAsSaveFile } from '../../../../levelData/downloadLevelAsSaveFile';
import { MAX_LEVELS_IN_SAVE } from '../../../levels/Levels2Page/Levels2Page';

type PublicLevelChooserModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

type InternalLevelChooserModalProps = {
	onLocalStorageLevelChosen: () => void;
	onExampleLevelChosen: () => void;
	onBlankLevelChosen: () => void;
	loadingLevelsState: 'loading' | 'error' | 'success';
	savedLevels: Array<Level>;
	onLevelChosen: (level: Level) => void;
	onDeleteLevel: (level: Level) => void;
};

const THUMBNAIL_SCALE = 0.5;

const EMPTY_ROOM = initialRoomState;

function getLocalStorageCaption(level: SerializedLevel): ReactNode {
	const subLabel = level.id ? level.name : 'never saved';
	return (
		<>
			<div>last session</div>
			<div
				className={clsx('text-xs', {
					italic: !level.id,
				})}
			>
				{subLabel}
			</div>
		</>
	);
}

function LevelButton({
	caption,
	onClick,
	children,
}: {
	caption: ReactNode;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			className="relative border-2 border-white group"
			onClick={onClick}
			style={{ maxWidth: 184 }}
		>
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
	loadingLevelsState,
	savedLevels,
	onLevelChosen,
	onDeleteLevel,
	onRequestClose,
}: PublicLevelChooserModalProps & InternalLevelChooserModalProps) {
	const [isBuildingSave, setIsBuildingSave] = useState(false);
	const [chosenLevels, setChosenLevels] = useState<Level[]>([]);

	const serializedExampleLevel = getExampleLevel();

	const exampleRoom = serializedExampleLevel
		? deserialize(serializedExampleLevel.data).rooms[0]
		: EMPTY_ROOM;

	const localStorageData = localStorage[LOCALSTORAGE_KEY];
	let convertedLocalStorage: SerializedLevel | null;
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

	function downloadSave(levels: Level[]) {
		downloadSetOfLevelsAsSaveFile(levels, 'smaghetti');
		setIsBuildingSave(false);
		setChosenLevels([]);
	}

	return (
		<Modal
			className={clsx(styles.modal, 'relative pb-12')}
			title="Choose what to work on"
			isOpen={isOpen}
			onXClick={onRequestClose}
			onRequestClose={onRequestClose}
		>
			<div
				style={{ height: '60vh' }}
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
					{localStorageData && convertedLocalStorage && (
						<LevelButton
							caption={getLocalStorageCaption(convertedLocalStorage)}
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
				<>
					<hr className="mt-6 mb-8" />
					<SavedLevels
						loadingState={loadingLevelsState}
						levels={savedLevels}
						thumbnailScale={THUMBNAIL_SCALE}
						onLevelChosen={(level) => {
							if (isBuildingSave) {
								setChosenLevels((curLevels) => {
									if (curLevels.includes(level)) {
										return curLevels.filter((cl) => cl !== level);
									} else if (curLevels.length < MAX_LEVELS_IN_SAVE) {
										return curLevels.concat(level);
									} else {
										return curLevels;
									}
								});
							} else {
								onLevelChosen(level);
							}
						}}
						onDeleteLevel={onDeleteLevel}
						isBuildingSave={isBuildingSave}
						chosenLevelsForSave={chosenLevels}
					/>
				</>
				{loadingLevelsState === 'success' && savedLevels.length > 0 && (
					<SaveFileList
						emptySaveFileState="success"
						className="absolute bottom-0 left-4 py-2"
						chosenLevelCount={chosenLevels.length}
						onStartClick={() => {
							setIsBuildingSave(true);
						}}
						onCancelClick={() => {
							setIsBuildingSave(false);
							setChosenLevels([]);
						}}
						onSaveClick={() => {
							downloadSave(chosenLevels);
						}}
						isBuilding={isBuildingSave}
					/>
				)}
			</div>
		</Modal>
	);
}

export { LevelChooserModal };
export type { PublicLevelChooserModalProps };
