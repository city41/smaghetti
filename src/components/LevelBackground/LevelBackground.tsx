import React, { ReactNode } from 'react';
import { BACKGROUND_GRAPHIC_VALUES } from '../../levelData/constants';

type LevelBackgroundProps = {
	className?: string;
	bgNumber: number;
};

function Underground() {
	return <div className="UndergroundBackground-bg w-full h-full" />;
}

function Fortress() {
	return <div className="FortressBackground-bg w-full h-full" />;
}

function Plains() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#84adff' }}
		>
			<div
				className="PlainsBackground-bg w-full bg-repeat-x"
				style={{ height: 152 }}
			/>
		</div>
	);
}

const bgToComponent: Record<number, ReactNode> = {
	[BACKGROUND_GRAPHIC_VALUES.underground]: <Underground />,
	[BACKGROUND_GRAPHIC_VALUES.fortress]: <Fortress />,
	[BACKGROUND_GRAPHIC_VALUES.plains]: <Plains />,
};

function LevelBackground({ className, bgNumber }: LevelBackgroundProps) {
	const bg = bgToComponent[bgNumber] ?? null;
	return <div className={className}>{bg}</div>;
}

export { LevelBackground };
