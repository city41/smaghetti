import React from 'react';
import { FaHammer } from 'react-icons/fa';

type HammerButtonProps = {
	onClick: () => void;
};

function HammerButton({ onClick }: HammerButtonProps) {
	return (
		<div className="absolute top-0 left-0 w-full h-full grid place-items-center z-10">
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					onClick();
				}}
			>
				<FaHammer
					style={{ borderRadius: '10%', padding: 0.5 }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { HammerButton };
