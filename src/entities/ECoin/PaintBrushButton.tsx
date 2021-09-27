import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';

type PaintBrushButtonProps = {
	onClick: () => void;
};

function PaintBrushButton({ onClick }: PaintBrushButtonProps) {
	return (
		<div className="absolute bottom-1 left-1 grid place-items-center z-10">
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					onClick();
				}}
			>
				<FaPaintBrush
					style={{ borderRadius: '10%' }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { PaintBrushButton };
