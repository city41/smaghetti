import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { MdEdit } from 'react-icons/md';

type PublicMetadataMenuProps = {
	className?: string;
};

type InternalMetadataMenuProps = {
	levelName: string;
	onSetLevelName: (newName: string) => void;
};

function MetadataMenu({
	className,
	levelName,
	onSetLevelName,
}: PublicMetadataMenuProps & InternalMetadataMenuProps) {
	const [editing, setEditing] = useState(false);
	const [editedName, setEditedName] = useState(levelName);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [editing]);

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
						<button
							className="ml-2 hover:bg-gray-600"
							onClick={() => setEditing(true)}
						>
							<MdEdit className="text-xl" />
						</button>
					)}
				</div>
				<div>{body}</div>
			</label>
			<div className="pl-4 w-24 text-xs -mt-2">
				press <span className="font-bold text-sm">?</span> for keyboard
				shortcuts
			</div>
		</div>
	);
}

export { MetadataMenu };
export type { PublicMetadataMenuProps, InternalMetadataMenuProps };
