import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { MdEdit } from 'react-icons/md';
import { PlainIconButton } from '../../../PlainIconButton';

type PublicMetadataMenuProps = {
	className?: string;
};

type InternalMetadataMenuProps = {
	levelName: string;
	onSetLevelName: (newName: string) => void;
	currentRoomIndex: number;
	roomCount: number;
	onRoomIndexChange: (newIndex: number) => void;
	onManageRoomsClick: () => void;
};

function MetadataMenu({
	className,
	levelName,
	onSetLevelName,
	currentRoomIndex,
	roomCount,
	onRoomIndexChange,
	onManageRoomsClick,
}: PublicMetadataMenuProps & InternalMetadataMenuProps) {
	const [editing, setEditing] = useState(false);
	const [editedName, setEditedName] = useState(levelName);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const i = inputRef.current;
		if (editing && i) {
			i.focus();
			i.select();
		}
	}, [editing]);

	useHotkeys(
		'r',
		() => {
			onRoomIndexChange((currentRoomIndex + 1) % roomCount);
		},
		[currentRoomIndex, roomCount]
	);

	let body;
	if (editing) {
		body = (
			<>
				<input
					ref={inputRef}
					className="w-32 text-black"
					type="text"
					value={editedName}
					onChange={(e) => setEditedName(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							// @ts-ignore
							onSetLevelName(e.target.value);
							setEditing(false);
						} else if (e.key === 'Escape') {
							setEditing(false);
							setEditedName(levelName);
						}
					}}
				/>
			</>
		);
	} else {
		body = <>{levelName} </>;
	}

	const roomOptions = [];
	for (let i = 0; i < roomCount; ++i) {
		roomOptions.push(
			<option key={i} value={i}>
				room {i + 1}
			</option>
		);
	}

	return (
		<div
			className={clsx(
				className,
				'p-4 bg-gray-700 border-white flex flex-row space-x-4 items-center justify-center rounded-tr-xl border-r-4 border-t-4 pointer-events-auto'
			)}
		>
			<label className="flex flex-col">
				<div className="flex flex-row items-center">
					<div className="text-xs text-gray-400">Level Name</div>
					{!editing && (
						<PlainIconButton
							icon={MdEdit}
							label="edit level name"
							onClick={() => setEditing(true)}
						/>
					)}
				</div>
				<div>{body}</div>
			</label>
			<div className="flex flex-row space-x-2 items-center px-4">
				<select
					className="text-black p-1"
					value={currentRoomIndex}
					onChange={(e) => {
						onRoomIndexChange(Number(e.target.value));
						// allow the user to jump right back into keyboard shortcuts,
						// especially spacebar for panning. otherwise spacebar opens the select
						e.target.blur();
					}}
				>
					{roomOptions}
				</select>
				<PlainIconButton
					icon={MdEdit}
					label="manage rooms"
					onClick={onManageRoomsClick}
				/>
			</div>
			<div className="pl-4 w-24 text-xs -mt-2">
				press <span className="font-bold text-sm">?</span> for keyboard
				shortcuts
			</div>
		</div>
	);
}

export { MetadataMenu };
export type { PublicMetadataMenuProps, InternalMetadataMenuProps };
