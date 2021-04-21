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
import { Player } from './Player';
import { LevelTreeRoom } from '../../types';
import { Button } from '../../../Button';
import { TILE_SIZE } from '../../../../tiles/constants';
import { LevelTransport } from './LevelTransport';
import { isRoomEmpty } from '../util';
import { ObjectIcon, SpriteIcon, TransportIcon } from '../entityIcons';

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
	excluded?: boolean;
	children: ReactNode;
};

function EntityContainer({
	style,
	focused,
	onFocus,
	excluded,
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
				'opacity-25': excluded,
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
	const [showSprites, setShowSprites] = useState(true);
	const [showObjects, setShowObjects] = useState(true);
	const [showTransports, setShowTransports] = useState(true);

	const currentRoom = rooms[currentRoomIndex];

	const playerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (playerRef.current) {
			setTimeout(() => {
				playerRef.current?.scrollIntoView({ block: 'center' });
			}, 10);
		}
	}, [currentRoom?.levelSettings?.settings]);

	const {
		objects: { objects },
		sprites: { sprites },
		transports: { transports },
	} = currentRoom;

	const roomButtons = [];

	for (let i = 0; i < rooms.length; ++i) {
		roomButtons.push(
			<Button
				key={i}
				onClick={() => setCurrentRoomIndex(i)}
				disabled={isRoomEmpty(rooms[i])}
				toggled={i === currentRoomIndex}
			>
				room{i}
			</Button>
		);
	}

	const body = currentRoom.exclude ? null : (
		<>
			{showObjects
				? objects.map((o, i) => {
						const left = o.x * TILE_SIZE * scale;
						const top = o.y * TILE_SIZE * scale;

						return (
							<EntityContainer
								key={`object-${i}`}
								style={{ position: 'absolute', left, top }}
								focused={focusedEntity === o}
								onFocus={() => onEntityFocus(o)}
								excluded={o.exclude}
							>
								<LevelObject
									object={o}
									scale={scale}
									objectSet={currentRoom.levelSettings.settings?.objectSet!}
								/>
							</EntityContainer>
						);
				  })
				: null}
			{showSprites
				? sprites.map((s, i) => {
						const left = s.x * TILE_SIZE * scale;
						const top = s.y * TILE_SIZE * scale;

						return (
							<EntityContainer
								key={`sprite-${i}`}
								style={{ position: 'absolute', left, top }}
								focused={focusedEntity === s}
								onFocus={() => onEntityFocus(s)}
								excluded={s.exclude}
							>
								<LevelSprite sprite={s} scale={scale} />
							</EntityContainer>
						);
				  })
				: null}
			{showTransports
				? transports.map((t, i) => {
						const left = t.sx * TILE_SIZE * scale;
						const top = t.sy * TILE_SIZE * scale;

						return (
							<EntityContainer
								key={`transport-${i}`}
								style={{ position: 'absolute', left, top }}
								focused={focusedEntity === t}
								onFocus={() => onEntityFocus(t)}
								excluded={t.exclude}
							>
								<LevelTransport transport={t} scale={scale} />
							</EntityContainer>
						);
				  })
				: null}
			{currentRoom.levelSettings.settings && (
				<Player
					ref={playerRef}
					x={currentRoom.levelSettings.settings.playerXStart}
					y={currentRoom.levelSettings.settings.playerYStart}
					scale={scale}
				/>
			)}
		</>
	);

	return (
		<div className="flex flex-col space-y-2 mt-2">
			<div className="flex flex-row space-x-2 items-center">
				{roomButtons}
				<SpriteIcon
					className={clsx({ 'opacity-25': !showSprites })}
					onClick={() => setShowSprites((s) => !s)}
				/>
				<ObjectIcon
					className={clsx({ 'opacity-25': !showObjects })}
					onClick={() => setShowObjects((s) => !s)}
				/>
				<TransportIcon
					className={clsx({ 'opacity-25': !showTransports })}
					onClick={() => setShowTransports((s) => !s)}
				/>
			</div>
			<div className="relative w-full h-64 overflow-auto bg-gray-500">
				{body}
			</div>
		</div>
	);
}

export { RenderLevel };
