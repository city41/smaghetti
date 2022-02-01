import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type PlayerDisplayProps = {
	className?: string;
	marioClassName: string;
	luigiClassName: string;
	size: number;
};

function PlayerDisplay({
	className,
	marioClassName,
	luigiClassName,
	size,
}: PlayerDisplayProps) {
	const { playAs } = useSelector((state: AppState) => state.editor.present);

	const playerClassName = playAs === 'mario' ? marioClassName : luigiClassName;

	return (
		<div
			className={clsx(className, playerClassName, 'bg-cover')}
			style={{ width: size, height: size }}
		/>
	);
}

export { PlayerDisplay };
