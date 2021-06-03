import React, { ReactNode } from 'react';
import { TILE_SIZE } from '../../tiles/constants';
import { NumberPicker } from './NumberPicker';

type NumberPickerEditDetailsProps = {
	min: number;
	max: number;
	value: number;
	onValueChange: (newNumber: number) => void;
	children: ReactNode;
};

const PADDING = 1;

function NumberPickerEditDetails({
	min,
	max,
	value,
	onValueChange,
	children,
}: NumberPickerEditDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		width: TILE_SIZE + 2 * PADDING,
		minHeight: TILE_SIZE + 2 * PADDING,
		padding: PADDING,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<NumberPicker
				className="mt-0.5"
				value={value}
				min={min}
				max={max}
				onValueChange={onValueChange}
			/>
		</div>
	);
}

export { NumberPickerEditDetails };
