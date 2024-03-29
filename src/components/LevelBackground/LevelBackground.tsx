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

function BlueAndGreenStars() {
	return <div className="BlueAndGreenStarsBackground-bg w-full h-full" />;
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

function DesertBrickBackground() {
	return <div className="DesertBrickBackground-bg w-full h-full" />;
}

function BasementDungeon() {
	return <div className="BasementDungeon-bg bg-black w-full h-full" />;
}

function HighUpInTheClouds() {
	return (
		<div
			className="HighUpInTheCloudsBackground-bg bg-repeat w-full h-full"
			style={{ backgroundColor: '#84adff' }}
		/>
	);
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

function FarAwayHillsInClouds() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#b5e7ff' }}
		>
			<div
				className="FarAwayHillsInCloudsBackground-bg w-full bg-repeat-x"
				style={{ height: 128 }}
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

function LongClouds() {
	return <div className="LongCloudsBackground-bg w-full h-full bg-repeat" />;
}

function BasicCastle() {
	return <div className="BasicCastleBackground-bg w-full h-full bg-repeat" />;
}

function BasicGhostHouse() {
	return (
		<div className="BasicGhostHouseBackground-bg w-full h-full bg-repeat" />
	);
}

function LargePulsatingBricks() {
	return (
		<div className="LargePulsatingBricksBackground-bg w-full h-full bg-repeat" />
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

function PyramidSplitInsideAndOut() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#f7dea5' }}
		>
			<div
				className="PyramidSplitInsideAndOutBackground-bg w-full bg-repeat-x"
				style={{ height: 368 }}
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

function TallHillsButShorter() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#8cb5ff' }}
		>
			<div
				className="TallHillsBackground-bg w-full bg-repeat-x"
				style={{ height: 192 }}
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

function UnderwaterMoreTerrain() {
	return (
		<div
			className="relative w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#84adff' }}
		>
			<div
				className="UnderwaterMoreTerrainBackground-bg w-full bg-repeat-x"
				style={{ height: 224 }}
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
		<div className="w-full h-full" style={{ backgroundColor: '#000028' }}>
			<div
				className="h-full flex flex-col justify-end"
				style={{ width: 256, backgroundColor: '#422121' }}
			>
				<div className="InsideAirship-bg w-full" style={{ height: 176 }} />
			</div>
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

function Jungle() {
	return (
		<div className="w-full h-full flex flex-col justify-end bg-black">
			<div
				className="JungleBackground-bg w-full bg-repeat-x"
				style={{ height: 224 }}
			/>
		</div>
	);
}

function JungleNoSky() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#004200' }}
		>
			<div className="JungleBackground-bg w-full h-full bg-repeat" />
		</div>
	);
}

function UndergroundDoubleCave() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#8cbdff' }}
		>
			<div
				className="UndergroundDoubleCaveBackground-bg w-full bg-repeat-x"
				style={{ height: 240, backgroundColor: '#402800' }}
			/>
			<div
				className="UndergroundDoubleCaveBackground-bg w-full bg-repeat-x"
				style={{ height: 240, backgroundColor: '#402800' }}
			/>
		</div>
	);
}

function UndergroundCave() {
	return (
		<div
			className="w-full h-full flex flex-col justify-end"
			style={{ backgroundColor: '#8cbdff' }}
		>
			<div
				className="UndergroundCaveBackground-bg w-full bg-repeat-x"
				style={{ height: 320, backgroundColor: '#402800' }}
			/>
		</div>
	);
}

function ToadHouse() {
	return (
		<div className="w-full h-full flex flex-col justify-end ToadHouseNullBackground-bg">
			<div
				className="ToadHouseBackground-bg w-full bg-repeat-x"
				style={{ height: 288, width: 256 }}
			/>
		</div>
	);
}

function ColorfulBrickWall() {
	return (
		<div className="w-full h-full flex flex-col justify-end ToadHouseNullBackground-bg">
			<div
				className="ColorfulBricksBackground-bg w-full bg-repeat"
				style={{ height: 272, width: 256 }}
			/>
		</div>
	);
}

function Blank() {
	return <div className="w-full h-full bg-white" />;
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
	[BACKGROUND_GRAPHIC_VALUES['tall-hills-but-shorter']]: (
		<TallHillsButShorter />
	),
	[BACKGROUND_GRAPHIC_VALUES['metal-brick']]: <MetalBrick />,
	[BACKGROUND_GRAPHIC_VALUES.underwater]: <Underwater />,
	[BACKGROUND_GRAPHIC_VALUES['underwater-more-terrain']]: (
		<UnderwaterMoreTerrain />
	),
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
	[BACKGROUND_GRAPHIC_VALUES.jungle]: <Jungle />,
	[BACKGROUND_GRAPHIC_VALUES['jungle-no-sky']]: <JungleNoSky />,
	[BACKGROUND_GRAPHIC_VALUES['toad-house']]: <ToadHouse />,
	[BACKGROUND_GRAPHIC_VALUES['desert-brick-wall']]: <DesertBrickBackground />,
	[BACKGROUND_GRAPHIC_VALUES['blue-and-green-stars']]: <BlueAndGreenStars />,
	[BACKGROUND_GRAPHIC_VALUES['far-away-hills-in-clouds']]: (
		<FarAwayHillsInClouds />
	),
	[BACKGROUND_GRAPHIC_VALUES['colorful-brick-wall']]: <ColorfulBrickWall />,
	[BACKGROUND_GRAPHIC_VALUES['underground-cave']]: <UndergroundCave />,
	[BACKGROUND_GRAPHIC_VALUES['underground-double-cave']]: (
		<UndergroundDoubleCave />
	),
	[BACKGROUND_GRAPHIC_VALUES.blank]: <Blank />,
	[BACKGROUND_GRAPHIC_VALUES['high-up-in-the-clouds']]: <HighUpInTheClouds />,
	[BACKGROUND_GRAPHIC_VALUES['pyramid-split-inside-and-out']]: (
		<PyramidSplitInsideAndOut />
	),
	[BACKGROUND_GRAPHIC_VALUES['long-clouds']]: <LongClouds />,
	[BACKGROUND_GRAPHIC_VALUES['basic-castle']]: <BasicCastle />,
	[BACKGROUND_GRAPHIC_VALUES['basic-ghost-house']]: <BasicGhostHouse />,
	[BACKGROUND_GRAPHIC_VALUES['large-pulsating-bricks']]: (
		<LargePulsatingBricks />
	),
};

function LevelBackground({ className, bgNumber }: LevelBackgroundProps) {
	const bg = bgToComponent[bgNumber] ?? null;
	return <div className={clsx(className, 'pointer-events-none')}>{bg}</div>;
}

export { LevelBackground };
