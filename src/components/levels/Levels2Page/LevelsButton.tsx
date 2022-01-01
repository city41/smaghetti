import React, { ReactElement } from 'react';
import clsx from 'clsx';

type LevelsButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
	className?: string;
	toggled?: boolean;
	variant?: 'destructive';
};

function LevelsButton({
	className,
	toggled,
	variant,
	onClick,
	children,
	disabled,
	...rest
}: LevelsButtonProps): ReactElement {
	return (
		<button
			className={clsx(className, 'border', {
				'bg-green-600 border-green-600 font-bold cursor-default': toggled,
				'hover:bg-gray-600 border-gray-400': !toggled && !disabled,
				'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-500': disabled,
			})}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
}

export { LevelsButton };
