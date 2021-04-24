import React, { ElementType } from 'react';
import clsx from 'clsx';

import styles from './PlainIconButton.module.css';
import { RiLoaderFill } from 'react-icons/ri';

type PlainIconButtonProps = Omit<
	JSX.IntrinsicElements['button'],
	'ref' | 'children'
> & {
	className?: string;
	label: string;
	icon: ElementType;
	size?: 'small' | 'medium' | 'large';
	toggled?: boolean;
	loading?: boolean;
};

function PlainIconButton({
	className,
	label,
	icon,
	size = 'medium',
	toggled,
	loading,
	...rest
}: PlainIconButtonProps) {
	const Icon = loading ? RiLoaderFill : icon;
	return (
		<button
			aria-label={label}
			title={label}
			className={clsx(
				className,
				styles.root,
				'text-white py-0.5 px-1 border-b-2',
				{
					'bg-blue-400 text-gray-700 border-white': toggled,
					'border-transparent': !toggled,
					'animate-spin': loading,
				}
			)}
			{...rest}
		>
			<Icon
				className={clsx({
					'text-l': size === 'small',
					'text-xl': size === 'medium',
					'text-2xl': size === 'large',
				})}
			/>
		</button>
	);
}

export { PlainIconButton };
