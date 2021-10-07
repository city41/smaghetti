import React, { CSSProperties, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { RiCloseFill } from 'react-icons/ri';
import { entityMap } from '../../../../entities/entityMap';
import { flattenCells } from '../../../../levelData/util';
import { PlainIconButton } from '../../../PlainIconButton';
import { TILE_SIZE } from '../../../../tiles/constants';

type PublicWarningListProps = {
	className?: string;
	style?: CSSProperties;
	onClose: () => void;
};

type InternalWarningListProps = {
	rooms: RoomData[];
	onWarningClick: (arg: { room: number; id: number }) => void;
};

type EntityWarning = {
	message: string;
	entity: EditorEntity;
	room: number;
};

function Warning({
	warning,
	onClick,
}: {
	warning: EntityWarning;
	onClick: () => void;
}) {
	const entityDef = entityMap[warning.entity.type];
	const divisor = entityDef.editorType === 'cell' ? 1 : TILE_SIZE;
	const x = warning.entity.x / divisor;
	const y = warning.entity.y / divisor;

	return (
		<div
			className="cursor-pointer hover:bg-gray-500 grid grid-cols-5 items-center pb-1 pt-4 -mx-2 px-2 border-b border-gray-500 last:border-b-0"
			onClick={onClick}
		>
			<div>{entityDef.simpleRender(30)}</div>
			<div className="col-span-4 text-xs">{warning.message}</div>
			<div
				style={{ fontSize: 10 }}
				className="col-span-5 text-right text-gray-400"
			>
				r{warning.room + 1} ({x},{y})
			</div>
		</div>
	);
}

function WarningList({
	className,
	style,
	rooms,
	onClose,
	onWarningClick,
}: InternalWarningListProps & PublicWarningListProps) {
	const warnings = useMemo(() => {
		return rooms.reduce<EntityWarning[]>((building, room, roomIndex) => {
			const entities = room.stage.entities.concat(
				room.actors.entities,
				flattenCells(room.stage.matrix),
				flattenCells(room.actors.matrix)
			);

			const warnings = entities.reduce<EntityWarning[]>((b, entity) => {
				const warning = entityMap[entity.type].getWarning?.({
					settings: entity.settings,
					entity,
					room,
					allRooms: rooms,
				});

				if (warning) {
					return b.concat({
						message: warning,
						entity,
						room: roomIndex,
					});
				} else {
					return b;
				}
			}, []);

			return building.concat(warnings);
		}, []);
	}, [rooms]);

	useEffect(() => {
		if (warnings.length === 0) {
			onClose();
		}
	}, [warnings, onClose]);

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
					icon={RiCloseFill}
					label="close"
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();
						onClose();
					}}
				/>
				<h2 className="text-lg block border-b-2 border-gray-500 py-1 px-2 -mx-2 -mt-2">
					Warnings
				</h2>
				<div className="flex flex-col xgap-y-4">
					{warnings.map((w, i) => (
						<Warning
							key={i}
							warning={w}
							onClick={() => {
								onWarningClick({ room: w.room, id: w.entity.id });
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export { WarningList };
export type { PublicWarningListProps };
