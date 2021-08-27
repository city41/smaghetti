import React, { useState, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../tiles/constants';
import { Resizer } from '../Resizer';
import resizingStyles from '../Resizer/ResizingStyles.module.css';

type ResizableRectCellStyle = string | CSSProperties;

type ResizableRectProps = {
	className?: string;
	styles: ResizableRectCellStyle[][];
	width: number;
	height: number;
	hideResizer?: boolean;
	minW: number;
	minH: number;
	onSizeChange: (newWidth: number, newHeight: number) => void;
	children?: ReactNode;
};

function getCellStyle(
	styles: ResizableRectCellStyle[][],
	x: number,
	y: number,
	w: number,
	h: number
): ResizableRectCellStyle {
	// upper left
	if (x === 0 && y === 0) {
		return styles[0][0];
	}

	// lower left
	if (x === 0 && y === h - 1) {
		return styles[2][0];
	}

	// upper right
	if (x === w - 1 && y === 0) {
		return styles[0][2];
	}

	// lower right
	if (x === w - 1 && y === h - 1) {
		return styles[2][2];
	}

	// left wall
	if (x === 0) {
		return styles[1][0];
	}

	// right wall
	if (x === w - 1) {
		return styles[1][2];
	}

	// top
	if (y === 0) {
		return styles[0][1];
	}

	// bottom
	if (y === h - 1) {
		return styles[2][1];
	}

	// center
	return styles[1][1];
}

function ResizableRect({
	className,
	styles,
	width,
	height,
	minW,
	minH,
	hideResizer,
	onSizeChange,
	children,
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
			const styleOrClass = getCellStyle(styles, x, y, width, height);
			const className =
				typeof styleOrClass === 'string' ? styleOrClass : undefined;
			const finalStyle =
				typeof styleOrClass === 'object'
					? { ...cellStyle, ...styleOrClass }
					: cellStyle;
			cells.push(<div style={finalStyle} className={className} />);
		}
	}

	const size = { x: width, y: height };

	return (
		<div
			className={clsx(className, 'grid', {
				[resizingStyles.resizing]: resizing,
			})}
			style={style}
		>
			{cells}
			{!hideResizer && (
				<Resizer
					className="absolute bottom-0 right-0 z-10"
					style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
					size={size}
					increment={TILE_SIZE}
					axis="xy"
					onSizeChange={(newSizePoint) => {
						onSizeChange(
							Math.max(minW, newSizePoint.x),
							Math.max(minH, newSizePoint.y)
						);
					}}
					onResizeStart={() => setResizing(true)}
					onResizeEnd={() => setResizing(false)}
				/>
			)}
			{children}
		</div>
	);
}

export { ResizableRect };
