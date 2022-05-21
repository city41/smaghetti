import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { ByteInputField } from './ByteInputField';
import { LevelAutoScrollEntry as LevelAutoScrollEntryType } from '../../../../levelData/parseAutoScrollEntriesFromLevelFile';

type LevelAutoScrollEntryProps = {
	className?: string;
	entry: LevelAutoScrollEntryType;
	onPatch: (arg: { offset: number; bytes: number[] }) => void;
};

const keyToOffset: Record<keyof LevelAutoScrollEntryType, number> = {
	toX: 0,
	toY: 1,
	speed: 2,
};

function LevelAutoScrollEntry({
	className,
	entry,
	onPatch,
}: LevelAutoScrollEntryProps) {
	const keys = ['toX', 'toY', 'speed'].map<ReactElement>((k) => {
		return (
			<div key={k} className="text-xs text-gray-400">
				{k}
			</div>
		);
	});

	const values = Object.keys(entry).map<ReactElement>((k) => {
		return (
			<ByteInputField
				key={k}
				value={[entry[k as keyof LevelAutoScrollEntryType]]}
				onChange={(newBytes) => {
					onPatch({
						offset: keyToOffset[k as keyof LevelAutoScrollEntryType],
						bytes: newBytes,
					});
				}}
			/>
		);
	});

	return (
		<div className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col')}>
			<div className="flex flex-row items-center space-x-2">
				<div className="bg-gray-200 text-gray-900 grid grid-cols-3 grid-rows-2 gap-x-4 p-1">
					{keys}
					{values}
				</div>
			</div>
		</div>
	);
}

export { LevelAutoScrollEntry };
