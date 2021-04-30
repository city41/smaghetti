import React, { ReactNode } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type ResizeEditDetailsProps = {
	width: number;
	height: number;
	currentWidth: number;
	onResizeChange: (newWidth: number) => void;
	children: ReactNode;
};

const PADDING = 1;

function ResizeEditDetails({
	width,
	height,
	currentWidth,
	onResizeChange,
	children,
}: ResizeEditDetailsProps) {
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
			<div className="grid grid-cols-2 gap-y-0.5 my-0.5 items-center justify-items-center">
				<FaArrowLeft
					className="hover:bg-gray-500"
					style={{ fontSize: '0.25rem' }}
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onResizeChange(Math.max(currentWidth - 1, 1));
					}}
				/>
				<FaArrowRight
					className="hover:bg-gray-500"
					style={{ fontSize: '0.25rem' }}
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onResizeChange(currentWidth + 1);
					}}
				/>
			</div>
		</div>
	);
}

export { ResizeEditDetails };
