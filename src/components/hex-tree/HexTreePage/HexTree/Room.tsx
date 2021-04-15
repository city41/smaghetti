import React, { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Exclusion, LevelTreeRoom, RoomIndex } from '../../types';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';
import { RiFocus3Line } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { LevelTransport } from './LevelTransport';

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

type EntityContainerProps = {
	focused: boolean;
	excluded: boolean;
	onFocus: () => void;
	onExcludeChange: () => void;
	children: ReactNode;
};

function EntityContainer({
	focused,
	excluded,
	onFocus,
	onExcludeChange,
	children,
}: EntityContainerProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (focused) {
			ref.current?.scrollIntoView({ block: 'center' });
		}
	}, [focused]);

	return (
		<div
			ref={ref}
			className={clsx('flex flex-row space-x-2 items-center', {
				'bg-yellow-100 text-gray-900': focused,
			})}
		>
			<div>{children}</div>
			<button onClick={onExcludeChange}>
				{excluded ? <BiHide /> : <BiShow />}
			</button>
			<button onClick={onFocus}>
				<RiFocus3Line />
			</button>
		</div>
	);
}

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
			<EntityContainer
				key={`${i}-${o.id}-${o.x}-${o.y}`}
				focused={focusedEntity === o}
				excluded={!!o.exclude}
				onFocus={() => onEntityFocus(o)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'object', entity: o });
				}}
			>
				<LevelObject levelObject={o} />
			</EntityContainer>
		);
	});

	const sprites = room.sprites.sprites.map((s, i) => {
		return (
			<EntityContainer
				key={`${i}-${s.id}-${s.x}-${s.y}`}
				focused={focusedEntity === s}
				excluded={!!s.exclude}
				onFocus={() => onEntityFocus(s)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'sprite', entity: s });
				}}
			>
				<LevelSprite levelSprite={s} />
			</EntityContainer>
		);
	});

	const transports = room.transports.transports.map((t, i) => {
		return (
			<EntityContainer
				key={`${i}-${t.sx}-${t.sy}-${t.dx}-${t.dy}`}
				focused={focusedEntity === t}
				excluded={!!t.exclude}
				onFocus={() => onEntityFocus(t)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'transport', entity: t });
				}}
			>
				<LevelTransport levelTransport={t} />
			</EntityContainer>
		);
	});

	const jumpLinks = ['objects', 'transports', 'sprites'].map((type) => {
		return (
			<a
				className="cursor-pointer hover:underline"
				key={type}
				onClick={() => {
					const target = document.getElementById(`${type}-room-${roomIndex}`);
					if (target) {
						target.scrollIntoView({ block: 'center' });
					}
				}}
			>
				{type}
			</a>
		);
	});

	return (
		<div className={clsx(className, 'relative')}>
			<h2 className="bg-gray-300 text-gray-900 text-xl font-bold p-2 sticky top-0 flex flex-row items-center">
				Room {roomIndex}
				<div className="mx-2 space-x-2 text-sm font-normal text-gray-800">
					{jumpLinks}
				</div>
				<button onClick={() => onExcludeChange({ roomIndex, type: 'room' })}>
					{room.exclude ? <BiHide /> : <BiShow />}
				</button>
			</h2>
			<h3 className="sticky top-10 bg-gray-700">Objects</h3>
			<div id={`objects-room-${roomIndex}`} />
			{objects}
			<h3 className="sticky top-10 bg-gray-700">Transports</h3>
			<div id={`transports-room-${roomIndex}`} />
			{transports}
			<h3 className="sticky top-10 bg-gray-700">Sprites</h3>
			<div id={`sprites-room-${roomIndex}`} />
			{sprites}
		</div>
	);
}

export { Room };
