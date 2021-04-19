import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../tiles/constants';

type EntityIconProps = {
	className?: string;
	entityType?: string;
	style?: CSSProperties;
	onClick?: () => void;
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
	children,
}: BaseIconProps) {
	const bgClass = `${entityType}-bg`;

	return (
		<div
			className={clsx(className, bgClass, 'bg-repeat', {
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
		<BaseIcon {...props} missingTypeClassName="bg-yellow-600 text-white">
			t
		</BaseIcon>
	);
}

export { SpriteIcon, ObjectIcon, TransportIcon };
