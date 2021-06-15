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
import { ROOM_WIDTH_INCREMENT } from '../../constants';

type Warning = {
	title: string;
	body: string[];
};

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
	onRoomSizeChange: (payload: {
		index: number;
		width?: number;
		height?: number;
	}) => void;
};

const SCALE = 0.5;

const MUSIC_WARNING: Warning = {
	title: 'Smaghetti has no sound!',
	body: [
		'When you test your level in Smaghetti, there is no sound yet. That will get fixed eventually.',
		'But if you download your level and try in an emulator or on a Game Boy, the music you chose will play',
	],
};

const WIDTH_WARNING: Warning = {
	title: 'Room Width',
	body: [
		'SMA4 does room width in chunks of 16 tiles, which is one tile wider than the screen.',
		'For example, if you set this to 2, your room will be 32 tiles wide.',
	],
};

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
	onRoomSizeChange,
}: PublicManageLevelProps & InternalManageLevelProps) {
	const [warning, setWarning] = useState<Warning | null>(null);

	return (
		<>
			{!!warning && (
				<Modal
					title={warning?.title}
					isOpen={!!warning}
					onRequestClose={() => setWarning(null)}
					onOkClick={() => setWarning(null)}
				>
					<div className="space-y-4">
						{warning?.body.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</Modal>
			)}
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
										<button
											className="inline-block text-blue-300 px-1 hover:bg-gray-600"
											onClick={() => setWarning(MUSIC_WARNING)}
										>
											hey!
										</button>
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
							<div className="flex flex-row items-center px-2 py-3 space-x-8 bg-gray-700">
								<div className="flex flex-row space-x-2">
									<SettingsKey>Width</SettingsKey>
									<input
										className="w-16"
										type="number"
										value={Math.ceil(r.roomTileWidth / 16)}
										min={1}
										max={16}
										onChange={(e) => {
											const value = Number(e.target.value);
											const newWidth = value * ROOM_WIDTH_INCREMENT;
											onRoomSizeChange({ index: i, width: newWidth });
										}}
									/>
									<button
										className="inline-block text-blue-300 px-1 hover:bg-gray-600"
										onClick={() => setWarning(WIDTH_WARNING)}
									>
										?
									</button>
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
