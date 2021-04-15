import React, { Fragment } from 'react';
import { Exclusion, LevelTree, RoomIndex } from '../../types';
import { Room } from './Room';
import { Button } from '../../../Button';
import { isRoomEmpty } from '../util';

type HexTreeProps = {
	tree: LevelTree;
	onExcludeChange: (exclusion: Exclusion) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
};

function HexTree({
	tree,
	onExcludeChange,
	focusedEntity,
	onEntityFocus,
}: HexTreeProps) {
	const roomButtons = [];

	for (let i = 0; i < tree.rooms.length; ++i) {
		roomButtons.push(
			<Button
				key={i}
				disabled={isRoomEmpty(tree.rooms[i])}
				onClick={() => {
					const target = document.getElementById(`room-${i}`);
					if (target) {
						target.scrollIntoView();
					}
				}}
			>
				room{i}
			</Button>
		);
	}

	const rooms = tree.rooms.map((r, i) => {
		return (
			<Fragment key={i}>
				<div id={`room-${i}`} />
				<Room
					roomIndex={i as RoomIndex}
					room={r}
					focusedEntity={focusedEntity}
					onExcludeChange={onExcludeChange}
					onEntityFocus={onEntityFocus}
				/>
			</Fragment>
		);
	});

	return (
		<div>
			<div className="flex flex-row space-x-2 my-2">{roomButtons}</div>
			<div className="h-96 overflow-auto">{rooms}</div>
		</div>
	);
}

export { HexTree };
