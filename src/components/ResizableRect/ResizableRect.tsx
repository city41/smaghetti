import React, { useState } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';
import { Resizer } from '../Resizer';
import styles from '../Resizer/ResizingStyles.module.css';

type ResizableRectProps = {
	className?: string;
	classes: string[][];
	width: number;
	height: number;
	hideResizer?: boolean;
	onSizeChange: (newWidth: number, newHeight: number) => void;
};

function getClassName(
	classes: string[][],
	x: number,
	y: number,
	w: number,
	h: number
): string {
	// upper left
	if (x === 0 && y === 0) {
		return classes[0][0];
	}

	// lower left
	if (x === 0 && y === h - 1) {
		return classes[2][0];
	}

	// upper right
	if (x === w - 1 && y === 0) {
		return classes[0][2];
	}

	// lower right
	if (x === w - 1 && y === h - 1) {
		return classes[2][2];
	}

	// left wall
	if (x === 0) {
		return classes[1][0];
	}

	// right wall
	if (x === w - 1) {
		return classes[1][2];
	}

	// top
	if (y === 0) {
		return classes[0][1];
	}

	// bottom
	if (y === h - 1) {
		return classes[2][1];
	}

	// center
	return classes[1][1];
}

function ResizableRect({
	className,
	classes,
	width,
	height,
	hideResizer,
	onSizeChange,
}: ResizableRectProps) {
	const [resizing, setResizing] = useState(false);

	const style = {
		width: width * TILE_SIZE,
		height: height * TILE_SIZE,
		gridTemplateColumns: `repeat(${width}, 1fr)`,
		gridTemplateRows: `repeat(${height}, 1fr)`,
	};

	const cellStyle = { width: TILE_SIZE, height: TILE_SIZE };

	const cells = [];

	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			cells.push(
				<div
					style={cellStyle}
					className={getClassName(classes, x, y, width, height)}
				/>
			);
		}
	}

	const size = { x: width, y: height };

	return (
		<div
			className={clsx(className, 'grid', {
				[styles.resizing]: resizing,
			})}
			style={style}
		>
			{cells}
			{!hideResizer && (
				<Resizer
					className="absolute bottom-0 right-0"
					style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
					size={size}
					increment={TILE_SIZE}
					axis="xy"
					onSizeChange={(newSizePoint) => {
						onSizeChange(
							Math.min(26, Math.max(2, newSizePoint.x)),
							Math.min(26, Math.max(1, newSizePoint.y))
						);
					}}
					onResizeStart={() => setResizing(true)}
					onResizeEnd={() => setResizing(false)}
				/>
			)}
		</div>
	);
}

export { ResizableRect };
