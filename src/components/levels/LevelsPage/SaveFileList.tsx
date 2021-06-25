import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { MdFileDownload } from 'react-icons/md';
import { Button } from '../../Button';

type SaveFileListProps = {
	className?: string;
	style?: CSSProperties;
	isBuilding: boolean;
	onStartClick: () => void;
	onSaveClick: () => void;
	onCancelClick: () => void;
	chosenLevelCount: number;
	totalLevelCount: number;
};

function pluralize(root: string, count: number): string {
	if (count === 1) {
		return root;
	}

	return root + 's';
}

function SaveFileList({
	className,
	style = {},
	isBuilding,
	onStartClick,
	onSaveClick,
	onCancelClick,
	chosenLevelCount,
	totalLevelCount,
}: SaveFileListProps) {
	return (
		<div
			className={clsx(
				className,
				'p-2 bg-gray-600 border border-white grid space-x-2 items-center text-sm'
			)}
			style={{ ...style, gridTemplateColumns: '8rem 1fr' }}
		>
			{isBuilding ? (
				<div className="grid grid-cols-2 gap-x-1 h-full">
					<Button
						className="h-full flex items-center justify-center"
						onClick={onSaveClick}
					>
						<MdFileDownload className="w-6 h-6" />
					</Button>
					<Button
						variant="destructive"
						className="h-full"
						onClick={onCancelClick}
					>
						cancel
					</Button>
				</div>
			) : (
				<Button className="w-full h-full" onClick={onStartClick}>
					Start a save file
				</Button>
			)}
			{!isBuilding && (
				<p>
					You can choose up to {Math.min(30, totalLevelCount)} levels to add to
					a save file for play on a Game Boy or emulator
				</p>
			)}
			{isBuilding && (
				<p>
					{chosenLevelCount} {pluralize('level', chosenLevelCount)} of up to{' '}
					{Math.min(30, totalLevelCount)} chosen
				</p>
			)}
		</div>
	);
}

export { SaveFileList };
