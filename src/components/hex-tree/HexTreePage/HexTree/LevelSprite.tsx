import React from 'react';
import clsx from 'clsx';
import { LevelTreeSprite } from '../../types';
import {
	bank0SpriteIdToEntityType,
	bank1SpriteIdToEntityType,
} from '../../../../entities/spriteIdMap';
import { SpriteIcon } from '../entityIcons';
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
};

function LevelSprite({ className, levelSprite, onPatch }: LevelSpriteProps) {
	const data = levelSprite.rawBytes;

	const spriteType =
		levelSprite.bank === 0
			? bank0SpriteIdToEntityType[levelSprite.id]
			: bank1SpriteIdToEntityType[levelSprite.id];

	const keys = Object.keys(levelSpriteSlices).map((k) => (
		<div key={k} className="text-xs text-gray-400">
			{k}
		</div>
	));

	const values = Object.keys(levelSpriteSlices).map((k, i) => {
		const slice = levelSpriteSlices[k as keyof typeof levelSpriteSlices];
		const fieldData = data.slice(slice[0], slice[0] + slice[1]);

		return (
			<ByteInputField
				key={i}
				value={fieldData}
				onChange={(newBytes) => {
					onPatch({ offset: slice[0], bytes: newBytes });
				}}
			/>
		);
	});

	return (
		<div className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col')}>
			<div className="flex flex-row items-center space-x-2">
				<SpriteIcon entityType={spriteType} />
				<div className="bg-gray-200 text-gray-900 grid grid-rows-2 grid-cols-4 gap-x-2 p-1">
					{keys}
					{values}
				</div>
			</div>
		</div>
	);
}

export { LevelSprite };
