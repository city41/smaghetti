import React, { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './PlainIconButton.module.css';
import { IconLoading } from '../../icons';

type PlainIconButtonProps = Omit<
	JSX.IntrinsicElements['button'],
	'ref' | 'children'
> & {
	className?: string;
	label: string;
	icon: ElementType;
	size?: 'editor' | 'small' | 'medium' | 'large';
	toggled?: boolean;
	loading?: boolean;
	disabled?: boolean;
	children?: ReactNode;
};

function PlainIconButton({
	className,
	label,
	icon,
	size = 'medium',
	toggled,
	loading,
	disabled,
	children,
	...rest
}: PlainIconButtonProps) {
	const Icon = loading ? IconLoading : icon;
	return (
		<button
			aria-label={label}
			title={label}
			disabled={disabled}
			className={clsx(className, 'text-white ', {
				'bg-blue-400 text-gray-700 border-white': toggled && !disabled,
				'border-transparent': !toggled || disabled,
				'opacity-50 cursor-default': disabled,
				'cursor-pointer': !disabled,
				[styles.hover]: !disabled,
				'py-0.5 px-1 border-b-2': size !== 'editor',
			})}
			{...rest}
		>
			<Icon
				className={clsx({
					'w-1 h-1': size === 'editor',
					'text-l': size === 'small',
					'text-xl': size === 'medium',
					'text-2xl': size === 'large',
					'animate-spin': loading,
				})}
			/>
			{children}
		</button>
	);
}

export { PlainIconButton };
