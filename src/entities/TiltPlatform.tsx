import type { Entity } from './types';
import { simpleSpriteBinary } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';

const TiltPlatform: Entity = {
	paletteCategory: 'gizmo',
	paletteInfo: {
		title: 'Tilt Platform',
		description: 'Tilts slowly depending on which side Mario is standing on',
	},

	objectId: 0x90,
	editorType: 'entity',
	dimensions: 'none',

	toSpriteBinary(x, y) {
		return simpleSpriteBinary(x, y, this.objectId!);
	},

	simpleRender(mw, mh) {
		const style = { width: mw, height: mh };
		const ballStyle = {
			width: Math.min(mw, mh) / 5,
			height: (Math.min(mw, mh) / 5) * 2,
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
