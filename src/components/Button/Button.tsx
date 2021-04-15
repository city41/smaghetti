import React, { ReactElement } from 'react';
import clsx from 'clsx';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
	className?: string;
	toggled?: boolean;
};

function Button({
	className,
	toggled,
	onClick,
	children,
	disabled,
	...rest
}: ButtonProps): ReactElement {
	return (
		<button
			className={clsx(className, 'px-2 py-1', {
				'hover:bg-green-300 hover:text-green-900': !disabled,
				'bg-gray-400 text-gray-600 cursor-default': disabled,
				'border-b-4 border-green-700 bg-green-400 text-white':
					!toggled && !disabled,
				'mt-1 bg-green-300 text-green-900': toggled && !disabled,
			})}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
}

export { Button };
export type { ButtonProps };
