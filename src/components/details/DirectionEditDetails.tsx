import React, { ReactNode } from 'react';
import { FaArrowsAltH, FaArrowsAltV, FaArrowsAlt } from 'react-icons/fa';

type DirectionEditDetailsProps = {
	width: number;
	height: number;
	onDirectionChange: (newDirection: string) => void;
	children: ReactNode;
};

const PADDING = 1;

function DirectionEditDetails({
	width,
	height,
	onDirectionChange,
	children,
}: DirectionEditDetailsProps) {
	const style = {
		marginTop: -PADDING,
		marginLeft: -PADDING,
		marginRight: -PADDING,
		marginBottom: -PADDING,
		width: width + 2 * PADDING,
		minHeight: height + 2 * PADDING,
		padding: PADDING,
	};

	return (
		<div className="bg-gray-700" style={style}>
			{children}
			<div className="grid grid-cols-3 gap-y-0.5 my-0.5 items-center justify-items-center">
				<FaArrowsAltH
					className="hover:bg-gray-500"
					style={{ fontSize: '0.25rem' }}
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onDirectionChange('horizontal');
					}}
				/>
				<FaArrowsAltV
					className="hover:bg-gray-500"
					style={{ fontSize: '0.25rem' }}
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onDirectionChange('vertical');
					}}
				/>
				<FaArrowsAlt
					className="hover:bg-gray-500"
					style={{ fontSize: '0.25rem' }}
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onDirectionChange('both');
					}}
				/>
			</div>
		</div>
	);
}

export { DirectionEditDetails };
