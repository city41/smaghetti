import React from 'react';
import { ByteInputField } from './ByteInputField';
import { LevelTreeObjectHeader } from '../../types';

type ObjectHeaderProps = {
	header: LevelTreeObjectHeader;
	onPatch: (args: { offset: number; bytes: number[] }) => void;
};

const headerSlices = {
	'time limit': [0, 2],
	'unknown value': [2, 2],
	'level length': [4, 1],
	'bg color': [5, 1],
	'scroll/unknown': [6, 1],
	'level entry/gfx set': [7, 1],
	'gfx set/unknown': [8, 1],
	'x color/x effect': [9, 1],
	'bg gfx': [10, 1],
};

function ObjectHeader({ header, onPatch }: ObjectHeaderProps) {
	const data = header.rawBytes;

	const keys = Object.keys(headerSlices).map((k) => (
		<div key={k} className="text-xs text-gray-400">
			{k}
		</div>
	));
	const values = Object.keys(headerSlices).map((k, i) => {
		const slice = headerSlices[k as keyof typeof headerSlices];
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
		<div className="bg-gray-200 text-gray-900">
			<div className="grid grid-cols-9 grid-rows-2 p-1">
				{keys}
				{values}
			</div>
		</div>
	);
}

export { ObjectHeader };
