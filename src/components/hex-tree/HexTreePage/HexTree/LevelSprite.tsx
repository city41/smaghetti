import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { LevelTreeSprite } from '../../types';
import { LevelSprite as RenderLevelSprite } from '../RenderLevel/LevelSprite';
import { ByteInputField } from './ByteInputField';

type LevelSpriteProps = {
	className?: string;
	levelSprite: LevelTreeSprite;
	onPatch: (arg: { offset: number; bytes: number[] }) => void;
};

const levelSpriteSlices = {
	bank: [0, 1],
	id: [1, 1],
	x: [2, 1],
	y: [3, 1],
	param1: [4, 1],
	param2: [5, 1],
};

function LevelSprite({ className, levelSprite, onPatch }: LevelSpriteProps) {
	const data = levelSprite.rawBytes;
	const bank = data[0];

	const keys = Object.keys(levelSpriteSlices).reduce<ReactElement[]>(
		(building, k, i) => {
			if (i >= data.length) {
				return building;
			}

			return building.concat(
				<div key={k} className="text-xs text-gray-400">
					{k}
				</div>
			);
		},
		[]
	);

	const values = Object.keys(levelSpriteSlices).reduce<ReactElement[]>(
		(building, k, i) => {
			if (i >= data.length) {
				return building;
			}

			const slice = levelSpriteSlices[k as keyof typeof levelSpriteSlices];
			const fieldData = data.slice(slice[0], slice[0] + slice[1]);

			return building.concat(
				<ByteInputField
					key={i}
					value={fieldData}
					onChange={(newBytes) => {
						onPatch({ offset: slice[0], bytes: newBytes });
					}}
				/>
			);
		},
		[]
	);

	return (
		<div
			className={clsx(className, 'ml-8 p-2 m-2 flex flex-col', {
				'bg-gray-600': bank === 0 || bank === 1,
				'bg-red-500': bank !== 0 && bank !== 1,
			})}
		>
			<div className="flex flex-row items-center space-x-2">
				<RenderLevelSprite sprite={levelSprite} scale={1} />
				<div
					className={clsx(
						'bg-gray-200 text-gray-900 grid grid-rows-2 gap-x-2 p-1',
						{
							'grid-cols-4': data.length === 4,
							'grid-cols-5': data.length === 5,
							'grid-cols-6': data.length === 6,
						}
					)}
				>
					{keys}
					{values}
				</div>
			</div>
		</div>
	);
}

export { LevelSprite };
