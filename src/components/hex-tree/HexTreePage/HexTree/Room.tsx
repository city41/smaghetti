import React from 'react';
import clsx from 'clsx';

import { Exclusion, LevelTreeRoom, RoomIndex } from '../../types';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';

type RoomProps = {
	className?: string;
	roomIndex: RoomIndex;
	room: LevelTreeRoom;
	onExcludeChange: (exclusion: Exclusion) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
};

function Room({
	className,
	roomIndex,
	room,
	focusedEntity,
	onExcludeChange,
	onEntityFocus,
}: RoomProps) {
	const objects = room.objects.objects.map((o, i) => {
		return (
			<LevelObject
				key={`${i}-${o.id}-${o.x}-${o.y}`}
				levelObject={o}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'object', entity: o });
				}}
				focused={focusedEntity === o}
				onFocus={() => onEntityFocus(o)}
			/>
		);
	});

	const sprites = room.sprites.sprites.map((s, i) => {
		return (
			<LevelSprite
				key={`${i}-${s.id}-${s.x}-${s.y}`}
				levelSprite={s}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'sprite', entity: s });
				}}
				focused={focusedEntity === s}
				onFocus={() => onEntityFocus(s)}
			/>
		);
	});

	return (
		<div className={clsx(className, 'relative')}>
			<h2 className="bg-gray-300 text-gray-900 text-xl font-bold p-2 sticky top-0">
				Room {roomIndex}
			</h2>
			<h3 className="sticky top-10 bg-gray-700">Objects</h3>
			{objects}
			<h3 className="sticky top-10 bg-gray-700">Sprites</h3>
			{sprites}
		</div>
	);
}

export { Room };
