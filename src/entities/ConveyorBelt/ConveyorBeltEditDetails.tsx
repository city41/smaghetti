import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

type Direction = 'left' | 'right';

type ConveyorBeltEditDetailsProps = {
	width: number;
	height: number;
	currentWidth: number;
	currentDirection: Direction;
	onWidthChange: (newWidth: number) => void;
	onDirectionChange: (newDirection: Direction) => void;
	children: ReactNode;
};

const PADDING = 1;

function ConveyorBeltEditDetails({
	width,
	height,
	currentWidth,
	currentDirection,
	onWidthChange,
	onDirectionChange,
	children,
}: ConveyorBeltEditDetailsProps) {
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
			<div className="my-0.5">
				<div className="grid grid-cols-3 items-center justify-items-center">
					<FaCaretLeft
						className="w-2 h-2"
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onWidthChange(Math.max(currentWidth - 1, 1));
						}}
					/>
					<div style={{ fontSize: 2 }} className="text-center">
						size
					</div>
					<FaCaretRight
						className="w-2 h-2"
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onWidthChange(currentWidth + 1);
						}}
					/>
				</div>
				<div style={{ fontSize: 2 }} className="text-center mt-0.5">
					direction
				</div>
				<div className="grid grid-cols-2 items-center justify-items-center">
					<ImArrowLeft
						className={clsx({
							'hover:bg-green-200': currentDirection !== 'left',
							'bg-yellow-500': currentDirection === 'left',
						})}
						style={{ fontSize: '0.25rem' }}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onDirectionChange('left');
						}}
					/>
					<ImArrowRight
						className={clsx({
							'hover:bg-green-200': currentDirection !== 'right',
							'bg-blue-500': currentDirection === 'right',
						})}
						style={{ fontSize: '0.25rem' }}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onDirectionChange('right');
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export { ConveyorBeltEditDetails };
export type { Direction };
