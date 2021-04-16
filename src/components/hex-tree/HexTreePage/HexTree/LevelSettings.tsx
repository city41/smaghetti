import React, { useState } from 'react';
import { LevelSettings as LevelSettingsType } from '../../../../levelData/parseLevelSettingsFromLevelFile';
import { toHexString } from '../util';
import { PlainIconButton } from '../../../PlainIconButton';
import { MdFileUpload } from 'react-icons/md';

type LevelSettingsProps = {
	levelSettings: {
		rawBytes: number[];
		settings: LevelSettingsType;
	};
	onPatch: (args: { offset: number; bytes: number[] }) => void;
};

function sliceToHex(data: number[], start: number, length: number) {
	return data
		.slice(start, start + length)
		.map(toHexString)
		.join(' ');
}

const levelSettingsSlices = {
	'screen y boundary': [0, 2],
	'fixed screen center y': [2, 2],
	'player y screen center': [4, 2],
	'camera min': [6, 1],
	'camera max': [7, 1],
	'player y': [8, 1],
	'player x': [9, 1],
	'screen x': [10, 1],
	'screen y': [11, 1],
	'object set': [12, 2],
	music: [14, 2],
};

function byteStringToBytes(bs: string): number[] {
	return bs.split(' ').map((bss) => parseInt(bss.trim(), 16));
}

function extractToByteStrings(
	data: number[]
): Record<keyof typeof levelSettingsSlices, string> {
	return Object.keys(levelSettingsSlices).reduce<
		Record<keyof typeof levelSettingsSlices, string>
	>((building, key) => {
		const k = key as keyof typeof levelSettingsSlices;
		const spec = levelSettingsSlices[k];
		building[k] = sliceToHex(data, spec[0], spec[1]);

		return building;
	}, {} as Record<keyof typeof levelSettingsSlices, string>);
}

function LevelSettings({ levelSettings, onPatch }: LevelSettingsProps) {
	const data = levelSettings.rawBytes;
	const [byteStringValues, setByteStringValues] = useState(
		extractToByteStrings(data)
	);

	if (!levelSettings.settings) {
		return null;
	}

	const keys = Object.keys(levelSettingsSlices).map((k) => (
		<div key={k} className="text-xs text-gray-400">
			{k}
		</div>
	));
	const values = Object.keys(levelSettingsSlices).map((k, i) => (
		<div key={i} className="text-sm flex flex-row items-center">
			<input
				className="w-16"
				type="text"
				value={byteStringValues[k as keyof typeof levelSettingsSlices]}
				onChange={(e) => {
					setByteStringValues((bsv) => {
						return {
							...bsv,
							[k]: e.target.value,
						};
					});
				}}
			/>
			<PlainIconButton
				label="update"
				icon={MdFileUpload}
				onClick={() => {
					const byteString =
						byteStringValues[k as keyof typeof levelSettingsSlices];
					const bytes = byteStringToBytes(byteString);
					const offset =
						levelSettingsSlices[k as keyof typeof levelSettingsSlices][0];

					onPatch({ offset, bytes });
				}}
			/>
		</div>
	));

	return (
		<div className="bg-gray-200 text-gray-900">
			<div className="grid grid-cols-11 grid-rows-2 p-1">
				{keys}
				{values}
			</div>
		</div>
	);
}

export { LevelSettings };
