import React, {
	FunctionComponent,
	CSSProperties,
	ReactNode,
	ElementType,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { SFX } from '../../SFX';

type IconButtonProps = {
	className?: string;
	style?: CSSProperties;
	anchor?: 'top' | 'left' | 'right' | 'bottom';
	icon?: ElementType;
	label?: ReactNode;
	toggleable?: boolean;
	toggled?: boolean;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	href?: string;
};

// const TOGGLE_BG_COLOR = '#ffa50055';
const BG_COLOR = 'rgba(140, 180, 255, 0.8)';
const TOGGLE_BG_COLOR = BG_COLOR;
const TOGGLE_HOVER_COLOR = 'orange';
const HOVER_COLOR = 'orange';

// const Button = styled.button`
// 	pointer-events: all;
// 	outline: none;
// 	font-family: 'Helvetica Neue', sans-serif;
//
// 	--border-color: white;
// 	--size: 60px;
// 	background-color: var(--background-color);
//
// 	width: var(--size);
//
// 	max-height: var(--size);
// 	height: var(--size);
//
// 	font-size: 26px;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
//
// 	&.text,
// 	& .text {
// 		display: inline-block;
// 		width: initial;
// 		min-width: var(--size);
// 		height: 100%;
// 		line-height: calc(var(--size) - 16px);
// 		font-weight: bold;
// 		color: white;
// 		font-size: 1.2rem;
// 		padding: 0 8px;
// 		text-decoration: none;
// 	}
//
// 	border: 8px solid var(--border-color);
// 	border-top-width: 8px;
// 	border-radius: 14px;
//
// 	padding: 0;
//
// 	box-shadow: var(--item-box-shadow, 0 4px 6px 1px rgba(0, 0, 0, 0.5));
//
// 	cursor: pointer;
//
// 	&.topAnchor {
// 		border-top-width: 0;
// 		border-top-left-radius: 0;
// 		border-top-right-radius: 0;
// 		max-height: calc(var(--size) - 8px);
// 		height: calc(var(--size) - 8px);
// 	}
//
// 	&.leftAnchor {
// 		border-left-width: 0;
// 		border-top-left-radius: 0;
// 		border-bottom-left-radius: 0;
// 	}
//
// 	&.rightAnchor {
// 		border-right-width: 0;
// 		border-top-right-radius: 0;
// 		border-bottom-right-radius: 0;
// 	}
//
// 	&.bottomAnchor {
// 		border-bottom-width: 0;
// 		border-bottom-left-radius: 0;
// 		border-bottom-right-radius: 0;
// 	}
//
// 	&:hover {
// 		background-image: linear-gradient(
// 			to top,
// 			var(--hover-color),
// 			var(--background-color)
// 		);
//
// 		& img {
// 			width: 24px;
// 			height: 24px;
// 		}
// 	}
//
// 	&.toggled {
// 		position: relative;
//
// 		&:after {
// 			content: '';
// 			position: absolute;
// 			bottom: 0;
// 			left: 0;
//
// 			width: 100%;
// 			height: 4px;
// 			background-color: black;
// 		}
// 	}
//
// 	&.toggled,
// 	&:active {
// 		background-color: var(--hover-color);
// 		& img {
// 			width: 28px;
// 			height: 28px;
// 		}
// 	}
//
// 	&.toggled:hover {
// 		background-color: var(--hover-color);
// 		background-image: none;
// 	}
//
// 	& .iconImg {
// 		width: 20px;
// 		height: 20px;
// 	}
//
// 	&.disabled {
// 		& .iconImg {
// 			opacity: 0.2;
// 		}
// 		&:hover {
// 			background-image: none;
//
// 			& .iconImg {
// 				width: 20px;
// 				height: 20px;
// 			}
// 		}
// 	}
//
// 	& svg {
// 		fill: black;
// 	}
// `;

const IconButton: FunctionComponent<IconButtonProps> = ({
	className,
	style,
	icon,
	label,
	anchor,
	toggleable = false,
	toggled = false,
	disabled = false,
	onClick,
	href,
	children,
}) => {
	const Icon = icon;

	const buttonVariables = {
		'--background-color': toggleable ? TOGGLE_BG_COLOR : BG_COLOR,
		'--hover-color': toggleable ? TOGGLE_HOVER_COLOR : HOVER_COLOR,
	} as CSSProperties;

	const buttonStyle = {
		...style,
		...buttonVariables,
	};

	return (
		<button
			className={clsx(
				className,
				'flex items-center justify-center w-12 h-12 bg-green-100 text-black border-4 rounded-xl border-white text-lg pointer-events-auto overflow-hidden',
				{
					'rounded-t-none border-t-0': anchor === 'top',
					'rounded-l-none border-l-0': anchor === 'left',
					'rounded-r-none border-r-0': anchor === 'right',
					'rounded-b-none border-b-0': anchor === 'bottom',
					'bg-green-300 cursor-default': toggled,
					'hover:bg-green-500 hover:text-white': !toggled,
				}
			)}
			style={buttonStyle}
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
				SFX.buttonClicked();
			}}
		>
			<div
				className={clsx('w-full h-full grid place-items-center text-2xl', {
					'border-b-4 border-black': toggled,
					'opacity-25': disabled,
				})}
			>
				{children ||
					(Icon && <Icon />) ||
					(href && (
						<Link href={href!} passHref>
							<a>{children || label}</a>
						</Link>
					)) ||
					label}
			</div>
		</button>
	);
};

export { IconButton };
export type { IconButtonProps };
