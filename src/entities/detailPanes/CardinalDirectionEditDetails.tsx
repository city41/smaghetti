import React, { ReactNode } from 'react';
import clsx from 'clsx';
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
} from 'react-icons/ai';
import { IconType } from 'react-icons';

type CardinalDirection = 'left' | 'right' | 'up' | 'down';

type CardinalDirectionEditDetailsProps = {
	directions: CardinalDirection[];
	width: number;
	height: number;
	onDirectionChange: (newDirection: CardinalDirection) => void;
	children: ReactNode;
};

const PADDING = 1;

const icons: Record<CardinalDirection, IconType> = {
	left: AiOutlineArrowLeft,
	right: AiOutlineArrowRight,
	down: AiOutlineArrowDown,
	up: AiOutlineArrowUp,
};

function CardinalDirectionEditDetails({
	width,
	height,
	directions,
	onDirectionChange,
	children,
}: CardinalDirectionEditDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		width: width + 2 * PADDING,
		minHeight: height + 2 * PADDING,
		padding: PADDING,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div
				className={clsx(
					'grid gap-y-0.5 mt-0.5 items-center justify-items-center',
					{
						'grid-cols-1': directions.length === 1,
						'grid-cols-2': directions.length === 2,
						'grid-cols-3': directions.length === 3,
						'grid-cols-4': directions.length === 4,
					}
				)}
			>
				{directions.map((p) => {
					const Icon = icons[p];
					return (
						<button
							key={p}
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onDirectionChange(p);
							}}
						>
							<Icon className="w-1 h-1 hover:bg-gray-600" />
						</button>
					);
				})}
			</div>
		</div>
	);
}

export { CardinalDirectionEditDetails };
export type { CardinalDirection };
