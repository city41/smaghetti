import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { TILE_SIZE } from '../../../tiles/constants';

type EntityIconProps = {
	className?: string;
	entityType?: string;
	style?: CSSProperties;
};

type BaseIconProps = EntityIconProps & {
	className?: string;
	missingTypeClassName: string;
	children: ReactNode;
};

function BaseIcon({
	className,
	entityType,
	style,
	missingTypeClassName,
	children,
}: BaseIconProps) {
	const bgClass = `${entityType}-bg`;

	return (
		<div
			className={clsx(className, bgClass, 'bg-repeat', {
				'grid place-items-center text-xs': !entityType,
				[missingTypeClassName]: !entityType,
			})}
			style={{
				width: TILE_SIZE,
				height: TILE_SIZE,
				...style,
			}}
		>
			{!entityType && children}
		</div>
	);
}

function SpriteIcon({ className, entityType, style }: EntityIconProps) {
	return (
		<BaseIcon
			className={className}
			entityType={entityType}
			style={style}
			missingTypeClassName="bg-green-300 text-green-900"
		>
			s
		</BaseIcon>
	);
}

function ObjectIcon({ className, entityType, style }: EntityIconProps) {
	return (
		<BaseIcon
			className={className}
			entityType={entityType}
			style={style}
			missingTypeClassName="bg-red-300 text-red-900"
		>
			o
		</BaseIcon>
	);
}

function TransportIcon({ className, entityType, style }: EntityIconProps) {
	return (
		<BaseIcon
			className={className}
			entityType={entityType}
			style={style}
			missingTypeClassName="bg-yellow-600 text-white"
		>
			t
		</BaseIcon>
	);
}

export { SpriteIcon, ObjectIcon, TransportIcon };
