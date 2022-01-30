import React from 'react';
import clsx from 'clsx';
import { entityMap } from '../../../../entities/entityMap';
import { IconAlert } from '../../../../icons';
import { getGenericProblem } from '../EntityAndProblemList/genericProblems';
import { getPendingEntities } from '../EntityAndProblemList/getPendingEntities';

type EntityAndProblemCountProps = {
	className?: string;
	rooms: RoomData[];
	onProblemClick: () => void;
};

function EntityAndProblemCount({
	className,
	rooms,
	onProblemClick,
}: EntityAndProblemCountProps) {
	const [warningCount, errorCount, entityCount] = rooms.reduce<
		[number, number, number]
	>(
		(building, room) => {
			const stageEntities = getPendingEntities(room.stage, room);
			const actorEntities = getPendingEntities(room.actors, room);
			const pendingRoomEntities = stageEntities.concat(actorEntities);

			const [roomWarningCount, roomErrorCount] = pendingRoomEntities.reduce<
				[number, number]
			>(
				(building, pendingEntity) => {
					const problem =
						getGenericProblem(pendingEntity.entity) ||
						entityMap[pendingEntity.entity.type].getProblem?.({
							settings: pendingEntity.entity.settings,
							entity: pendingEntity.entity,
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
			building[2] += pendingRoomEntities.length;

			return building;
		},
		[0, 0, 0]
	);

	return (
		<div className={clsx(className, 'text-sm flex flex-row')}>
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
				<div>
					{entityCount} {entityCount === 1 ? 'entity' : 'entities'}
				</div>
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
		</div>
	);
}

export { EntityAndProblemCount };
