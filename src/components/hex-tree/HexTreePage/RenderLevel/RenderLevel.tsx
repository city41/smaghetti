import React, {
	CSSProperties,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';
import { LevelTreeRoom } from '../../types';
import { Button } from '../../../Button';
import { TILE_SIZE } from '../../../../tiles/constants';
import { LevelTransport } from './LevelTransport';
import { isRoomEmpty } from '../util';

type RenderLevelProps = {
	rooms: LevelTreeRoom[];
	scale?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
};

type EntityContainerProps = {
	style: CSSProperties;
	focused: boolean;
	onFocus: () => void;
	children: ReactNode;
};

function EntityContainer({
	style,
	focused,
	onFocus,
	children,
}: EntityContainerProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused) {
			ref.current?.scrollIntoView({ block: 'center', inline: 'center' });
		}
	}, [focused]);

	return (
		<div
			ref={ref}
			className={clsx('cursor-pointer', {
				'border-2 border-white': focused,
			})}
			style={style}
			onClick={onFocus}
		>
			{children}
		</div>
	);
}

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
		transports: { transports },
	} = currentRoom;

	const roomButtons = [];

	for (let i = 0; i < rooms.length; ++i) {
		roomButtons.push(
			<Button
				onClick={() => setCurrentRoomIndex(i)}
				disabled={isRoomEmpty(rooms[i])}
			>
				room{i}
			</Button>
		);
	}

	const body = currentRoom.exclude ? null : (
		<>
			{objects.map((o, i) => {
				if (o.exclude) {
					return null;
				}

				const left = o.x * TILE_SIZE * scale;
				const top = o.y * TILE_SIZE * scale;

				return (
					<EntityContainer
						key={`object-${i}`}
						style={{ position: 'absolute', left, top }}
						focused={focusedEntity === o}
						onFocus={() => onEntityFocus(o)}
					>
						<LevelObject object={o} scale={scale} />
					</EntityContainer>
				);
			})}
			{sprites.map((s, i) => {
				if (s.exclude) {
					return null;
				}

				const left = s.x * TILE_SIZE * scale;
				const top = s.y * TILE_SIZE * scale;

				return (
					<EntityContainer
						key={`sprite-${i}`}
						style={{ position: 'absolute', left, top }}
						focused={focusedEntity === s}
						onFocus={() => onEntityFocus(s)}
					>
						<LevelSprite sprite={s} scale={scale} />
					</EntityContainer>
				);
			})}
			{transports.map((t, i) => {
				if (t.exclude) {
					return null;
				}

				const left = t.sx * TILE_SIZE * scale;
				const top = t.sy * TILE_SIZE * scale;

				return (
					<EntityContainer
						key={`transport-${i}`}
						style={{ position: 'absolute', left, top }}
						focused={focusedEntity === t}
						onFocus={() => onEntityFocus(t)}
					>
						<LevelTransport transport={t} scale={scale} />
					</EntityContainer>
				);
			})}
		</>
	);

	return (
		<div className="flex flex-col space-y-2 mt-2">
			<div className="flex flex-row space-x-2">{roomButtons}</div>
			<div className="relative w-full h-64 overflow-auto bg-gray-500">
				{body}
			</div>
		</div>
	);
}

export { RenderLevel };
