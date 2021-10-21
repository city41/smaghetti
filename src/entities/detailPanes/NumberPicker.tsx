import React, { useRef } from 'react';
import clsx from 'clsx';
import { IconCaretDown, IconCaretUp } from '../../icons';

const DELTA_TIMEOUT = 70;

type NumberPickerProps = {
	className?: string;
	value: number;
	min: number;
	max: number;
	onValueChange: (newNumber: number) => void;
};

function NumberPicker({
	className,
	value,
	min,
	max,
	onValueChange,
}: NumberPickerProps) {
	const downTid = useRef<null | NodeJS.Timeout>(null);
	const upTid = useRef<null | NodeJS.Timeout>(null);
	const valueRef = useRef(value);

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
		<div
			className={clsx(className, 'flex flex-row items-center justify-around')}
		>
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
				<IconCaretDown className="w-1 h-1" />
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
				<IconCaretUp className="w-1 h-1" />
			</button>
		</div>
	);
}

export { NumberPicker };
