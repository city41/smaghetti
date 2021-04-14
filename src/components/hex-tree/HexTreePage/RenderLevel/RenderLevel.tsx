import React, { useState } from 'react';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';
import { LevelTreeRoom } from '../../types';
import { Button } from '../../../Button';

type RenderLevelProps = {
	rooms: LevelTreeRoom[];
	scale?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
};

function RenderLevel({
	rooms,
	scale = 1,
	focusedEntity,
	onEntityFocus,
}: RenderLevelProps) {
	const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

	const currentRoom = rooms[currentRoomIndex];
	const {
		objects: { objects },
		sprites: { sprites },
	} = currentRoom;

	const roomButtons = [];

	for (let i = 0; i < rooms.length; ++i) {
		roomButtons.push(
			<Button onClick={() => setCurrentRoomIndex(i)}>{i}</Button>
		);
	}

	return (
		<div>
			<div className="flex flex-row space-x-2">{roomButtons}</div>
			<div className="relative w-full h-64 overflow-auto">
				{objects.map((o, i) => {
					if (o.exclude) {
						return null;
					}

					return (
						<LevelObject
							key={`object-${i}`}
							object={o}
							scale={scale}
							focused={focusedEntity === o}
							onClick={() => onEntityFocus(o)}
						/>
					);
				})}
				{sprites.map((s, i) => {
					if (s.exclude) {
						return null;
					}

					return (
						<LevelSprite
							key={`sprite-${i}`}
							sprite={s}
							scale={scale}
							focused={focusedEntity === s}
							onClick={() => onEntityFocus(s)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export { RenderLevel };
