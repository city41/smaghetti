import React from 'react';
import { Exclusion, LevelTree, RoomIndex } from '../../types';
import { Room } from './Room';

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
	const rooms = tree.rooms.map((r, i) => {
		return (
			<Room
				key={i}
				roomIndex={i as RoomIndex}
				room={r}
				focusedEntity={focusedEntity}
				onExcludeChange={onExcludeChange}
				onEntityFocus={onEntityFocus}
			/>
		);
	});

	return <div>{rooms}</div>;
}

export { HexTree };
