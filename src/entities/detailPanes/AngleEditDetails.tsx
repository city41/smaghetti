import React, { ReactNode } from 'react';
import { AiOutlineRotateRight } from 'react-icons/ai';

type AngleEditDetailsProps = {
	currentAngle?: number;
	rotateAmount?: number;
	width: number;
	height: number;
	onAngleChange: (newAngle: number) => void;
	disabled?: boolean;
	children: ReactNode;
};

function AngleEditDetails({
	currentAngle = 0,
	rotateAmount = 90,
	width,
	height,
	onAngleChange,
	disabled,
	children,
}: AngleEditDetailsProps) {
	const style = {
		width,
		height,
	};

	return (
		<div className="relative group" style={style}>
			{children}
			{!disabled && (
				<div className="absolute top-0 left-0 w-full h-full hidden group-hover:grid place-items-center">
					<button
						aria-label="rotate"
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const newAngle = (currentAngle ?? 0) + rotateAmount;
							onAngleChange(newAngle);
						}}
					>
						<AiOutlineRotateRight
							style={{ borderRadius: '10%' }}
							className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600"
						/>
					</button>
				</div>
			)}
		</div>
	);
}

export { AngleEditDetails };
