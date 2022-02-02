import React from 'react';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { ResizableRect } from '../components/ResizableRect';
import { HammerButton } from './detailPanes/HammerButton';

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
	orange: 0x1,
	green: 0x2,
	blue: 0x3,
};

type Color = keyof typeof colorToObjectId;

const overlayColorToCss: Record<Color, string> = {
	orange: '#f8a060',
	green: '#90c868',
	blue: '#70d8f8',
};

const colorCycle: Color[] = Object.keys(colorToObjectId) as Color[];

const GrassPlateauTopiary: Entity = {
	paletteCategory: 'unfinished',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Grass Plateau - Topiary',
	},

	objectSets: encodeObjectSets([[1, 0x14]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	dimensions: 'none',
	param1: 'width',
	param2: 'height',
	objectId: 0x2,
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
			<div style={style} className="grid grid-cols-2 grid-rows-2">
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
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const height = 2; // (settings.height ?? this.defaultSettings!.height) as number;
		const width = (settings.width ?? this.defaultSettings!.width) as number;
		const color = (settings.color ?? this.defaultSettings!.color) as Color;

		return (
			<ResizableRect
				className="relative"
				width={width}
				height={height}
				styles={RECT_CLASSES}
				hideResizer={!entity}
				minW={2}
				minH={2}
				onSizeChange={(width, height) => onSettingsChange({ width, height })}
			>
				<div
					className="absolute top-0 left-0 w-full h-full"
					style={{
						backgroundColor: overlayColorToCss[color],
						mixBlendMode: 'multiply',
					}}
				/>
				{!!entity && (
					<HammerButton
						currentValue={color}
						values={colorCycle}
						onNewValue={(newColor) => {
							onSettingsChange({ color: newColor });
						}}
					/>
				)}
			</ResizableRect>
		);
	},
};

export { GrassPlateauTopiary };
