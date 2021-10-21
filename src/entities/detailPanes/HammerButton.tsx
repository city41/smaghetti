import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { IconHammer } from '../../icons';
import type { IconType } from '../../icons';

type HammerButtonProps<T extends string | number | symbol> = {
	className?: string;
	style?: CSSProperties;
	values: readonly T[];
	currentValue: T;
	onNewValue: (newValue: T) => void;
	valueToIcon?: Record<T, IconType>;
};

function HammerButton<T extends string | number | symbol>({
	className,
	style,
	values,
	currentValue,
	onNewValue,
	valueToIcon,
}: HammerButtonProps<T>) {
	const Icon = valueToIcon?.[currentValue] ?? IconHammer;

	return (
		<div
			style={style}
			className={clsx(
				className,
				'absolute top-0 left-0 w-full h-full grid place-items-center z-10'
			)}
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
				<Icon
					style={{ borderRadius: '10%' }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { HammerButton };
