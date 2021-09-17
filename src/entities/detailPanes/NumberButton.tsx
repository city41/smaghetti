import React, { CSSProperties } from 'react';
import clsx from 'clsx';

type NumberButtonProps = {
	className?: string;
	style?: CSSProperties;
	currentValue: number;
	range: [number, number];
	title?: string;
	onNewValue: (newNumber: number) => void;
};

function NumberButton({
	className,
	style,
	currentValue,
	range,
	title,
	onNewValue,
}: NumberButtonProps) {
	return (
		<div style={style} className={clsx(className, 'grid place-items-center')}>
			<button
				title={title}
				className="w-1.5 h-1.5 font-bold bg-gray-700 hover:bg-gray-600 text-white text-center"
				style={{ fontSize: 4, borderRadius: '10%' }}
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
				{currentValue}
			</button>
		</div>
	);
}

export { NumberButton };
