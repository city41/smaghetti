import React from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { PlainIconButton } from '../../../PlainIconButton';
import { Button } from '../../../Button';
import { IconCopy, IconPencil } from '../../../../icons';

type PublicMetadataMenuProps = {
	className?: string;
	disabled?: boolean;
	disableSaving?: boolean;
};

type InternalMetadataMenuProps = {
	isManagingLevel: boolean;
	levelName: string;
	currentRoomIndex: number;
	roomCount: number;
	onRoomIndexChange: (newIndex: number) => void;
	onManageLevelClick: () => void;
	onSaveLevelCopy?: () => void;
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
	disableSaving,
	levelName,
	currentRoomIndex,
	roomCount,
	onRoomIndexChange,
	onManageLevelClick,
	onSaveLevelCopy,
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

	return (
		<div
			className={clsx(
				className,
				'relative py-2 px-4 bg-gray-900 flex flex-row items-center justify-between pointer-events-auto'
			)}
		>
			<div
				className={clsx('absolute grid place-items-center h-full w-full', {
					invisible: !isManagingLevel,
				})}
			>
				<Button onClick={onManageLevelClick}>return to editing</Button>
			</div>
			<div
				className={clsx('flex flex-col space-y-2', {
					invisible: isManagingLevel,
				})}
			>
				<div className="w-44 truncate flex flex-row items-center gap-x-1">
					{onSaveLevelCopy && !disableSaving && (
						<PlainIconButton
							size="small"
							icon={IconCopy}
							label="save a copy"
							onClick={onSaveLevelCopy}
						/>
					)}
					{levelName}
				</div>
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
				className={clsx({ invisible: isManagingLevel })}
				icon={IconPencil}
				label="manage level"
				onClick={onManageLevelClick}
				disabled={disabled}
			/>
		</div>
	);
}

export { MetadataMenu };
export type { PublicMetadataMenuProps, InternalMetadataMenuProps };
