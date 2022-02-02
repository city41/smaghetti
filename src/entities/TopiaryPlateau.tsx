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
import { StaticResource } from '../resources/types';

const RECT_CLASSES_TEMPLATE = [
	[
		'TopiaryPlateauUpperLeft',
		'TopiaryPlateauUpperCenter',
		'TopiaryPlateauUpperRight',
	],
	[
		'TopiaryPlateauLowerLeft',
		'TopiaryPlateauLowerCenter',
		'TopiaryPlateauLowerRight',
	],
	[
		'TopiaryPlateauLowerLeft',
		'TopiaryPlateauLowerCenter',
		'TopiaryPlateauLowerRight',
	],
];

const colorToObjectId = {
	orange: 0x1,
	green: 0x2,
	blue: 0x3,
};

type Color = keyof typeof colorToObjectId;

const colorCycle: Color[] = Object.keys(colorToObjectId) as Color[];

function getRectClasses(color: Color): string[][] {
	return RECT_CLASSES_TEMPLATE.map((row) => {
		return row.map((cell) => {
			return cell + color + '-bg';
		});
	});
}

const palettes: Record<Color, number[]> = {
	green: [
		31775,
		32767,
		0,
		521,
		8846,
		14130,
		18359,
		500,
		666,
		895,
		21,
		3485,
		703,
		13824,
		19109,
		23337,
	],
	blue: [
		0x7f96,
		0x7fff,
		0x0,
		0x65a3,
		0x7a8b,
		0x7f6e,
		0x7fd6,
		0x1594,
		0x2e39,
		0x42bd,
		0x2260,
		0x2ac8,
		0x3b4c,
		0x47b0,
		0x223f,
		0x57f3,
	],
	orange: [
		0x7f96,
		0x7fff,
		0x0,
		0x17b,
		0x1a1f,
		0x329f,
		0x4b7f,
		0x3664,
		0x470a,
		0x5fb1,
		0xd73,
		0x19f8,
		0x2e5d,
		0x3edf,
		0x0,
		0x0,
	],
};

const resourceTemplate = {
	TopiaryPlateauUpperLeft: {
		palettes: [],
		tiles: [
			[512, 530],
			[600, 535],
		],
		romOffset: 1534952,
	},
	TopiaryPlateauUpperCenter: {
		palettes: [],
		tiles: [
			[531, 530],
			[536, 535],
		],
		romOffset: 1534952,
	},
	TopiaryPlateauUpperRight: {
		palettes: [],
		tiles: [
			[531, 514],
			[536, 601],
		],
		romOffset: 1534952,
	},
	TopiaryPlateauLowerLeft: {
		palettes: [],
		tiles: [
			[515, 534],
			[
				565,
				{
					romOffset: 1486172,
					tileIndex: 507,
				},
			],
		],
		romOffset: 1534952,
	},
	TopiaryPlateauLowerCenter: {
		palettes: [],
		tiles: [
			[
				{
					romOffset: 1486172,
					tileIndex: 507,
				},
				534,
			],
			[
				534,
				{
					romOffset: 1486172,
					tileIndex: 507,
				},
			],
		],
		romOffset: 1534952,
	},
	TopiaryPlateauLowerRight: {
		palettes: [],
		tiles: [
			[
				{
					romOffset: 1486172,
					tileIndex: 507,
				},
				516,
			],
			[534, 566],
		],
		romOffset: 1534952,
	},
};

const resources = Object.keys(resourceTemplate).reduce<
	Record<string, StaticResource>
>((building, key) => {
	Object.entries(palettes).forEach((pe) => {
		const resource = resourceTemplate[key as keyof typeof resourceTemplate];
		const newResource = {
			...resource,
			palettes: [pe[1]],
		};

		building[key + pe[0]] = newResource;
	});

	return building;
}, {});

const TopiaryPlateau: Entity = {
	paletteCategory: 'unfinished',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Topiary Plateau',
		description:
			'Always extends down to a wood floor, and casts shadows on topiaries they overlap with',
	},

	objectSets: encodeObjectSets([[1, 0x14]]),
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

	resources,

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
			<div style={style} className="grid grid-cols-2 grid-rows-2">
				<div
					style={cornerStyle}
					className="TopiaryPlateauUpperLeftgreen-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="TopiaryPlateauUpperRightgreen-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="TopiaryPlateauLowerLeftgreen-bg bg-cover"
				/>
				<div
					style={cornerStyle}
					className="TopiaryPlateauLowerRightgreen-bg bg-cover"
				/>
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
				styles={getRectClasses(color)}
				axis="x"
				hideResizer={!entity}
				minW={2}
				minH={2}
				onSizeChange={(width) => onSettingsChange({ width })}
			>
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
					'Must sit on top of a wood floor that extends 1 tile beyond on each side',
			};
		}

		if (
			getHeightForEntityWithASupportingFloor(entity, room, 'WoodFloor') === 1
		) {
			return "Won't render correctly when only 1 tile tall";
		}
	},
};

export { TopiaryPlateau };
