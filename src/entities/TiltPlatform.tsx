import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { ANY_OBJECT_SET } from './constants';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const TiltPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Tilt Platform',
		description: 'Tilts slowly depending on which side Mario is standing on',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: [-1, -1, -1, graphicSetValues, -1, -1],
	objectId: 0x90,
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',

	toSpriteBinary({ x, y }) {
		return [0, this.objectId, x, y];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		const ballStyle = {
			width: size / 5,
			height: (size / 5) * 2,
		};
		return (
			<div className="flex flex-row items-center" style={style}>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformPivot-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
			</div>
		);
	},

	render() {
		const style = {
			width: TILE_SIZE * 3.5,
			height: TILE_SIZE / 2,
			marginLeft: -1.25 * TILE_SIZE,
			marginTop: -0.75 * TILE_SIZE,
		};

		const ballStyle = {
			width: TILE_SIZE / 2,
			height: TILE_SIZE,
		};

		return (
			<div className="flex flex-row" style={style}>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformPivot-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="TiltPlatformBall-bg bg-cover bg-no-repeat"
					style={ballStyle}
				/>
				<div
					className="absolute top-0 left-0"
					style={{ width: TILE_SIZE, height: TILE_SIZE }}
				>
					<TileSpace />
				</div>
			</div>
		);
	},
};

export { TiltPlatform };
