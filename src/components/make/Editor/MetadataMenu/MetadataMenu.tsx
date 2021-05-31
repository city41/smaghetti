import React from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { MdEdit } from 'react-icons/md';
import { PlainIconButton } from '../../../PlainIconButton';
import { Button } from '../../../Button';

type PublicMetadataMenuProps = {
	className?: string;
	disabled?: boolean;
};

type InternalMetadataMenuProps = {
	isManagingLevel: boolean;
	levelName: string;
	currentRoomIndex: number;
	roomCount: number;
	onRoomIndexChange: (newIndex: number) => void;
	onManageLevelClick: () => void;
};

function RoomButton({
	index,
	isCurrent,
	disabled,
	onClick,
}: {
	index: number;
	isCurrent: boolean;
	disabled: boolean;
	onClick: () => void;
}) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				'flex flex-col items-center w-6 h-6 rounded-md font-bold text-md',
				{
					'bg-blue-500': isCurrent,
					'text-gray-600 cursor-default': disabled,
				}
			)}
		>
			{index}
		</button>
	);
}

function MetadataMenu({
	isManagingLevel,
	className,
	disabled,
	levelName,
	currentRoomIndex,
	roomCount,
	onRoomIndexChange,
	onManageLevelClick,
}: PublicMetadataMenuProps & InternalMetadataMenuProps) {
	useHotkeys(
		'r',
		() => {
			if (!disabled && !isManagingLevel) {
				onRoomIndexChange((currentRoomIndex + 1) % roomCount);
			}
		},
		[currentRoomIndex, roomCount, disabled, isManagingLevel]
	);

	let body;
	if (isManagingLevel) {
		body = (
			<div className="grid place-items-center w-full">
				<Button onClick={onManageLevelClick}>return to editing</Button>
			</div>
		);
	} else {
		body = (
			<>
				<div className="flex flex-col space-y-2">
					<div className="w-40 truncate">{levelName}</div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="text-gray-500 text-xs">room</div>
						{[0, 1, 2, 3].map((ri) => {
							return (
								<RoomButton
									key={ri}
									index={ri + 1}
									isCurrent={ri === currentRoomIndex}
									disabled={!!disabled || ri >= roomCount}
									onClick={() => onRoomIndexChange(ri)}
								/>
							);
						})}
					</div>
				</div>
				<PlainIconButton
					icon={MdEdit}
					label="manage level"
					onClick={onManageLevelClick}
					disabled={disabled}
				/>
			</>
		);
	}

	return (
		<div
			className={clsx(
				className,
				'py-2 px-4 bg-gray-900 flex flex-row items-center justify-between pointer-events-auto'
			)}
		>
			{body}
		</div>
	);
}

export { MetadataMenu };
export type { PublicMetadataMenuProps, InternalMetadataMenuProps };
