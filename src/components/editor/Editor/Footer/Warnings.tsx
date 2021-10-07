import React from 'react';
import clsx from 'clsx';
import { AiFillWarning } from 'react-icons/ai';
import { entityMap } from '../../../../entities/entityMap';
import { flattenCells } from '../../../../levelData/util';

type WarningProps = {
	className?: string;
	rooms: RoomData[];
	onWarningClick: () => void;
};

function Warnings({ className, rooms, onWarningClick }: WarningProps) {
	const warningCount = rooms.reduce<number>((building, room) => {
		const roomEntities = room.actors.entities.concat(
			room.stage.entities,
			flattenCells(room.actors.matrix),
			flattenCells(room.stage.matrix)
		);

		const roomWarningCount = roomEntities.reduce<number>((building, entity) => {
			if (
				entityMap[entity.type].getWarning?.({
					settings: entity.settings,
					entity,
					room,
					allRooms: rooms,
				})
			) {
				return building + 1;
			} else {
				return building;
			}
		}, 0);

		return building + roomWarningCount;
	}, 0);

	if (warningCount === 0) {
		return (
			<div className={clsx(className, 'text-sm flex flex-row')}>
				no warnings
			</div>
		);
	} else {
		return (
			<a
				className={clsx(
					className,
					'text-sm text-blue-400 hover:underline cursor-pointer flex flex-row items-center gap-x-1'
				)}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onWarningClick();
				}}
			>
				<AiFillWarning className="text-yellow-300" /> {warningCount} warning
				{warningCount === 1 ? '' : 's'}
			</a>
		);
	}
}

export { Warnings };
