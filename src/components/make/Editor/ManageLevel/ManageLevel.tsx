import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { FaTrash, FaHammer } from 'react-icons/fa';
import { RoomState } from '../../editorSlice';
import { RoomThumbnail } from '../../../RoomThumbnail';

import { PlainIconButton } from '../../../PlainIconButton';
import { Button } from '../../../Button';
import { TILE_SIZE } from '../../../../tiles/constants';
import { Modal } from '../../../Modal';
import { MUSIC_VALUES } from '../../../../levelData/constants';

type PublicManageLevelProps = {
	className?: string;
};

type InternalManageLevelProps = {
	levelName: string;
	levelSettings: LevelSettings;
	rooms: Array<RoomState & { type: string }>;
	currentRoomIndex: number;
	onAddRoom: () => void;
	onDeleteRoom: (roomIndex: number) => void;
	onRoomIndexChange: (newIndex: number) => void;
	onClose: () => void;
	roomTypes: string[];
	onRoomTypeChange: (index: number, type: string) => void;
	onTimerChange: (newTimer: number) => void;
	onLevelNameChange: (newName: string) => void;
	onRoomSettingsChange: (payload: {
		index: number;
		settings: Partial<RoomSettings>;
	}) => void;
};

const SCALE = 0.5;

function SettingsKey({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={clsx(className, 'font-bold text-gray-400')}>{children}</div>
	);
}

function ManageLevel({
	levelName,
	levelSettings,
	className,
	rooms,
	onAddRoom,
	onDeleteRoom,
	onRoomIndexChange,
	onClose,
	roomTypes,
	onRoomTypeChange,
	onLevelNameChange,
	onTimerChange,
	onRoomSettingsChange,
}: PublicManageLevelProps & InternalManageLevelProps) {
	const [showMusicWarning, setShowMusicWarning] = useState(false);

	return (
		<>
			<Modal
				title="Smaghetti has no sound!"
				isOpen={showMusicWarning}
				onRequestClose={() => setShowMusicWarning(false)}
				onOkClick={() => setShowMusicWarning(false)}
			>
				<div className="space-y-4">
					<p>
						When you test your level in Smaghetti, there is no sound yet. That
						will get fixed eventually.
					</p>
					<p>
						But if you download your level and try in an emulator or on a Game
						Boy, the music you chose will play
					</p>
				</div>
			</Modal>
			<div
				className={clsx(
					className,
					'space-y-6 p-6 bg-gray-400 border-2 border-white shadow-xl'
				)}
			>
				<div
					className="grid gap-x-4 gap-y-2 bg-gray-700 p-4"
					style={{ gridTemplateColumns: 'max-content 1fr' }}
				>
					<SettingsKey className="text-right">Level Name</SettingsKey>
					<div className="flex flex-row space-x-2 items-center">
						<input
							className="w-48"
							type="text"
							value={levelName}
							onChange={(e) => onLevelNameChange(e.target.value)}
						/>
						{levelName.length > 21 && (
							<div className="text-gray-400 text-xs p-0.5">
								only{' '}
								<span className="font-bold underline">
									{levelName.substr(0, 21)}
								</span>{' '}
								will show up in the game
							</div>
						)}
					</div>
					<SettingsKey className="text-right">Timer</SettingsKey>
					<input
						className="w-48"
						type="number"
						value={levelSettings.timer}
						min={0}
						max={999}
						onChange={(e) => onTimerChange(Number(e.target.value))}
					/>
				</div>
				<Button disabled={rooms.length === 4} onClick={onAddRoom}>
					Add Room
				</Button>
				{rooms.map((r, i) => {
					return (
						<div key={i}>
							<h2 className="bg-gray-600 text-white px-2 py-1 flex flex-row space-x-2">
								<div>Room {i + 1}</div>
								<div className="flex-1" />
								<PlainIconButton
									icon={FaHammer}
									size="small"
									label="edit room"
									onClick={() => {
										onRoomIndexChange(i);
										onClose();
									}}
								/>
								<PlainIconButton
									icon={FaTrash}
									size="small"
									label="delete room"
									disabled={rooms.length === 1}
									onClick={() => onDeleteRoom(i)}
								/>
							</h2>
							<div className="flex flex-col items-stretch h-full">
								<div className="flex flex-row items-center px-2 py-3 space-x-8 bg-gray-700">
									<div className="flex flex-row space-x-2">
										<SettingsKey>Background</SettingsKey>
										<select
											className="text-black"
											value={r.type}
											onChange={(e) => onRoomTypeChange(i, e.target.value)}
										>
											{roomTypes.map((rt) => (
												<option key={rt} value={rt}>
													{rt}
												</option>
											))}
										</select>
									</div>
									<div className="flex flex-row space-x-2">
										<SettingsKey>Music</SettingsKey>
										<select
											className="text-black"
											value={r.settings.music}
											onChange={(e) =>
												onRoomSettingsChange({
													index: i,
													settings: {
														music: Number(e.target.value),
													},
												})
											}
										>
											{Object.entries(MUSIC_VALUES).map((me) => (
												<option key={me[0]} value={me[1]}>
													{me[0]}
												</option>
											))}
										</select>
										<a
											className="relative inline-block text-blue-300 hover:cursor-pointer"
											onClick={() => setShowMusicWarning((smw) => !smw)}
										>
											hey!
										</a>
									</div>
								</div>
								<div
									className="relative"
									style={{
										width: r.roomTileWidth * TILE_SIZE * SCALE,
										height: r.roomTileHeight * TILE_SIZE * SCALE,
									}}
								>
									<RoomThumbnail
										className={clsx(
											'absolute top-0 left-0 border border-black bg-white'
										)}
										scale={SCALE}
										heightInTiles={r.roomTileHeight}
										widthInTiles={r.roomTileWidth}
										upperLeftTile={{ x: 0, y: 0 }}
										room={r}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export { ManageLevel };
export type { PublicManageLevelProps };
