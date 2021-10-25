import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_OBJECT_SET } from './constants';
import { parseSimpleSprite } from './util';
import { IconWater } from '../icons';

const PlatformWoodBob: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		subCategory: 'gizmo-platform',
		title: 'Platform - Wood, Bobbing',
		description: 'Bobs up and down as if on water.',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [[5, 7, 8], -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x3e,
	width: 3,
	height: 1,

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	parseSprite(data, offset) {
		return parseSimpleSprite(data, offset, 0, this);
	},

	simpleRender(size) {
		const cellStyle = { width: size / 3, height: size / 3 };

		return (
			<div
				className="flex flex-col items-center justify-start"
				style={{ width: size, height: size }}
			>
				<div className="flex flex-row items-center justify-center">
					<IconWater className="text-blue-300" />
				</div>
				<div
					className="flex flex-row items-center"
					style={{ width: size, height: size / 3 }}
				>
					<div className="WoodPlatformLeft-bg bg-cover" style={cellStyle} />
					<div className="WoodPlatform-bg bg-cover" style={cellStyle} />
					<div className="WoodPlatformRight-bg bg-cover" style={cellStyle} />
				</div>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE * 3, height: TILE_SIZE };
		const platformStyle = { width: TILE_SIZE * 3, height: TILE_SIZE };
		const cellStyle = { width: TILE_SIZE, height: TILE_SIZE };

		const platform = (
			<div className="flex flex-row items-center" style={platformStyle}>
				<div className="WoodPlatformLeft-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatform-bg bg-cover" style={cellStyle} />
				<div className="WoodPlatformRight-bg bg-cover" style={cellStyle} />
			</div>
		);

		return (
			<div style={style} className="relative">
				<div className="absolute top-0 left-0 w-full h-full grid place-items-center">
					<IconWater
						style={{ borderRadius: '10%' }}
						className="w-2 h-2 bg-gray-800 text-blue-200"
					/>
				</div>
				{platform}
			</div>
		);
	},
};

export { PlatformWoodBob };
