import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../tiles/constants';
import { FaCheck, FaQuestion } from 'react-icons/fa';

type EntityIconProps = {
	className?: string;
	entityType?: string;
	style?: CSSProperties;
	onClick?: () => void;
	isKnown?: boolean;
};

type BaseIconProps = EntityIconProps & {
	missingTypeClassName: string;
	children: ReactNode;
};

function BaseIcon({
	className,
	entityType,
	style,
	onClick,
	missingTypeClassName,
	isKnown,
	children,
}: BaseIconProps) {
	const bgClass = `${entityType}-bg`;

	const KnownIcon = isKnown ? FaCheck : FaQuestion;

	return (
		<div
			className={clsx(className, bgClass, 'relative bg-repeat', {
				'grid place-items-center text-xs': !entityType,
				[missingTypeClassName]: !entityType,
				'cursor-pointer': !!onClick,
			})}
			style={{
				width: TILE_SIZE,
				height: TILE_SIZE,
				...style,
			}}
			onClick={onClick}
		>
			{!entityType && children}
			<KnownIcon
				className={clsx('absolute right-0 bottom-0 text-white w-1.5 h-1.5', {
					'bg-green-500': isKnown,
					'bg-red-500': !isKnown,
				})}
			/>
		</div>
	);
}

function SpriteIcon(props: EntityIconProps) {
	return (
		<BaseIcon {...props} missingTypeClassName="bg-green-300 text-green-900">
			s
		</BaseIcon>
	);
}

function ObjectIcon(props: EntityIconProps) {
	return (
		<BaseIcon {...props} missingTypeClassName="bg-red-300 text-red-900">
			o
		</BaseIcon>
	);
}

function TransportIcon(props: EntityIconProps) {
	return (
		<BaseIcon
			{...props}
			missingTypeClassName="border border-yellow-600 text-white"
		>
			t
		</BaseIcon>
	);
}

export { SpriteIcon, ObjectIcon, TransportIcon };
