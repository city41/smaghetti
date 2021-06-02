import React, { CSSProperties, Ref, RefObject, useState } from 'react';
import clsx from 'clsx';
import { AiFillWarning } from 'react-icons/ai';
import { entityMap } from '../../entities/entityMap';

import focusedStyles from '../../styles/focused.module.css';
import { TILE_SIZE } from '../../tiles/constants';

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
	const [showWarning, setShowWarning] = useState(false);
	const entityDef = entityMap[entity.type];

	const body = entityDef.render(
		!!soleFocused && !dragging,
		settings,
		onEntitySettingsChange,
		entity,
		room,
		rooms
	);

	const warning =
		room && rooms && entityDef.getWarning?.(settings, entity, room, rooms);

	return (
		<div
			className={clsx(className, {
				[focusedStyles.focused]: focused,
				relative: !!warning,
			})}
			style={style}
		>
			{body}
			{warning && (
				<button
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setShowWarning((w) => !w);
					}}
					className="w-1 h-1 bg-white text-red-700 bottom-0 left-0 absolute cursor-pointer"
				>
					<AiFillWarning className="w-full h-full" />
				</button>
			)}
			{showWarning && warning && (
				<div
					className="absolute top-1 left-1 w z-10 p-0.5 bg-red-500 text-white flex flex-col"
					style={{ fontSize: 2.5, width: TILE_SIZE }}
				>
					<div>{warning}</div>
					<a
						onClick={() => setShowWarning(false)}
						style={{ fontSize: 3 }}
						className="text-blue-700 cursor-pointer w-full text-center block mt-0.5"
					>
						ok
					</a>
				</div>
			)}
		</div>
	);
}

export { Entity };
