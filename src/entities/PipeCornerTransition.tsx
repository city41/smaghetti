import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { encodeObjectSets } from './util';
import { AngleEditDetails } from './detailPanes/AngleEditDetails';

const angleToObjectId: Record<number, number> = {
	0: 0x0,
	90: 0x1,
	180: 0x3,
	270: 0x2,
};

const PipeCornerTransition: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		title: 'Pipe Corner Transition',
		description: 'Typically used when you want a pipe to turn 90 degrees',
	},

	objectSets: encodeObjectSets([
		[6, 5],
		[6, 6],
		[6, 8],
		[8, 5],
		[8, 6],
		[8, 8],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x0,
	alternateObjectIds: Object.values(angleToObjectId),
	emptyBank: 0,
	settingsType: 'single',
	defaultSettings: { angle: 0 },
	width: 2,
	height: 2,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				515,
				682,
				880,
				980,
				500,
				666,
				895,
				436,
				6712,
				11932,
				15102,
				666,
				895,
			],
		],
		tiles: [
			[542, 586, 586, 540],
			[
				588,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				589,
			],
			[
				588,
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				{
					romOffset: 1486172,
					tileIndex: 510,
				},
				589,
			],
			[539, 587, 587, 541],
		],
		romOffset: 1550484,
	},

	toObjectBinary({ x, y, settings }) {
		const angle = (settings.angle ?? 0) % 360;
		return [0, y, x, angleToObjectId[angle]];
	},

	simpleRender(size) {
		return (
			<div
				className="PipeCornerTransition-bg bg-cover"
				style={{ width: size, height: size }}
			/>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		return (
			<AngleEditDetails
				width={TILE_SIZE * 2}
				height={TILE_SIZE * 2}
				currentAngle={settings.angle as number}
				onAngleChange={(angle) => onSettingsChange({ angle })}
				disabled={!entity}
			>
				<div
					className="PipeCornerTransition-bg bg-cover relative cursor-pointer transform transition-all w-full h-full"
					style={{
						transform: `rotate(${settings.angle ?? 0}deg)`,
					}}
				/>
			</AngleEditDetails>
		);
	},
};

export { PipeCornerTransition };
