import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';
import { entityMap } from '../../../../entities/entityMap';
import { PlainIconButton } from '../../../PlainIconButton';
import { TILE_SIZE } from '../../../../tiles/constants';
import { EntityProblem } from '../../../../entities/types';
import { IconClose } from '../../../../icons';
import { getGenericProblem } from './genericProblems';
import {
	getPendingObjects,
	PendingObject,
} from '../../../../levelData/createLevelData';

type PublicEntityAndProblemListProps = {
	className?: string;
	style?: CSSProperties;
	onClose: () => void;
};

type InternalEntityAndProblemListProps = {
	rooms: RoomData[];
	onProblemClick: (arg: { room: number; id: number }) => void;
};

type EntityProblemEntry = EntityProblem & {
	entity: EditorEntity;
	room: number;
};

function EntityEntry({
	entity,
	x,
	y,
	w,
	h,
	onClick,
}: {
	entity: EditorEntity;
	x: number;
	y: number;
	w: number;
	h: number;
	onClick: () => void;
}) {
	const entityDef = entityMap[entity.type];

	return (
		<div
			className="cursor-pointer hover:bg-gray-600 grid grid-cols-3 items-center pb-1 pt-4 -mx-2 px-2 border-b border-gray-500 last:border-b-0 bg-gray-800"
			onClick={onClick}
		>
			<div>{entityDef.simpleRender(30)}</div>
			<div className="col-span-4 text-xs">
				{entityDef.paletteInfo.title}
				{entityDef.editorType === 'cell' ? `, ${w + 1}x${h + 1}` : ''}
			</div>
			<div
				style={{ fontSize: 10 }}
				className="col-span-5 text-right text-gray-400"
			>
				({x},{y})
			</div>
		</div>
	);
}

function Problem({
	problem,
	onClick,
}: {
	problem: EntityProblemEntry;
	onClick: () => void;
}) {
	const entityDef = entityMap[problem.entity.type];
	const divisor = entityDef.editorType === 'cell' ? 1 : TILE_SIZE;
	const x = problem.entity.x / divisor;
	const y = problem.entity.y / divisor;

	return (
		<div
			className="cursor-pointer hover:bg-gray-600 grid grid-cols-5 items-center pb-1 pt-4 -mx-2 px-2 border-b border-gray-500 last:border-b-0 bg-gray-800"
			onClick={onClick}
		>
			<div>{entityDef.simpleRender(30)}</div>
			<div className="col-span-4 text-xs">
				{problem.message}
				{problem.tipId && (
					<>
						{' '}
						<a
							className="text-blue-500 hover:underline"
							target="_blank"
							rel="noreferrer noopener"
							href={`/tips#${problem.tipId}`}
						>
							more info
						</a>
					</>
				)}
			</div>
			<div
				style={{ fontSize: 10 }}
				className="col-span-5 text-right text-gray-400"
			>
				r{problem.room + 1} ({x},{y})
			</div>
		</div>
	);
}

function EntityAndProblemList({
	className,
	style,
	rooms,
	onClose,
	onProblemClick,
}: InternalEntityAndProblemListProps & PublicEntityAndProblemListProps) {
	const [problems, pendingEntitiesPerRoom] = useMemo(() => {
		return rooms.reduce<[EntityProblemEntry[], PendingObject[][]]>(
			(building, room, roomIndex) => {
				const stageEntities = getPendingObjects(room.stage, room);
				const actorEntities = getPendingObjects(room.actors, room);
				const pendingEntities = stageEntities.concat(actorEntities);

				const problems = pendingEntities.reduce<EntityProblemEntry[]>(
					(b, pendingEntity) => {
						let problem =
							getGenericProblem(pendingEntity.entity) ??
							entityMap[pendingEntity.entity.type].getProblem?.({
								settings: pendingEntity.entity.settings,
								entity: pendingEntity.entity,
								room,
								allRooms: rooms,
							});

						if (typeof problem === 'string') {
							problem = {
								severity: 'warning',
								message: problem,
							};
						}

						if (problem) {
							return b.concat({
								...problem,
								entity: pendingEntity.entity,
								room: roomIndex,
							});
						} else {
							return b;
						}
					},
					[]
				);

				building[0] = building[0].concat(problems);
				building[1].push(pendingEntities);
				return building;
			},
			[[], []]
		);
	}, [rooms]);

	const warnings = problems.filter((p) => p.severity === 'warning');
	const errors = problems.filter((p) => p.severity === 'error');

	return (
		<div
			className={clsx(
				className,
				'bg-gray-700 px-2 overflow-x-hidden overflow-y-auto thinScrollbar'
			)}
			style={style}
		>
			<div className="relative w-full h-full">
				<PlainIconButton
					className="absolute top-1.5 -right-1"
					icon={IconClose}
					label="close"
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();
						onClose();
					}}
				/>
				{errors.length > 0 && (
					<>
						<h2 className="text-lg block border-b-2 border-t-2 border-red-500 py-1 px-2 -mx-2">
							Errors
						</h2>
						<div className="flex flex-col xgap-y-4">
							{errors.map((e) => (
								<Problem
									key={e.entity.id}
									problem={e}
									onClick={() => {
										onProblemClick({ room: e.room, id: e.entity.id });
									}}
								/>
							))}
						</div>
					</>
				)}
				{warnings.length > 0 && (
					<>
						<h2 className="text-lg block border-b-2 border-t-2 border-yellow-500 py-1 px-2 -mx-2">
							Warnings
						</h2>
						<div className="flex flex-col xgap-y-4">
							{warnings.map((w) => (
								<Problem
									key={w.entity.id}
									problem={w}
									onClick={() => {
										onProblemClick({ room: w.room, id: w.entity.id });
									}}
								/>
							))}
						</div>
					</>
				)}
				{pendingEntitiesPerRoom.map((pendingEntities, roomIndex) => {
					if (pendingEntities.length === 0) {
						return null;
					}

					return (
						<React.Fragment key={roomIndex}>
							<h2 className="text-lg block border-b-2 border-t-2 border-white py-1 px-2 -mx-2">
								Room {roomIndex + 1}
							</h2>
							{pendingEntities.map((pe) => {
								return (
									<EntityEntry
										key={pe.entity.id}
										{...pe}
										onClick={() => {
											onProblemClick({ room: roomIndex, id: pe.entity.id });
										}}
									/>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}

export { EntityAndProblemList };
export type { PublicEntityAndProblemListProps };
