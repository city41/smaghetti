import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { Resizer } from '../../components/Resizer';
import { TILE_SIZE } from '../../tiles/constants';
import {
	FaArrowUp,
	FaArrowRight,
	FaArrowDown,
	FaArrowLeft,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import isEqual from 'lodash/isEqual';
import clamp from 'lodash/clamp';

import styles from './SnakePath.module.css';

type SnakePathProps = {
	className?: string;
	style?: CSSProperties;
	path: Point[];
	onNewPath: (newPath: Point[]) => void;
	onResizeStart: () => void;
	onResizeEnd: () => void;
};

const directionToIcon: Record<string, IconType> = {
	'1,0': FaArrowRight,
	'0,1': FaArrowDown,
	'-1,0': FaArrowLeft,
	'0,-1': FaArrowUp,
};

function getDirection(cell: Point, prev: Point): string {
	const xDelta = cell.x - prev.x;
	const yDelta = cell.y - prev.y;

	return `${xDelta},${yDelta}`;
}

function SnakePath({
	className,
	style = {},
	path,
	onNewPath,
	onResizeStart,
	onResizeEnd,
}: SnakePathProps) {
	const cellStyle = {
		width: TILE_SIZE - 2,
		height: TILE_SIZE - 2,
	};

	const pathCells = path.map((c, i, a) => {
		const Icon =
			i === 0 ? FaArrowRight : directionToIcon[getDirection(c, a[i - 1])];

		return (
			<div
				className={clsx(styles.cell, 'absolute grid place-items-center')}
				key={`${i}-${c.x}-${c.y}`}
				style={{
					...cellStyle,
					top: c.y * TILE_SIZE,
					left: (c.x - 1) * TILE_SIZE,
					backgroundColor: `hsla(52, 100%, ${(i / path.length) * 40}%, 0.75)`,
				}}
			>
				<Icon className="w-2 h-2" />
			</div>
		);
	});

	const lastCell = path[path.length - 1];
	const resizerLeft = ((lastCell?.x ?? 0) - 1) * TILE_SIZE;
	const resizerTop = (lastCell?.y ?? 0) * TILE_SIZE;

	return (
		<div className={clsx(className, '')} style={style}>
			{pathCells}
			<Resizer
				className="absolute top-0"
				style={{
					width: TILE_SIZE / 2,
					height: TILE_SIZE / 2,
					top: resizerTop + TILE_SIZE / 4,
					left: resizerLeft + TILE_SIZE / 4,
				}}
				size={{ x: 0, y: 0 }}
				increment={TILE_SIZE}
				axis="x-or-y"
				onSizeChange={(newSizePoint) => {
					const prop = newSizePoint.x ? 'x' : 'y';
					const delta = clamp(newSizePoint[prop], -1, 1);

					const newPath = [...path];

					const lastCell = path[path.length - 1] ?? { x: 0, y: 0 };
					const newCells = [];

					for (let i = 1; i <= Math.abs(delta); ++i) {
						const newCell = {
							...lastCell,
							[prop]: lastCell[prop] + i * Math.sign(delta),
						};

						if (isEqual(newCell, path[path.length - 2])) {
							newPath.pop();
						} else {
							newCells.push(newCell);
						}
					}

					onNewPath(newPath.concat(newCells));
				}}
				onResizeStart={onResizeStart}
				onResizeEnd={onResizeEnd}
			/>
		</div>
	);
}

export { SnakePath };
