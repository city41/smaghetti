import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { FaTrash, FaHammer } from 'react-icons/fa';
import { RoomState } from '../../editorSlice';
import { RoomThumbnail } from '../../../RoomThumbnail';

import { PlainIconButton } from '../../../PlainIconButton';
import { Button } from '../../../Button';

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
	scale: number;
	roomTypes: string[];
	onRoomTypeChange: (index: number, type: string) => void;
	onTimerChange: (newTimer: number) => void;
	onLevelNameChange: (newName: string) => void;
};

function SettingsKey({ children }: { children: ReactNode }) {
	return <div className="font-bold text-gray-400 text-right">{children}</div>;
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
	scale,
	roomTypes,
	onRoomTypeChange,
	onLevelNameChange,
	onTimerChange,
}: PublicManageLevelProps & InternalManageLevelProps) {
	return (
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
				<SettingsKey>Level Name</SettingsKey>
				<input
					className="w-48"
					type="text"
					value={levelName}
					onChange={(e) => onLevelNameChange(e.target.value)}
				/>
				<SettingsKey>Timer</SettingsKey>
				<input
					className="w-48"
					type="number"
					value={levelSettings.timer}
					min={1}
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
						<h2 className="bg-gray-700 text-white px-2 py-1 flex flex-row items-center space-x-2">
							<div>room{i + 1}</div>
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
						<div className="relative">
							<RoomThumbnail
								className={clsx(
									'absolute top-0 left-0 border border-black bg-blue-200'
								)}
								scale={scale}
								heightInTiles={r.roomTileHeight}
								widthInTiles={r.roomTileWidth}
								upperLeftTile={{ x: 0, y: 0 }}
								room={r}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export { ManageLevel };
export type { PublicManageLevelProps };
