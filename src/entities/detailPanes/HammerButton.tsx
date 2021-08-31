import React, { CSSProperties } from 'react';
import { FaHammer } from 'react-icons/fa';

type HammerButtonProps<T> = {
	values: readonly T[];
	currentValue: T;
	onNewValue: (newValue: T) => void;
	style?: CSSProperties;
};

function HammerButton<T>({
	values,
	currentValue,
	onNewValue,
	style,
}: HammerButtonProps<T>) {
	return (
		<div
			style={style}
			className="absolute top-0 left-0 w-full h-full grid place-items-center z-10"
		>
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					const curIndex = values.indexOf(currentValue);
					const nextIndex = (curIndex + 1) % values.length;
					const nextValue = values[nextIndex];
					onNewValue(nextValue);
				}}
			>
				<FaHammer
					style={{ borderRadius: '10%' }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { HammerButton };
