import React, { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RiFocus3Line, RiAddFill } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { HiClipboardCopy } from 'react-icons/hi';
import { FaDiceFour } from 'react-icons/fa';

import { Add, Exclusion, LevelTreeRoom, Patch, RoomIndex } from '../../types';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';
import { LevelTransport } from './LevelTransport';
import useClipboard from 'react-use-clipboard';
import { LevelSettings } from './LevelSettings';

type RoomProps = {
	className?: string;
	roomIndex: RoomIndex;
	room: LevelTreeRoom;
	fourByteIds: number[];
	onExcludeChange: (exclusion: Exclusion) => void;
	onPatch: (patch: Patch) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
	onAdd: (add: Add) => void;
	onFourBytes: (id: number) => void;
};

type EntityContainerProps = {
	focused: boolean;
	excluded: boolean;
	rawBytes: number[];
	onFocus: () => void;
	onExcludeChange: () => void;
	onAdd: (bytes: number[]) => void;
	onFourBytes?: () => void;
	children: ReactNode;
};

function EntityContainer({
	focused,
	excluded,
	rawBytes,
	onFocus,
	onAdd,
	onExcludeChange,
	onFourBytes,
	children,
}: EntityContainerProps) {
	const [showAdd, setShowAdd] = useState(false);
	const [addBytesString, setAddBytesString] = useState('');
	const ref = useRef<HTMLDivElement | null>(null);
	const [, copyToClipboard] = useClipboard(
		`${rawBytes.map((c) => `0x${c.toString(16)}`).join(', ')}`
	);

	useEffect(() => {
		if (focused) {
			ref.current?.scrollIntoView({ block: 'center' });
		}
	}, [focused]);

	function handleAdd() {
		const separator = addBytesString.includes(',') ? ',' : ' ';
		const bytes = addBytesString
			.split(separator)
			.map((b) => parseInt(b.trim(), 16));
		onAdd(bytes);
		setAddBytesString('');
		setShowAdd(false);
	}

	return (
		<div
			ref={ref}
			className={clsx('flex flex-row space-x-2 items-center bg-gray-500', {
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
			<button onClick={copyToClipboard}>
				<HiClipboardCopy />
			</button>
			<button onClick={() => setShowAdd((sa) => !sa)}>
				<RiAddFill />
			</button>
			{onFourBytes && (
				<button onClick={onFourBytes}>
					<FaDiceFour />
				</button>
			)}
			{showAdd && (
				<div>
					<input
						className="text-black"
						type="text"
						value={addBytesString}
						onChange={(e) => setAddBytesString(e.target.value)}
					/>
					<button onClick={handleAdd}>add</button>
				</div>
			)}
		</div>
	);
}

function Room({
	className,
	roomIndex,
	room,
	focusedEntity,
	fourByteIds,
	onExcludeChange,
	onPatch,
	onAdd,
	onEntityFocus,
	onFourBytes,
}: RoomProps) {
	const objects = room.objects.objects.map((o, i) => {
		return (
			<EntityContainer
				key={`${i}-${o.id}-${o.x}-${o.y}`}
				focused={focusedEntity === o}
				excluded={!!o.exclude}
				rawBytes={o.rawBytes}
				onFocus={() => onEntityFocus(o)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'object', entity: o });
				}}
				onAdd={(bytes) => {
					onAdd({ roomIndex, type: 'object', afterIndex: i, bytes });
				}}
				onFourBytes={
					o.rawBytes.length === 5 || fourByteIds.includes(o.id)
						? () => onFourBytes(o.id)
						: undefined
				}
			>
				<LevelObject
					levelObject={o}
					madeFourBytes={fourByteIds.includes(o.id)}
					onPatch={({ offset, bytes }) => {
						onPatch({
							type: 'object',
							roomIndex,
							objectIndex: i,
							offset,
							bytes,
						});
					}}
				/>
			</EntityContainer>
		);
	});

	const sprites = room.sprites.sprites.map((s, i) => {
		return (
			<EntityContainer
				key={`${i}-${s.id}-${s.x}-${s.y}`}
				focused={focusedEntity === s}
				excluded={!!s.exclude}
				rawBytes={s.rawBytes}
				onFocus={() => onEntityFocus(s)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'sprite', entity: s });
				}}
				onAdd={(bytes) => {
					onAdd({ roomIndex, type: 'sprite', afterIndex: i, bytes });
				}}
			>
				<LevelSprite
					levelSprite={s}
					onPatch={({ offset, bytes }) => {
						onPatch({
							type: 'sprite',
							roomIndex,
							spriteIndex: i,
							offset,
							bytes,
						});
					}}
				/>
			</EntityContainer>
		);
	});

	const transports = room.transports.transports.map((t, i) => {
		return (
			<EntityContainer
				key={`${i}-${t.sx}-${t.sy}-${t.dx}-${t.dy}`}
				focused={focusedEntity === t}
				excluded={!!t.exclude}
				rawBytes={t.rawBytes}
				onFocus={() => onEntityFocus(t)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'transport', entity: t });
				}}
				onAdd={(bytes) => {
					onAdd({ roomIndex, type: 'transport', afterIndex: i, bytes });
				}}
			>
				<LevelTransport levelTransport={t} />
			</EntityContainer>
		);
	});

	const jumpLinks = ['objects', 'level-settings', 'transports', 'sprites'].map(
		(type) => {
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
		}
	);

	return (
		<div className={clsx(className, 'relative')}>
			<h2 className="bg-gray-300 text-gray-900 text-xl font-bold p-2 sticky z-10 top-0 flex flex-row items-center">
				Room {roomIndex}
				<div className="mx-2 space-x-2 text-sm font-normal text-gray-800">
					{jumpLinks}
				</div>
			</h2>
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">Objects</h3>
			<div id={`objects-room-${roomIndex}`} />
			{objects}
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">
				Level Settings
			</h3>
			<div id={`level-settings-room-${roomIndex}`} />
			<LevelSettings
				levelSettings={room.levelSettings}
				onPatch={({ offset, bytes }) => {
					onPatch({ type: 'level-settings', roomIndex, offset, bytes });
				}}
			/>
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">Transports</h3>
			<div id={`transports-room-${roomIndex}`} />
			{transports}
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">Sprites</h3>
			<div id={`sprites-room-${roomIndex}`} />
			{sprites}
		</div>
	);
}

export { Room };
