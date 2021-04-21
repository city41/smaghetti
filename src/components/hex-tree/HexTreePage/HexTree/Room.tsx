import React, { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RiFocus3Line, RiAddFill } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { HiClipboardCopy } from 'react-icons/hi';
import { FaDiceFive, FaDiceFour, FaDiceSix } from 'react-icons/fa';

import {
	Add,
	ByteSizes,
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

type RoomProps = {
	className?: string;
	roomIndex: RoomIndex;
	room: LevelTreeRoom;
	onExcludeChange: (exclusion: Exclusion) => void;
	onPatch: (patch: Patch) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
	onAdd: (add: Add) => void;
	onFourBytes: (arg: { type: 'sprite' | 'object'; id: number }) => void;
	onFiveBytes: (arg: { type: 'sprite' | 'object'; id: number }) => void;
	onSixBytes: (arg: { type: 'sprite' | 'object'; id: number }) => void;
	byteSizes: ByteSizes;
};

type EntityContainerProps = {
	focused: boolean;
	excluded: boolean;
	rawBytes: number[];
	onFocus: () => void;
	onExcludeChange: () => void;
	onAdd: (bytes: number[]) => void;
	onFourBytes?: () => void;
	onFiveBytes?: () => void;
	onSixBytes?: () => void;
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
	onFiveBytes,
	onSixBytes,
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
			{onFiveBytes && (
				<button onClick={onFiveBytes}>
					<FaDiceFive />
				</button>
			)}
			{onSixBytes && (
				<button onClick={onSixBytes}>
					<FaDiceSix />
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
	onPatch,
	onAdd,
	onEntityFocus,
	onFourBytes,
	onFiveBytes,
	onSixBytes,
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
					objectSet={room.levelSettings.settings?.objectSet!}
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
				onFourBytes={
					s.rawBytes.length !== 4 || byteSizes.sprite.four.includes(s.id)
						? () => onFourBytes({ type: 'sprite', id: s.id })
						: undefined
				}
				onFiveBytes={
					s.rawBytes.length !== 5 || byteSizes.sprite.five.includes(s.id)
						? () => onFiveBytes({ type: 'sprite', id: s.id })
						: undefined
				}
				onSixBytes={
					s.rawBytes.length !== 6 || byteSizes.sprite.six.includes(s.id)
						? () => onSixBytes({ type: 'sprite', id: s.id })
						: undefined
				}
			>
				<LevelSprite
					levelSprite={s}
					madeFourBytes={byteSizes.sprite.four.includes(s.id)}
					madeFiveBytes={byteSizes.sprite.five.includes(s.id)}
					madeSixBytes={byteSizes.sprite.six.includes(s.id)}
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
		</div>
	);
}

export { Room };
