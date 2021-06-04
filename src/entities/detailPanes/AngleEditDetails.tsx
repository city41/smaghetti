import React, { ReactNode } from 'react';
import { AiOutlineRotateLeft } from 'react-icons/ai';

type AngleEditDetailsProps = {
	currentAngle?: number;
	rotateAmount?: number;
	width: number;
	height: number;
	onAngleChange: (newAngle: number) => void;
	children: ReactNode;
};

const PADDING = 1;

function AngleEditDetails({
	currentAngle = 0,
	// TODO: this is a strange default, but it is what works best with tailwinds rotate classes
	rotateAmount = 270,
	width,
	height,
	onAngleChange,
	children,
}: AngleEditDetailsProps) {
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
			<div className="grid my-0.5 place-items-center">
				<button
					aria-label="rotate"
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						const newAngle = ((currentAngle ?? 0) + rotateAmount) % 360;
						onAngleChange(newAngle);
					}}
				>
					<AiOutlineRotateLeft
						className="hover:bg-gray-500"
						style={{ fontSize: '0.25rem' }}
					/>
				</button>
			</div>
		</div>
	);
}

export { AngleEditDetails };