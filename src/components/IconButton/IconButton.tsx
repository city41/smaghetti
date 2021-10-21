import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IconLoading } from '../../icons';
import type { IconType } from '../../icons';

type IconButtonProps = {
	className?: string;
	style?: CSSProperties;
	anchor?: 'top' | 'left' | 'right' | 'bottom' | 'top-right' | 'top-left';
	icon?: IconType;
	label?: ReactNode;
	alternate?: boolean;
	toggled?: boolean;
	disabled?: boolean;
	loading?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	href?: string;
};

function IconButton({
	className,
	style,
	icon,
	label,
	anchor,
	alternate,
	toggled = false,
	disabled = false,
	loading = false,
	onClick,
	href,
}: IconButtonProps) {
	const Icon = loading ? IconLoading : icon;

	return (
		<button
			className={clsx(
				className,
				'flex items-center justify-center w-12 h-12 border-4 rounded-xl border-white text-lg pointer-events-auto overflow-hidden',
				{
					'bg-purple-200 text-black': !alternate,
					'bg-gray-500 text-white': alternate,
					'rounded-t-none border-t-0': anchor === 'top',
					'rounded-t-none border-t-0 border-r-0 rounded-br-none':
						anchor === 'top-right',
					'rounded-t-none border-t-0 border-l-0 rounded-bl-none':
						anchor === 'top-left',
					'rounded-l-none border-l-0': anchor === 'left',
					'rounded-r-none border-r-0': anchor === 'right',
					'rounded-b-none border-b-0': anchor === 'bottom',
					'bg-purple-400 cursor-default': toggled,
					'hover:bg-purple-600 hover:text-white':
						!toggled && !alternate && !disabled,
					'hover:bg-gray-600 hover:text-white':
						!toggled && alternate && !disabled,
					'cursor-default': disabled,
					'cursor-pointer': !disabled,
				}
			)}
			style={style}
			key="button"
			disabled={disabled}
			tabIndex={-1}
			title={(icon && label && label.toString()) || ''}
			onMouseDown={(e) => {
				// don't allow the button to gain focus.
				// this is bad for accessibility, but doing it for now
				// since holding space is for panning, but pressing space
				// also activates any buttons that have focus
				e.preventDefault();
			}}
			onClick={(e) => {
				e.stopPropagation();

				if (disabled) {
					return;
				}
				onClick?.(e);
			}}
		>
			<div
				className={clsx('w-full h-11 grid place-items-center text-2xl', {
					'border-b-4 border-black': toggled,
					'opacity-25': disabled,
					'animate-spin': loading,
				})}
			>
				{(Icon && <Icon />) ||
					(href && (
						<Link href={href!} passHref>
							<a>{label}</a>
						</Link>
					)) ||
					label}
			</div>
		</button>
	);
}

export { IconButton };
export type { IconButtonProps };
