import React, { CSSProperties } from 'react';
import clsx from 'clsx';

type NumberButtonProps = {
	className?: string;
	style?: CSSProperties;
	currentValue: number;
	range: [number, number];
	onNewValue: (newNumber: number) => void;
};

function NumberButton({
	className,
	style,
	currentValue,
	range,
	onNewValue,
}: NumberButtonProps) {
	return (
		<button
			style={{ ...style, fontSize: 4, borderRadius: '10%' }}
			className={clsx(
				'font-bold bg-gray-700 hover:bg-gray-600 text-white text-center'
			)}
			onMouseDown={(e) => {
				e.stopPropagation();
				e.preventDefault();
				let newValue = currentValue + 1;
				if (newValue > range[1]) {
					newValue = range[0];
				}

				onNewValue(newValue);
			}}
		>
			<div className="w-1.5 h-1.5">{currentValue}</div>
		</button>
	);
}

export { NumberButton };
