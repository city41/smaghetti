import React from 'react';
import { AiOutlineColumnWidth } from 'react-icons/ai';

type PlatformSizeButtonProps = {
	className?: string;
	widths: number[];
	currentWidth: number;
	onWidthChange: (newWidth: number) => void;
};

function PlatformWidthButton({
	className,
	widths,
	currentWidth,
	onWidthChange,
}: PlatformSizeButtonProps) {
	return (
		<button
			className={className}
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();

				const widthIndex = widths.indexOf(currentWidth);
				const newWidthIndex = (widthIndex + 1) % widths.length;
				const newWidth = widths[newWidthIndex];
				onWidthChange(newWidth);
			}}
		>
			<AiOutlineColumnWidth
				style={{ borderRadius: '10%', padding: 0.5 }}
				className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
			/>
		</button>
	);
}

export { PlatformWidthButton };
