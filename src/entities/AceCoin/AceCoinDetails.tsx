import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';

const ALL_INDICES = [0, 1, 2, 3, 4] as const;

type AceCoinIndex = typeof ALL_INDICES[number];

type AceCoinDetailsProps = {
	aceCoinIndex: AceCoinIndex;
	onIndexChange: (newIndex: AceCoinIndex) => void;
	children: ReactNode;
};

const PADDING = 1;

function NumberButton({
	current,
	onClick,
	children,
}: {
	current: boolean;
	onClick: () => void;
	children: number;
}) {
	return (
		<button
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}}
			style={{ fontSize: 3, minWidth: 4, height: 4 }}
			className={clsx('grid place-items-center hover:bg-gray-600', {
				'bg-green-500': current,
			})}
		>
			{children}
		</button>
	);
}

function AceCoinDetails({
	aceCoinIndex,
	onIndexChange,
	children,
}: AceCoinDetailsProps) {
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
			<div className="flex flex-row flex-wrap items-center justify-around">
				{ALL_INDICES.map((i) => {
					return (
						<NumberButton
							key={i}
							current={aceCoinIndex === i}
							onClick={() => onIndexChange(i)}
						>
							{i + 1}
						</NumberButton>
					);
				})}
			</div>
		</div>
	);
}

export { AceCoinDetails };
export type { AceCoinIndex };
