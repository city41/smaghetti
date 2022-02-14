import React, { CSSProperties, Ref, RefObject, useState } from 'react';
import clsx from 'clsx';
import { entityMap } from '../../entities/entityMap';

import focusedStyles from '../../styles/focused.module.css';
import { TILE_SIZE } from '../../tiles/constants';
import { getEntityTileBounds } from '../editor/util';
import { IconAlert } from '../../icons';
import { getGenericProblem } from '../editor/Editor/EntityAndProblemList/genericProblems';

type EntityProps = {
	className?: string;
	entity: EditorEntity;
	room?: RoomData;
	rooms?: RoomData[];
	scale?: number;
	id?: number;
	style?: CSSProperties;
	settings?: EditorEntitySettings;
	focused?: boolean;
	soleFocused?: boolean;
	dragging?: boolean;
	onEntitySettingsChange: (settings: EditorEntitySettings) => void;
	ref?: RefObject<HTMLDivElement> | Ref<HTMLDivElement> | null;
};

function getTwoColumnWarning(
	entity: EditorEntity,
	room: RoomData
): string | void {
	if (entity.type === 'Player') {
		return;
	}

	const allSpriteEntities = room.actors.entities
		.concat(room.stage.entities)
		.filter((e) => !!entityMap[e.type].toSpriteBinary);

	const allInSameColumn = allSpriteEntities.filter((e) => e.x === entity.x);

	if (allInSameColumn.length > 2) {
		return 'Over the limit of two sprite entities per column';
	}
}

function Entity({
	className,
	style,
	entity,
	room,
	rooms,
	settings = {},
	focused,
	soleFocused,
	dragging,
	onEntitySettingsChange,
}: EntityProps) {
	const [showProblem, setShowProblem] = useState(false);
	const entityDef = entityMap[entity.type];

	const body =
		entityDef?.render({
			showDetails: !!soleFocused && !dragging && !showProblem,
			settings,
			onSettingsChange: onEntitySettingsChange,
			entity,
			room,
			allRooms: rooms,
		}) ?? null;

	const problem =
		room &&
		rooms &&
		(getGenericProblem(entity) ||
			entityDef.getProblem?.({ settings, entity, room, allRooms: rooms }) ||
			getTwoColumnWarning(entity, room));

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const focusedVars: any = {};

	if (focused) {
		const bounds = getEntityTileBounds(entity);
		focusedVars['--focused-width'] = `${
			(bounds.lowerRight.x - bounds.upperLeft.x + 1) * TILE_SIZE
		}px`;
		focusedVars['--focused-height'] = `${
			(bounds.lowerRight.y - bounds.upperLeft.y + 1) * TILE_SIZE
		}px`;
	}

	return (
		<div
			className={clsx(className, {
				[focusedStyles.focused]: focused,
			})}
			style={{ ...style, ...focusedVars }}
		>
			{body}
			{problem && (
				<button
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setShowProblem((w) => !w);
					}}
					className="w-1 h-1 bg-white text-red-700 bottom-0 left-0 absolute cursor-pointer z-10"
				>
					<IconAlert className="w-full h-full" />
				</button>
			)}
			{showProblem && problem && (
				<div
					className="absolute top-1 left-1 w-full z-10 p-0.5 bg-red-600 text-white flex flex-col break-words"
					style={{ fontSize: 2.5, maxWidth: TILE_SIZE * 4 }}
				>
					<div>{typeof problem === 'string' ? problem : problem.message}</div>
					{typeof problem !== 'string' && problem.tipId && (
						<>
							{' '}
							<a
								className="text-red-300 mt-0.5"
								target="_blank"
								rel="noreferrer noopener"
								href={`/tips#${problem.tipId}`}
							>
								more info
							</a>
						</>
					)}
					<a
						onMouseDown={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setShowProblem(false);
						}}
						style={{ fontSize: 3 }}
						className="text-blue-700 w-full text-center block mt-0.5"
					>
						ok
					</a>
				</div>
			)}
		</div>
	);
}

export { Entity };
