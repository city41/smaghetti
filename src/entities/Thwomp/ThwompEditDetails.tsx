import React, { ReactNode } from 'react';
import clsx from 'clsx';
import {
	IconArrowDown,
	IconArrowDownLeft,
	IconArrowLeft,
	IconArrowRight,
	IconArrowUp,
	IconArrowUpLeft,
} from '../../icons';
import type { IconType } from '../../icons';
import { TILE_SIZE } from '../../tiles/constants';

const PADDING = 1;

const pursuits = [
	'down',
	'left',
	'right',
	'up',
	'up-left',
	'down-left',
] as const;

type Pursuit = typeof pursuits[number];

const pursuitToIcon: Record<Pursuit, IconType> = {
	down: IconArrowDown,
	left: IconArrowLeft,
	right: IconArrowRight,
	up: IconArrowUp,
	'up-left': IconArrowUpLeft,
	'down-left': IconArrowDownLeft,
};

type ThwompEditDetailsProps = {
	currentPursuit: Pursuit;
	onPursuitChange: (newPersuit: Pursuit) => void;
	children: ReactNode;
};

function ThwompEditDetails({
	currentPursuit,
	onPursuitChange,
	children,
}: ThwompEditDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		width: TILE_SIZE * 2 + 2 * PADDING,
		minHeight: TILE_SIZE * 2 + 2 * PADDING,
		padding: PADDING,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div className="grid grid-cols-3 grid-rows-2 items-center justify-items-center my-0.5">
				{pursuits.map((p) => {
					const Icon = pursuitToIcon[p];
					return (
						<button
							key={p}
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onPursuitChange(p);
							}}
						>
							<div
								className={clsx('p-0.5', {
									'bg-blue-500': currentPursuit === p,
								})}
							>
								<Icon className="w-1 h-1" />
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}

export { ThwompEditDetails, pursuitToIcon };
export type { Pursuit };
