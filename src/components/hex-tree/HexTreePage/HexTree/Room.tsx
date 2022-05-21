import React, { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RiFocus3Line, RiAddFill } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { HiClipboardCopy, HiStop, HiOutlineStop } from 'react-icons/hi';
import { FaDiceFive, FaDiceFour } from 'react-icons/fa';

import {
	Add,
	ByteSizes,
	ExcludeAfter,
	Exclusion,
	LevelTreeRoom,
	Patch,
	RoomIndex,
} from '../../types';
import { LevelObject } from './LevelObject';
import { LevelSprite } from './LevelSprite';
import { LevelTransport } from './LevelTransport';
import useClipboard from 'react-use-clipboard';
import { LevelSettings } from './LevelSettings';
import { ObjectHeader } from './ObjectHeader';
import { LevelAutoScrollEntry } from './LevelAutoScrollEntry';

type RoomProps = {
	className?: string;
	roomIndex: RoomIndex;
	room: LevelTreeRoom;
	onExcludeChange: (exclusion: Exclusion) => void;
	onExcludeAfter: (arg: ExcludeAfter) => void;
	onPatch: (patch: Patch) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
	onAdd: (add: Add) => void;
	onFourBytes: (arg: { type: 'object'; id: number }) => void;
	onFiveBytes: (arg: { type: 'object'; id: number }) => void;
	byteSizes: ByteSizes;
};

type EntityContainerProps = {
	isKnown: boolean;
	focused: boolean;
	excluded: boolean;
	excludedAfter: boolean;
	inExcludedAfterGroup: boolean;
	rawBytes: number[];
	onFocus: () => void;
	onExcludeChange: () => void;
	onExcludeAfter: () => void;
	onAdd: (bytes: number[]) => void;
	onFourBytes?: () => void;
	onFiveBytes?: () => void;
	children: ReactNode;
};

function EntityContainer({
	isKnown,
	focused,
	excluded,
	excludedAfter,
	inExcludedAfterGroup,
	rawBytes,
	onFocus,
	onAdd,
	onExcludeChange,
	onExcludeAfter,
	onFourBytes,
	onFiveBytes,
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
				'opacity-25': inExcludedAfterGroup,
			})}
		>
			<div>{children}</div>
			<button onClick={onExcludeChange}>
				{excluded ? <BiHide /> : <BiShow />}
			</button>
			<button onClick={onExcludeAfter}>
				{excludedAfter ? <HiStop /> : <HiOutlineStop />}
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
			{onFourBytes && !isKnown && (
				<button onClick={onFourBytes}>
					<FaDiceFour />
				</button>
			)}
			{onFiveBytes && !isKnown && (
				<button onClick={onFiveBytes}>
					<FaDiceFive />
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
	byteSizes,
	onExcludeChange,
	onExcludeAfter,
	onPatch,
	onAdd,
	onEntityFocus,
	onFourBytes,
	onFiveBytes,
}: RoomProps) {
	let objectExcludeAfter = false;
	let spriteExcludeAfter = false;

	const objects = room.objects.objects.map((o, i) => {
		const el = (
			<EntityContainer
				key={`${i}-${o.id}-${o.x}-${o.y}`}
				isKnown={o.isKnown}
				focused={focusedEntity === o}
				excluded={!!o.exclude}
				excludedAfter={!!o.excludedAfter}
				inExcludedAfterGroup={objectExcludeAfter}
				rawBytes={o.rawBytes}
				onFocus={() => onEntityFocus(o)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'object', entity: o });
				}}
				onExcludeAfter={() => {
					onExcludeAfter({ roomIndex, type: 'object', index: i });
				}}
				onAdd={(bytes) => {
					onAdd({ roomIndex, type: 'object', afterIndex: i, bytes });
				}}
				onFourBytes={
					o.bank > 0 &&
					(o.rawBytes.length === 5 || byteSizes.object.four.includes(o.id))
						? () => onFourBytes({ type: 'object', id: o.id })
						: undefined
				}
				onFiveBytes={
					o.bank > 0 &&
					(o.rawBytes.length === 4 || byteSizes.object.five.includes(o.id))
						? () => onFiveBytes({ type: 'object', id: o.id })
						: undefined
				}
			>
				<LevelObject
					levelObject={o}
					objectSet={room.levelSettings.settings?.objectSet ?? 0}
					madeFourBytes={byteSizes.object.four.includes(o.id)}
					madeFiveBytes={byteSizes.object.five.includes(o.id)}
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

		objectExcludeAfter = objectExcludeAfter || !!o.excludedAfter;
		return el;
	});

	const sprites = room.sprites.sprites.map((s, i) => {
		const el = (
			<EntityContainer
				key={`${i}-${s.id}-${s.x}-${s.y}`}
				isKnown={true}
				focused={focusedEntity === s}
				excluded={!!s.exclude}
				excludedAfter={!!s.excludedAfter}
				inExcludedAfterGroup={spriteExcludeAfter}
				rawBytes={s.rawBytes}
				onFocus={() => onEntityFocus(s)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'sprite', entity: s });
				}}
				onExcludeAfter={() => {
					onExcludeAfter({ roomIndex, type: 'sprite', index: i });
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

		spriteExcludeAfter = spriteExcludeAfter && !!s.excludedAfter;
		return el;
	});

	const transports = room.transports.transports.map((t, i) => {
		return (
			<EntityContainer
				key={`${i}-${t.sx}-${t.sy}-${t.dx}-${t.dy}`}
				isKnown={true}
				focused={focusedEntity === t}
				excluded={!!t.exclude}
				excludedAfter={false}
				inExcludedAfterGroup={false}
				rawBytes={t.rawBytes}
				onFocus={() => onEntityFocus(t)}
				onExcludeChange={() => {
					onExcludeChange({ roomIndex, type: 'transport', entity: t });
				}}
				onExcludeAfter={() => {}}
				onAdd={(bytes) => {
					onAdd({ roomIndex, type: 'transport', afterIndex: i, bytes });
				}}
			>
				<LevelTransport
					levelTransport={t}
					onPatch={({ offset, bytes }) => {
						onPatch({
							type: 'transport',
							roomIndex,
							transportIndex: i,
							offset,
							bytes,
						});
					}}
				/>
			</EntityContainer>
		);
	});

	const autoscrolls = room.autoScroll.entries.map((e, i) => {
		return (
			<LevelAutoScrollEntry
				entry={e}
				onPatch={({ offset, bytes }) => {
					onPatch({
						type: 'autoScroll',
						roomIndex,
						autoScrollEntryIndex: i,
						offset,
						bytes,
					});
				}}
			/>
		);
	});

	const jumpLinks = [
		'objects',
		'level-settings',
		'transports',
		'sprites',
		'autoscroll',
	].map((type) => {
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
		<div className={className}>
			<h2 className="bg-gray-300 text-gray-900 text-xl font-bold p-2 sticky z-10 top-0 flex flex-row items-center">
				Room {roomIndex}
				<div className="mx-2 space-x-2 text-sm font-normal text-gray-800">
					{jumpLinks}
				</div>
			</h2>
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">Objects</h3>
			<div id={`objects-room-${roomIndex}`} />
			<ObjectHeader
				header={room.objects.header}
				onPatch={({ offset, bytes }) => {
					onPatch({ type: 'object-header', roomIndex, offset, bytes });
				}}
			/>
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
			<h3 className="sticky z-10 top-10 bg-gray-700 py-1 pl-2">Autoscroll</h3>
			<div id={`autoscroll-room-${roomIndex}`} />
			{autoscrolls}
		</div>
	);
}

export { Room };
