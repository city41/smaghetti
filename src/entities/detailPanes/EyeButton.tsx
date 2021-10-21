import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { IconEye, IconEyeSlash } from '../../icons';

type EyeButtonProps = {
	className?: string;
	style?: CSSProperties;
	isHidden: boolean;
	onHideToggle: (hidden: boolean) => void;
};

function EyeButton({
	className,
	style,
	isHidden,
	onHideToggle,
}: EyeButtonProps) {
	const Icon = isHidden ? IconEyeSlash : IconEye;

	return (
		<div
			style={style}
			className={clsx(className, 'w-full h-full grid place-items-center')}
		>
			<button
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					onHideToggle(!isHidden);
				}}
			>
				<Icon
					style={{ borderRadius: '10%' }}
					className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
				/>
			</button>
		</div>
	);
}

export { EyeButton };
