import React from 'react';
import type { Entity } from '../types';
import { ANY_OBJECT_SET, ANY_SPRITE_GRAPHIC_SET } from '../constants';
import { VectorArm } from './VectorArm';

const AutoscrollVector: Entity = {
	paletteInfo: {
		title: 'Autoscroll Vector',
	},

	objectSets: ANY_OBJECT_SET,
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'actor',
	editorType: 'entity',
	objectId: 0,
	dimensions: 'none',
	defaultSettings: {
		to: {
			x: 20,
			y: 0,
		},
		speed: 0,
	},

	simpleRender() {
		return <div>asv</div>;
	},

	render({ settings, onSettingsChange }) {
		const to = settings.to ?? (this.defaultSettings!.to as Point);

		return (
			<div className="relative">
				<div>B</div>
				<VectorArm
					to={to}
					onChange={(p) => {
						onSettingsChange({
							to: p,
						});
					}}
				/>
			</div>
		);
	},
};

export { AutoscrollVector };
