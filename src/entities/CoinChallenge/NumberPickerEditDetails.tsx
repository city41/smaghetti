import React, { ReactNode, useRef } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { TILE_SIZE } from '../../tiles/constants';

type NumberPickerEditDetailsProps = {
	min: number;
	max: number;
	value: number;
	onValueChange: (newNumber: number) => void;
	children: ReactNode;
};

const PADDING = 1;
const DELTA_TIMEOUT = 70;

function NumberPickerEditDetails({
	min,
	max,
	value,
	onValueChange,
	children,
}: NumberPickerEditDetailsProps) {
	const downTid = useRef<null | NodeJS.Timeout>(null);
	const upTid = useRef<null | NodeJS.Timeout>(null);
	const valueRef = useRef(value);

	const style = {
		top: -PADDING,
		left: -PADDING,
		width: TILE_SIZE + 2 * PADDING,
		minHeight: TILE_SIZE + 2 * PADDING,
		padding: PADDING,
	};

	function onDecrement() {
		valueRef.current = Math.max(min, valueRef.current - 1);
		onValueChange(valueRef.current);
		downTid.current = setTimeout(onDecrement, DELTA_TIMEOUT);
	}

	function onIncrement() {
		valueRef.current = Math.min(max, valueRef.current + 1);
		onValueChange(valueRef.current);
		upTid.current = setTimeout(onIncrement, DELTA_TIMEOUT);
	}

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div className="flex flex-row mt-0.5 items-center justify-around">
				<button
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						valueRef.current = Math.max(min, valueRef.current - 1);
						onValueChange(valueRef.current);
						downTid.current = setTimeout(onDecrement, DELTA_TIMEOUT);
					}}
					onMouseUp={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (downTid.current) {
							clearTimeout(downTid.current);
							downTid.current = null;
						}
					}}
					onMouseOut={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (downTid.current) {
							clearTimeout(downTid.current);
							downTid.current = null;
						}
					}}
					onMouseLeave={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (downTid.current) {
							clearTimeout(downTid.current);
							downTid.current = null;
						}
					}}
				>
					<FaCaretDown className="w-1 h-1" />
				</button>
				<div style={{ fontSize: 4 }} className="w-1.5 text-center">
					{value}
				</div>
				<button
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						valueRef.current = Math.min(max, valueRef.current + 1);
						onValueChange(valueRef.current);
						upTid.current = setTimeout(onIncrement, DELTA_TIMEOUT);
					}}
					onMouseUp={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (upTid.current) {
							clearTimeout(upTid.current);
							upTid.current = null;
						}
					}}
					onMouseOut={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (upTid.current) {
							clearTimeout(upTid.current);
							upTid.current = null;
						}
					}}
					onMouseLeave={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (upTid.current) {
							clearTimeout(upTid.current);
							upTid.current = null;
						}
					}}
				>
					<FaCaretUp className="w-1 h-1" />
				</button>
			</div>
		</div>
	);
}

export { NumberPickerEditDetails };
