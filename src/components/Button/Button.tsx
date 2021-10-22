import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
	className?: string;
	toggled?: boolean;
	variant?: 'destructive';
};

function Button({
	className,
	toggled,
	variant,
	onClick,
	children,
	disabled,
	...rest
}: ButtonProps): ReactElement {
	return (
		<button
			className={clsx(className, 'px-2 py-1', {
				'hover:bg-green-300 hover:text-green-900':
					!disabled && variant !== 'destructive',
				'hover:bg-red-300 hover:text-red-900':
					!disabled && variant === 'destructive',
				'bg-gray-400 text-gray-600 cursor-default': disabled,
				'border-b-4 border-green-700 bg-green-400 text-white':
					!toggled && !disabled && variant !== 'destructive',
				'border-b-4 border-red-700 bg-red-400 text-white':
					!toggled && !disabled && variant === 'destructive',
				'mt-1 bg-green-300 text-green-900':
					toggled && !disabled && variant !== 'destructive',
				'mt-1 bg-red-300 text-red-900':
					toggled && !disabled && variant === 'destructive',
			})}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
}

function ButtonMimickLabel({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	return (
		<label
			className={clsx(
				className,
				'px-2 py-1 bg-green-400 hover:bg-green-300 hover:text-green-900 border-b-4 border-green-700 cursor-pointer'
			)}
		>
			{children}
		</label>
	);
}

export { Button, ButtonMimickLabel };
export type { ButtonProps };
