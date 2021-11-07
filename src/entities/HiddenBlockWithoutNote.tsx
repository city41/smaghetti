import React from 'react';

import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { ResourceType } from '../resources/resourceMap';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { encodeObjectSets } from './util';
import { objectSets } from './QuestionBlock/objectSets';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';

const HiddenBlockWithoutNote: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Hidden Block - Without Note',
		description:
			'Same as the other hidden block, but without note block as an option. Why? Due to compatibility issues, this allows hidden blocks to be used in more levels.',
	},

	objectId: 0,
	objectSets: encodeObjectSets(objectSets),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',

	defaultSettings: { payload: 'Coin' },
	dimensions: 'none',
	payloadBank: 0,
	payloadToObjectId: {
		OneUpMushroom: 0x1f,
		Coin: 0x1e,
	},

	toObjectBinary({ x, y, settings }) {
		const payloadToObjectId = this.payloadToObjectId!;

		const objectId =
			payloadToObjectId[settings.payload as keyof typeof payloadToObjectId];

		return [0, y, x, objectId!];
	},

	simpleRender(size) {
		const style = { width: size, height: size };
		return (
			<div
				className="border-green-400 border-2 border-dashed grid place-items-center font-xl font-bold"
				style={style}
			>
				?
			</div>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const body = (
			<div
				className="relative border-green-400 border-2 border-dashed grid place-items-center font-bold selectable"
				style={{ width: TILE_SIZE, height: TILE_SIZE }}
			>
				<PayloadViewDetails payload={settings.payload} />
			</div>
		);

		if (showDetails) {
			const payloads = Object.keys(this.payloadToObjectId!) as Array<
				EntityType | ResourceType
			>;

			return (
				<PayloadEditDetails
					width={TILE_SIZE}
					height={TILE_SIZE}
					onPayloadChange={(payload) => onSettingsChange({ payload })}
					payloads={payloads}
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { HiddenBlockWithoutNote };
