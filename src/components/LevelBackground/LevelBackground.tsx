import React, { ReactNode } from 'react';
import clsx from 'clsx';
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

function MetalBrick() {
	return <div className="MetalBrickBackground-bg w-full h-full" />;
}

function CrystalUnderground() {
	return <div className="CrystalUndergroundBackground-bg w-full h-full" />;
}

function NightSky() {
	return <div className="NightSkyBackground-bg bg-black w-full h-full" />;
}

function StoneWall() {
	return <div className="StoneWallBackground-bg bg-black w-full h-full" />;
}

function BasementDungeon() {
	return <div className="BasementDungeon-bg bg-black w-full h-full" />;
}

function GhostHouse() {
	return (
		<div
			className="GhostHouseBackground-bg w-full h-full"
			style={{ backgroundPositionY: 'bottom' }}
		/>
	);
}

function BowserCastle() {
	return (
		<div
			className="BowserCastleBackground-bg w-full h-full bg-repeat-x bg-black"
			style={{ backgroundPositionY: 'bottom' }}
		/>
	);
}

function Pipes() {
	return (
		<div
			className="PipesBackground-bg w-full h-full bg-repeat bg-black"
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

function HillsInClouds() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#b5e7ff' }}
		>
			<div
				className="HillsInCloudsBackground-bg w-full bg-repeat-x"
				style={{ height: 144 }}
			/>
		</div>
	);
}

function GreenMountains() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#84adff' }}
		>
			<div
				className="GreenMountainsBackground-bg w-full bg-repeat-x"
				style={{ height: 176 }}
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

function Pyramids() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#f7dea5' }}
		>
			<div
				className="PyramidsBackground-bg w-full bg-repeat-x"
				style={{ height: 112 }}
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

function Winter() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#84adff' }}
		>
			<div
				className="WinterBackground-bg w-full bg-repeat-x"
				style={{ height: 168 }}
			/>
		</div>
	);
}

function Underwater() {
	return (
		<div
			className="relative w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#0052c6' }}
		>
			<div
				className="UnderwaterBackground-bg w-full bg-repeat-x"
				style={{ height: 64 }}
			/>
			<div
				className="absolute top-0 left-0 w-full h-full opacity-40"
				style={{ backgroundColor: 'blue' }}
			/>
		</div>
	);
}

function HillsAtNight() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: 'black' }}
		>
			<div
				className="HillsAtNightBackground-bg w-full bg-repeat-x"
				style={{ height: 192 }}
			/>
		</div>
	);
}

function InsideAirship() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#422121' }}
		>
			<div
				className="InsideAirship-bg w-full bg-repeat-x"
				style={{ height: 176 }}
			/>
		</div>
	);
}

function Mountains() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#7b7373' }}
		>
			<div
				className="MountainsBackground-bg w-full bg-repeat-x"
				style={{ height: 128 }}
			/>
		</div>
	);
}

function Waterfalls() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#b5e7ff' }}
		>
			<div
				className="WaterfallsBackground-bg w-full bg-repeat-x"
				style={{ height: 112 }}
			/>
		</div>
	);
}

function StormyClouds() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#000029' }}
		>
			<div
				className="StormyCloudsBackground-bg w-full bg-repeat-x"
				style={{ height: 112 }}
			/>
		</div>
	);
}

const bgToComponent: Record<number, ReactNode> = {
	[BACKGROUND_GRAPHIC_VALUES.underground]: <Underground />,
	[BACKGROUND_GRAPHIC_VALUES.fortress]: <Fortress />,
	[BACKGROUND_GRAPHIC_VALUES.plains]: <Plains />,
	[BACKGROUND_GRAPHIC_VALUES.desert]: <Desert />,
	[BACKGROUND_GRAPHIC_VALUES.winter]: <Winter />,
	[BACKGROUND_GRAPHIC_VALUES['ghost-house']]: <GhostHouse />,
	[BACKGROUND_GRAPHIC_VALUES['bonus-room']]: <BonusRoom />,
	[BACKGROUND_GRAPHIC_VALUES['tetris-room']]: <TetrisRoom />,
	[BACKGROUND_GRAPHIC_VALUES['tall-hills']]: <TallHills />,
	[BACKGROUND_GRAPHIC_VALUES['metal-brick']]: <MetalBrick />,
	[BACKGROUND_GRAPHIC_VALUES.underwater]: <Underwater />,
	[BACKGROUND_GRAPHIC_VALUES['crystal-underground']]: <CrystalUnderground />,
	[BACKGROUND_GRAPHIC_VALUES['hills-at-night']]: <HillsAtNight />,
	[BACKGROUND_GRAPHIC_VALUES['night-sky']]: <NightSky />,
	[BACKGROUND_GRAPHIC_VALUES['stormy-clouds']]: <StormyClouds />,
	[BACKGROUND_GRAPHIC_VALUES['stone-wall']]: <StoneWall />,
	[BACKGROUND_GRAPHIC_VALUES['basement-dungeon']]: <BasementDungeon />,
	[BACKGROUND_GRAPHIC_VALUES['pyramids']]: <Pyramids />,
	[BACKGROUND_GRAPHIC_VALUES['inside-airship']]: <InsideAirship />,
	[BACKGROUND_GRAPHIC_VALUES.mountains]: <Mountains />,
	[BACKGROUND_GRAPHIC_VALUES.waterfalls]: <Waterfalls />,
	[BACKGROUND_GRAPHIC_VALUES['bowser-castle']]: <BowserCastle />,
	[BACKGROUND_GRAPHIC_VALUES.pipes]: <Pipes />,
	[BACKGROUND_GRAPHIC_VALUES['green-mountains']]: <GreenMountains />,
	[BACKGROUND_GRAPHIC_VALUES['hills-in-clouds']]: <HillsInClouds />,
};

function LevelBackground({ className, bgNumber }: LevelBackgroundProps) {
	const bg = bgToComponent[bgNumber] ?? null;
	return <div className={clsx(className, 'pointer-events-none')}>{bg}</div>;
}

export { LevelBackground };
