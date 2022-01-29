import React, { CSSProperties, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { entityMap } from '../../../../entities/entityMap';
import { flattenCells } from '../../../../levelData/util';
import { PlainIconButton } from '../../../PlainIconButton';
import { TILE_SIZE } from '../../../../tiles/constants';
import { EntityProblem } from '../../../../entities/types';
import { IconClose } from '../../../../icons';
import { getGenericProblem } from './genericProblems';

type PublicProblemListProps = {
	className?: string;
	style?: CSSProperties;
	onClose: () => void;
};

type InternalProblemListProps = {
	rooms: RoomData[];
	onProblemClick: (arg: { room: number; id: number }) => void;
};

type EntityProblemEntry = EntityProblem & {
	entity: EditorEntity;
	room: number;
};

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

function ProblemList({
	className,
	style,
	rooms,
	onClose,
	onProblemClick,
}: InternalProblemListProps & PublicProblemListProps) {
	const problems = useMemo(() => {
		return rooms.reduce<EntityProblemEntry[]>((building, room, roomIndex) => {
			const entities = room.stage.entities.concat(
				room.actors.entities,
				flattenCells(room.stage.matrix),
				flattenCells(room.actors.matrix)
			);

			const problems = entities.reduce<EntityProblemEntry[]>((b, entity) => {
				let problem =
					getGenericProblem(entity) ??
					entityMap[entity.type].getProblem?.({
						settings: entity.settings,
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
						entity,
						room: roomIndex,
					});
				} else {
					return b;
				}
			}, []);

			return building.concat(problems);
		}, []);
	}, [rooms]);

	useEffect(() => {
		if (problems.length === 0) {
			onClose();
		}
	}, [problems, onClose]);

	const warnings = problems.filter((p) => p.severity === 'warning');
	const errors = problems.filter((p) => p.severity === 'error');

	return (
		<div
			className={clsx(
				className,
				'bg-gray-700 p-2 overflow-x-hidden overflow-y-auto thinScrollbar'
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
						<h2 className="text-lg block border-b-2 border-t-2 border-red-500 py-1 px-2 -mx-2 -mt-2">
							Errors
						</h2>
						<div className="flex flex-col xgap-y-4">
							{errors.map((e, i) => (
								<Problem
									key={i}
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
						<h2
							className={clsx(
								'text-lg block border-b-2 border-t-2 border-yellow-500 py-1 px-2 -mx-2',
								{
									'-mt-2': errors.length === 0,
								}
							)}
						>
							Warnings
						</h2>
						<div className="flex flex-col xgap-y-4">
							{warnings.map((w, i) => (
								<Problem
									key={i}
									problem={w}
									onClick={() => {
										onProblemClick({ room: w.room, id: w.entity.id });
									}}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export { ProblemList };
export type { PublicProblemListProps };
