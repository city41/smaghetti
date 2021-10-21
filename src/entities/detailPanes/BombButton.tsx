import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { IconBomb } from '../../icons';

type BombButtonProps = {
	className?: string;
	style?: CSSProperties;
	onClick: () => void;
};

function BombButton({ className, style, onClick }: BombButtonProps) {
	return (
		<div
			style={style}
			className={clsx(className, 'w-full h-full grid place-items-center')}
		>
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					onClick();
				}}
			>
				<IconBomb
					style={{ borderRadius: '10%' }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { BombButton };
