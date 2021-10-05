import React from 'react';
import { Meta } from '@storybook/react';
import { LevelSizeMeter } from './LevelSizeMeter';

const meta: Meta = {
	title: 'LevelSizeMeter',
	component: LevelSizeMeter,
};

export default meta;

const RANGES = [2024, 2070, 2110] as const;

export const Basic = () => {
	return (
		<div className="p-2 bg-gray-600" style={{ width: 600 }}>
			<LevelSizeMeter className="w-full" byteSize={1245} ranges={RANGES} />
		</div>
	);
};

export const Warning = () => {
	return (
		<div className="p-2 bg-gray-600" style={{ width: 600 }}>
			<LevelSizeMeter className="w-full" byteSize={2045} ranges={RANGES} />
		</div>
	);
};

export const Error = () => {
	return (
		<div className="p-2 bg-gray-600" style={{ width: 600 }}>
			<LevelSizeMeter className="w-full" byteSize={2100} ranges={RANGES} />
		</div>
	);
};

export const OffTheCharts = () => {
	return (
		<div className="p-2 bg-gray-600" style={{ width: 600 }}>
			<LevelSizeMeter className="w-full" byteSize={2500} ranges={RANGES} />
		</div>
	);
};
