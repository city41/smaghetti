import React from 'react';
import clsx from 'clsx';
import { FaTrash, FaHammer } from 'react-icons/fa';
import { RoomState } from '../../editorSlice';
import { LevelThumbnail } from '../../../LevelThumbnail';

import { PlainIconButton } from '../../../PlainIconButton';
import { Button } from '../../../Button';

type PublicManageRoomsProps = {
	className?: string;
};

type InternalManageRoomsProps = {
	rooms: RoomState[];
	currentRoomIndex: number;
	onAddRoom: () => void;
	onDeleteRoom: (roomIndex: number) => void;
	onRoomIndexChange: (newIndex: number) => void;
	onClose: () => void;
	scale: number;
};

function ManageRooms({
	className,
	rooms,
	onAddRoom,
	onDeleteRoom,
	onRoomIndexChange,
	onClose,
	scale,
}: PublicManageRoomsProps & InternalManageRoomsProps) {
	return (
		<div
			className={clsx(
				className,
				'space-y-6 p-6 bg-gray-400 border-2 border-white shadow-xl'
			)}
		>
			<Button disabled={rooms.length === 4} onClick={onAddRoom}>
				Add Room
			</Button>
			{rooms.map((r, i) => {
				return (
					<div key={i}>
						<h2 className="bg-gray-700 text-white px-2 inline-flex flex-row items-center space-x-2">
							<div>room{i + 1}</div>
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
							<LevelThumbnail
								className="absolute top-0 left-0 border border-black bg-blue-200 UndergroundBackground-bg"
								entities={r.entities}
								tileData={r.tiles}
								scale={scale}
								tileHeight={r.roomTileHeight}
								tileWidth={r.roomTileWidth}
								tileX={0}
								tileY={0}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export { ManageRooms };
export type { PublicManageRoomsProps };
