import React, { CSSProperties, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { entityMap } from '../../../../entities/entityMap';
import { PlainIconButton } from '../../../PlainIconButton';
import { TILE_SIZE } from '../../../../tiles/constants';
import { EntityProblem } from '../../../../entities/types';
import { IconClose, IconTrash } from '../../../../icons';
import { getGenericProblem } from './genericProblems';
import { PendingObject } from '../../../../levelData/createLevelData';
import { getPendingEntities } from './getPendingEntities';

import styles from './EntityAndProblemList.module.css';
import focusedStyles from '../../../../styles/focused.module.css';

type PublicEntityAndProblemListProps = {
	className?: string;
	style?: CSSProperties;
	onClose: () => void;
};

type InternalEntityAndProblemListProps = {
	rooms: RoomData[];
	focused: Record<number, boolean>;
	onProblemClick: (arg: { room: number; id: number }) => void;
	onEntityClick: (arg: { room: number; pendingObject: PendingObject }) => void;
	onDeleteClick: (pendingObject: PendingObject) => void;
};

type EntityProblemEntry = EntityProblem & {
	entity: EditorEntity;
	room: number;
};

const ROOT_ID = 'entity-and-problem-list-root';

type EntityEntryProps = {
	entity: EditorEntity;
	room: RoomData;
	allRooms: RoomData[];
	focused?: boolean;
	x: number;
	y: number;
	w: number;
	h: number;
	onClick: () => void;
	onDeleteClick: () => void;
};

function EntityEntry({
	entity,
	room,
	allRooms,
	focused,
	x,
	y,
	w,
	h,
	onClick,
	onDeleteClick,
}: EntityEntryProps) {
	const entityDef = entityMap[entity.type];

	return (
		<div
			className={clsx(
				styles.entityEntry,
				'group cursor-pointer hover:bg-gray-600 grid gap-x-2 items-center py-2 -mx-2 px-2 border-b border-gray-500 last:border-b-0 bg-gray-800',
				{
					[focusedStyles.focused]: focused,
				}
			)}
			style={
				{
					gridTemplateColumns: 'min-content 1fr min-content',
					'--focused-width': '100%',
					'--focused-height': '100%',
					'--focused-opacity': '0.3',
				} as CSSProperties
			}
			onClick={onClick}
			data-entity-id={entity.id}
		>
			<div>
				{entityDef.editorType === 'cell' ||
				entityDef.editorType === 'double-cell'
					? entityDef.render({
							showDetails: false,
							onSettingsChange: () => {},
							settings: entity.settings ?? {},
							entity,
							room,
							allRooms,
					  })
					: entityDef.simpleRender(16)}
			</div>
			<div className="text-xs truncate">
				{entityDef.paletteInfo.title}
				{entityDef.editorType === 'cell' ||
				entityDef.editorType === 'double-cell'
					? `, ${w + 1}x${h + 1}`
					: ''}
			</div>
			<div className="text-gray-400 flex flex-row gap-x-2 items-center">
				<div style={{ fontSize: 10 }}>
					({x},{y})
				</div>
				<IconTrash
					className="hidden group-hover:block text-white hover:text-red-500"
					onClick={onDeleteClick}
				/>
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

type HeaderProps = Omit<JSX.IntrinsicElements['h2'], 'ref'> & {
	className?: string;
};

function Header(props: HeaderProps) {
	const { className, ...rest } = props;

	return (
		<h2
			className={clsx(
				className,
				'text-lg border-b-2 border-t-2 py-1 px-2 -mx-2 sticky top-0 bg-gray-600 z-10'
			)}
			{...rest}
		/>
	);
}

type RoomNavigationProps = {
	count: number;
	index: number;
};

function getRoomScrollToTargetId(roomIndex: number): string {
	return `entity-and-problem-list-room-scroll-to-target-${roomIndex}`;
}

function RoomNavigation({ count, index }: RoomNavigationProps) {
	if (count === 1) {
		return null;
	}

	const [prev, next] = ['previous', 'next'].map((action) => {
		return (
			<a
				key={action}
				className="text-white text-xs cursor-pointer hover:underline"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					const delta = action === 'next' ? 1 : -1;

					const roomScrollToTarget = document.querySelector(
						`#${getRoomScrollToTargetId(index + delta)}`
					);

					if (roomScrollToTarget) {
						roomScrollToTarget.scrollIntoView({ behavior: 'auto' });

						const root = document.querySelector(`#${ROOT_ID}`);

						if (root) {
							setTimeout(() => {
								root.scrollBy({ top: -48 });
							}, 10);
						}
					}
				}}
			>
				{action}
			</a>
		);
	});

	let body;

	if (index === 0) {
		body = <>{next}</>;
	} else if (index === count - 1) {
		body = <>{prev}</>;
	} else {
		body = (
			<>
				{prev}
				{next}
			</>
		);
	}

	return <div className="flex flex-row gap-x-2 items-center">{body}</div>;
}

function EntityAndProblemList({
	className,
	style,
	rooms,
	focused,
	onClose,
	onProblemClick,
	onEntityClick,
	onDeleteClick,
}: InternalEntityAndProblemListProps & PublicEntityAndProblemListProps) {
	const [problems, pendingEntitiesPerRoom] = useMemo(() => {
		return rooms.reduce<[EntityProblemEntry[], PendingObject[][]]>(
			(building, room, roomIndex) => {
				const stageEntities = getPendingEntities(room.stage, room);
				const actorEntities = getPendingEntities(room.actors, room);
				const pendingEntities = stageEntities.concat(actorEntities);

				const problems = pendingEntities.reduce<EntityProblemEntry[]>(
					(b, pendingEntity) => {
						const entityDef = entityMap[pendingEntity.entity.type];

						let entity;

						// HACK: ugh, since running double-cells through the pending object
						// pipeline maps them into tile coordinates, need to unmap them
						// back to pixel coordinates for their problems to be triggered
						// properly
						// TODO: for the love of god, get rid of pixel coordinates
						if (entityDef.editorType === 'double-cell') {
							entity = {
								...pendingEntity.entity,
								x: pendingEntity.x * TILE_SIZE,
								y: pendingEntity.entity.y * TILE_SIZE,
							};
						} else {
							entity = pendingEntity.entity;
						}

						let problem =
							getGenericProblem(pendingEntity.entity) ??
							entityMap[pendingEntity.entity.type].getProblem?.({
								settings: pendingEntity.entity.settings,
								entity,
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

	const rowCount =
		warnings.length + errors.length + pendingEntitiesPerRoom.flat(1).length;

	useEffect(() => {
		if (rowCount === 0) {
			onClose();
		}
	}, [rowCount, onClose]);

	const focusedIds = useMemo(() => {
		return Object.entries(focused)
			.filter((e) => e[1])
			.map((e) => Number(e[0]));
	}, [focused]);

	useEffect(() => {
		if (focusedIds.length === 1) {
			const [id] = focusedIds;

			const entry = document.querySelector(`[data-entity-id="${id}"]`);

			if (entry) {
				entry.scrollIntoView({ behavior: 'auto' });

				const root = document.querySelector(`#${ROOT_ID}`);

				if (root) {
					setTimeout(() => {
						root.scrollBy({ top: -48 });
					}, 10);
				}
			}
		}
	}, [focusedIds.length === 1 ? focusedIds[0] : null]);

	return (
		<div
			className={clsx(
				className,
				'relative bg-gray-700 px-2 overflow-x-hidden overflow-y-auto thinScrollbar'
			)}
			style={style}
			id={ROOT_ID}
		>
			<PlainIconButton
				className="absolute top-2 -right-0.5"
				style={{ zIndex: 20 }}
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
					<Header className="border-red-500">Errors</Header>
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
					<Header className="border-yellow-500">Warnings</Header>
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
						<Header className="border-white flex flex-row items-baseline gap-x-4">
							<div>Room {roomIndex + 1}</div>
							<RoomNavigation count={rooms.length} index={roomIndex} />
						</Header>
						<div id={getRoomScrollToTargetId(roomIndex)} />
						{pendingEntities.map((pe) => {
							return (
								<EntityEntry
									key={pe.entity.id}
									{...pe}
									room={rooms[roomIndex]}
									allRooms={rooms}
									focused={
										focusedIds.length === 1 && focusedIds[0] === pe.entity.id
									}
									onClick={() => {
										onEntityClick({ room: roomIndex, pendingObject: pe });
									}}
									onDeleteClick={() => {
										onDeleteClick(pe);
									}}
								/>
							);
						})}
					</React.Fragment>
				);
			})}
		</div>
	);
}

export { EntityAndProblemList };
export type { PublicEntityAndProblemListProps };
