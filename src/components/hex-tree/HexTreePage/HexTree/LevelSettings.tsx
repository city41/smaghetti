import React from 'react';
import { ParsedLevelSettings } from '../../../../levelData/parseLevelSettingsFromLevelFile';
import { ByteInputField } from './ByteInputField';

type LevelSettingsProps = {
	levelSettings: {
		rawBytes: number[];
		settings: ParsedLevelSettings | null;
	};
	onPatch: (args: { offset: number; bytes: number[] }) => void;
};

const levelSettingsSlices = {
	'screen y boundary': [0, 2],
	'fixed screen center y': [2, 2],
	'player y screen center': [4, 2],
	'camera min': [6, 1],
	'camera max': [7, 1],
	'player y': [8, 1],
	'player x': [9, 1],
	'screen y': [10, 1],
	'screen x': [11, 1],
	'object set': [12, 2],
	music: [14, 2],
};

const otherSettingSlices = {
	graphicSets: [16, 6],
	unknown1: [22, 4],
	rotationSet: [26, 1],
	unknown2: [27, 1],
	bgExtraYPos: [28, 1],
	unknown3: [28, 3],
};

function LevelSettings({ levelSettings, onPatch }: LevelSettingsProps) {
	const data = levelSettings.rawBytes;

	if (!levelSettings.settings) {
		return null;
	}

	const keys = Object.keys(levelSettingsSlices).map((k) => (
		<div key={k} className="text-xs text-gray-400">
			{k}
		</div>
	));
	const values = Object.keys(levelSettingsSlices).map((k, i) => {
		const slice = levelSettingsSlices[k as keyof typeof levelSettingsSlices];
		const fieldData = data.slice(slice[0], slice[0] + slice[1]);

		return (
			<ByteInputField
				key={i}
				value={fieldData}
				fullInput
				onChange={(newBytes) => {
					onPatch({ offset: slice[0], bytes: newBytes });
				}}
			/>
		);
	});

	const otherKeys = Object.keys(otherSettingSlices).map((k) => (
		<div key={k} className="text-xs text-gray-400">
			{k}
		</div>
	));
	const otherValues = Object.keys(otherSettingSlices).map((k, i) => {
		const slice = otherSettingSlices[k as keyof typeof otherSettingSlices];
		const fieldData = data.slice(slice[0], slice[0] + slice[1]);

		return (
			<ByteInputField
				key={i}
				value={fieldData}
				fullInput
				onChange={(newBytes) => {
					onPatch({ offset: slice[0], bytes: newBytes });
				}}
			/>
		);
	});

	return (
		<div className="bg-gray-200 text-gray-900">
			<div className="grid grid-cols-11 grid-rows-2 p-1">
				{keys}
				{values}
			</div>
			<div className="grid grid-cols-6 grid-rows-2 p-1">
				{otherKeys}
				{otherValues}
			</div>
		</div>
	);
}

export { LevelSettings };
