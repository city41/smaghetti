import React, { ElementType } from 'react';
import clsx from 'clsx';

type PlainIconButtonProps = Omit<
	JSX.IntrinsicElements['button'],
	'ref' | 'children'
> & {
	className?: string;
	label: string;
	icon: ElementType;
	size?: 'small' | 'medium' | 'large';
};

function PlainIconButton({
	className,
	label,
	icon,
	size = 'medium',
	...rest
}: PlainIconButtonProps) {
	const Icon = icon;
	return (
		<button
			aria-label={label}
			title={label}
			className={clsx(className, 'bg-gray-700 hover:bg-gray-600 text-white')}
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
