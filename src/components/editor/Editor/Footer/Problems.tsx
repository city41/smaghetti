import React from 'react';
import clsx from 'clsx';
import { entityMap } from '../../../../entities/entityMap';
import { flattenCells } from '../../../../levelData/util';
import { IconAlert } from '../../../../icons';

type ProblemProps = {
	className?: string;
	rooms: RoomData[];
	onProblemClick: () => void;
};

function Problems({ className, rooms, onProblemClick }: ProblemProps) {
	const [warningCount, errorCount] = rooms.reduce<[number, number]>(
		(building, room) => {
			const roomEntities = room.actors.entities.concat(
				room.stage.entities,
				flattenCells(room.actors.matrix),
				flattenCells(room.stage.matrix)
			);

			const [roomWarningCount, roomErrorCount] = roomEntities.reduce<
				[number, number]
			>(
				(building, entity) => {
					const problem = entityMap[entity.type].getProblem?.({
						settings: entity.settings,
						entity,
						room,
						allRooms: rooms,
					});

					if (!problem) {
						return building;
					}

					if (typeof problem === 'string' || problem.severity === 'warning') {
						building[0] += 1;
						return building;
					}

					building[1] += 1;
					return building;
				},
				[0, 0]
			);

			building[0] += roomWarningCount;
			building[1] += roomErrorCount;
			return building;
		},
		[0, 0]
	);

	if (warningCount === 0 && errorCount === 0) {
		return (
			<div className={clsx(className, 'text-sm flex flex-row')}>no issues</div>
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
					onProblemClick();
				}}
			>
				{warningCount > 0 && (
					<>
						<IconAlert className="text-yellow-300" /> {warningCount} warning
						{warningCount === 1 ? '' : 's'}
					</>
				)}
				{errorCount > 0 && (
					<>
						<IconAlert className="text-red-500" /> {errorCount} error
						{errorCount === 1 ? '' : 's'}
					</>
				)}
			</a>
		);
	}
}

export { Problems };
