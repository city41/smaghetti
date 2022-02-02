import React from 'react';
import type { Entity } from './types';
import {
	encodeObjectSets,
	getBankParam1,
	getHeightForEntityWithASupportingFloor,
	getSupportingFloor,
} from './util';
import { ANY_SPRITE_GRAPHIC_SET, OBJECT_PRIORITY_MIDDLE } from './constants';
import { ResizableRect } from '../components/ResizableRect';
import { HammerButton } from './detailPanes/HammerButton';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';

const RECT_CLASSES = [
	[
		'ColorfulMetalBoxUpperLeft-bg',
		'ColorfulMetalBoxTop-bg',
		'ColorfulMetalBoxUpperRight-bg',
	],
	[
		'ColorfulMetalBoxLeft-bg',
		'ColorfulMetalBox-bg',
		'ColorfulMetalBoxRight-bg',
	],
	[
		'ColorfulMetalBoxLowerLeft-bg',
		'ColorfulMetalBoxBottom-bg',
		'ColorfulMetalBoxLowerRight-bg',
	],
];

const colorToObjectId = {
	white: 0x0,
	orange: 0x1,
	green: 0x2,
	blue: 0x3,
};

type Color = keyof typeof colorToObjectId;

const overlayColorToCss: Record<Color, string> = {
	white: 'transparent',
	orange: '#f8a060',
	green: '#90c868',
	blue: '#70d8f8',
};

const colorCycle: Color[] = Object.keys(colorToObjectId) as Color[];

const ColorfulMetalBoxWithShadow: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Colorful Metal Box - With Shadow',
		description:
			'These always extend down to a wood floor, and cast shadows on boxes they overlap with',
	},

	objectSets: encodeObjectSets([[1, 1]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'width',
	objectId: 0x2,
	objectPriority: OBJECT_PRIORITY_MIDDLE + 1,
	alternateObjectIds: Object.values(colorToObjectId),
	emptyBank: 1,

	defaultSettings: { width: 2, color: 'green' },

	toObjectBinary({ x, y, settings }): number[] {
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		const color = (settings.color ?? this.defaultSettings!.color) as Color;

		const objectId = colorToObjectId[color] ?? colorToObjectId.green;

		return [getBankParam1(1, width - 1), y, x, objectId];
	},

	simpleRender(size) {
		const style = { width: size, height: size };

		const cornerStyle = { width: size / 2, height: size / 2 };

		return (
			<div style={style} className="relative grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="ColorfulMetalBoxUpperLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="ColorfulMetalBoxUpperRight-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="ColorfulMetalBoxLowerLeft-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="ColorfulMetalBoxLowerRight-bg bg-cover"
				/>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					shadow
				</div>
			</div>
		);
	},

	render({ settings, onSettingsChange, entity, room }) {
		const height = getHeightForEntityWithASupportingFloor(
			entity,
			room,
			'WoodFloor'
		);
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		const color = (settings.color ?? this.defaultSettings!.color) as Color;

		return (
			<ResizableRect
				className="relative"
				width={width}
				height={height}
				styles={RECT_CLASSES}
				axis="x"
				hideResizer={!entity}
				minW={2}
				minH={2}
				onSizeChange={(width) => onSettingsChange({ width })}
			>
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						backgroundColor: overlayColorToCss[color],
						mixBlendMode: 'multiply',
					}}
				/>
				{!!entity && (
					<>
						<HammerButton
							currentValue={color}
							values={colorCycle}
							onNewValue={(newColor) => {
								onSettingsChange({ color: newColor });
							}}
						/>
						<TileSpace
							className="absolute left-0 top-0 w-full"
							style={{ height: TILE_SIZE }}
						/>
					</>
				)}
			</ResizableRect>
		);
	},

	getProblem({ entity, room }) {
		const supportingWoodFloor = getSupportingFloor(entity, room, 'WoodFloor');

		if (!supportingWoodFloor) {
			return {
				severity: 'error',
				message:
					'Must sit on top of a wood floor that extends 1 tile beyond on the right side',
			};
		}

		if (
			getHeightForEntityWithASupportingFloor(entity, room, 'WoodFloor') === 1
		) {
			return "Won't render correctly when only 1 tile tall";
		}
	},
};

export { ColorfulMetalBoxWithShadow };
