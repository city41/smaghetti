import type { Entity } from './types';
import { TransportSource } from '../components/Transport/TransportSource';
import React from 'react';
import { TILE_SIZE } from '../tiles/constants';

const Transport: Entity = {
	editorType: 'transport',
	gameType: 'transport',
	dimensions: 'none',

	toBinary() {
		return [];
	},

	simpleRender(mw) {
		const style = {
			transform: `scale(${(mw / TILE_SIZE) * 1.25})`,
		};

		return (
			<div className="transform grid place-items-center" style={style}>
				<TransportSource
					label="warp"
					destRoom={-1}
					destX={-1}
					destY={-1}
					exitType={0}
				/>
			</div>
		);
	},

	render() {
		return this.simpleRender!(TILE_SIZE, TILE_SIZE);
	},
};

export { Transport };
