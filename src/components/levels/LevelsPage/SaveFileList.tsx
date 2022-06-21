import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { Button } from '../../Button';
import { LoadingBar } from '../../LoadingBar';
import { MAX_LEVELS_IN_SAVE } from './LevelsPage';
import { IconDownload } from '../../../icons';

type SaveFileListProps = {
	className?: string;
	style?: CSSProperties;
	emptySaveFileState: 'loading' | 'error' | 'success';
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
	emptySaveFileState,
	isBuilding,
	onStartClick,
	onSaveClick,
	onCancelClick,
	chosenLevelCount,
	totalLevelCount,
}: SaveFileListProps) {
	let body;

	if (emptySaveFileState === 'loading') {
		body = <LoadingBar className="col-span-2" percent={-1} />;
	} else if (emptySaveFileState === 'error') {
		body = (
			<div className="bg-red-200 text-red-900 col-span-2 p-1">
				Doh, failed to load a needed file. Maybe try refreshing the page?
			</div>
		);
	} else if (isBuilding) {
		body = (
			<>
				<div className="grid grid-cols-2 gap-x-1 h-full">
					<Button
						disabled={chosenLevelCount === 0}
						className="h-full flex items-center justify-center"
						onClick={onSaveClick}
					>
						<IconDownload className="w-6 h-6" />
					</Button>
					<Button
						variant="destructive"
						className="h-full"
						onClick={onCancelClick}
					>
						cancel
					</Button>
				</div>
				<p>
					{chosenLevelCount} {pluralize('level', chosenLevelCount)} of up to{' '}
					{Math.min(MAX_LEVELS_IN_SAVE, totalLevelCount)} chosen
				</p>
			</>
		);
	} else {
		body = (
			<>
				<Button className="w-full h-full" onClick={onStartClick}>
					Start a save file
				</Button>
				<p>
					You can choose up to {Math.min(MAX_LEVELS_IN_SAVE, totalLevelCount)}{' '}
					levels to add to a save file for play on a Game Boy or emulator
				</p>
			</>
		);
	}

	return (
		<div
			className={clsx(
				className,
				'p-2 bg-gray-600 border border-white grid space-x-2 items-center text-sm'
			)}
			style={{ ...style, gridTemplateColumns: '8rem 1fr' }}
		>
			{body}
		</div>
	);
}

export { SaveFileList };
