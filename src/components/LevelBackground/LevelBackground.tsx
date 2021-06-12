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

function BonusRoom() {
	return <div className="BonusRoomBackground-bg w-full h-full" />;
}

function TetrisRoom() {
	return <div className="TetrisRoomBackground-bg w-full h-full" />;
}

function GhostHouse() {
	return (
		<div
			className="GhostHouseBackground-bg w-full h-full"
			style={{ backgroundPositionY: 'bottom' }}
		/>
	);
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

function Desert() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#f7dea5' }}
		>
			<div
				className="DesertBackground-bg w-full bg-repeat-x"
				style={{ height: 56 }}
			/>
		</div>
	);
}

function TallHills() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#8cb5ff' }}
		>
			<div
				className="TallHillsBackground-bg w-full bg-repeat-x"
				style={{ height: 256 }}
			/>
		</div>
	);
}

const bgToComponent: Record<number, ReactNode> = {
	[BACKGROUND_GRAPHIC_VALUES.underground]: <Underground />,
	[BACKGROUND_GRAPHIC_VALUES.fortress]: <Fortress />,
	[BACKGROUND_GRAPHIC_VALUES.plains]: <Plains />,
	[BACKGROUND_GRAPHIC_VALUES.desert]: <Desert />,
	[BACKGROUND_GRAPHIC_VALUES['ghost-house']]: <GhostHouse />,
	[BACKGROUND_GRAPHIC_VALUES['bonus-room']]: <BonusRoom />,
	[BACKGROUND_GRAPHIC_VALUES['tetris-room']]: <TetrisRoom />,
	[BACKGROUND_GRAPHIC_VALUES['tall-hills']]: <TallHills />,
};

function LevelBackground({ className, bgNumber }: LevelBackgroundProps) {
	const bg = bgToComponent[bgNumber] ?? null;
	return <div className={className}>{bg}</div>;
}

export { LevelBackground };
