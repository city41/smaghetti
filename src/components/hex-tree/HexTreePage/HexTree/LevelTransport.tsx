import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { LevelTreeTransport } from '../../types';
import { TransportIcon } from '../entityIcons';
import { ByteInputField } from './ByteInputField';

type LevelTransportProps = {
	className?: string;
	levelTransport: LevelTreeTransport;
	onPatch: (arg: { offset: number; bytes: number[] }) => void;
};

const levelTransportSlices = {
	sy: [0, 1],
	sx: [1, 1],
	dr: [2, 1],
	'?0': [3, 1],
	dy: [4, 1],
	dx: [5, 1],
	cy: [6, 1],
	cx: [7, 1],
	'?1': [8, 1],
	et: [9, 1],
};

function LevelTransport({
	className,
	levelTransport,
	onPatch,
}: LevelTransportProps) {
	const data = levelTransport.rawBytes;

	const keys = Object.keys(levelTransportSlices).reduce<ReactElement[]>(
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

	const values = Object.keys(levelTransportSlices).reduce<ReactElement[]>(
		(building, k, i) => {
			if (i >= data.length) {
				return building;
			}

			const slice =
				levelTransportSlices[k as keyof typeof levelTransportSlices];
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
		<div className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col')}>
			<div className="flex flex-row items-center space-x-2">
				<TransportIcon isKnown="always" />
				<div className="bg-gray-200 text-gray-900 grid grid-cols-10 grid-rows-2 gap-x-4 p-1">
					{keys}
					{values}
				</div>
			</div>
		</div>
	);
}

export { LevelTransport };
