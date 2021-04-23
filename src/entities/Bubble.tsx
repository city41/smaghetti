import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { TileSpace } from './TileSpace';
import { PayloadViewDetails } from '../components/details/PayloadViewDetails';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';
import { PayloadEditDetails } from '../components/details/PayloadEditDetails';

const Bubble: Entity = {
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0xdb,

	payloadToObjectId: {
		OneUpMushroom: 0,
		Mushroom: 1,
		FireFlower: 2,
		Leaf: 3,
		StarMan: 4,
		TanookiSuit: 5,
		FrogSuit: 6,
		// HammerBrosSuit: 7
		Shoe: 8,
		// 9 is half of an ace coin? seems like a bug
		// Boomerang: 10
		// 11 is the other half of an ace coin?
		// 12 is some kind of wing?
		Key: 13,
		SpringBoard: 14,
		AceCoin: 15,
		// 16 is some kind of lettering? possibly need a diff graphic set
	},

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x18c6,
			0x101a,
			0x10bf,
			0x125f,
			0x25fd,
			0x369e,
			0x475f,
			0x139f,
			0x177,
			0x21c,
			0x29f,
			0x47bf,
			0x137f,
			0x25f,
		],
		romOffset: 0x18af80,
		tiles: [
			[134, 135, 136, 137],
			[166, 167, 168, 169],
			[198, 199, 200, 201],
			[230, 231, 232, 233],
		],
	},

	toSpriteBinary(x, y, _w, _h, settings) {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			const payloadId = payloadToObjectId[
				settings.payload as keyof typeof payloadToObjectId
			]!;
			return [0, this.objectId!, x, y, payloadId, 0];
		} else {
			// TODO: figure out what the bytes are for empty bubble
			return [0, this.objectId!, x, y, 0, 0];
		}
	},

	simpleRender(mw, mh) {
		return (
			<div className="Bubble-bg bg-cover" style={{ width: mw, height: mh }} />
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const style = {
			width: TILE_SIZE * 2,
			height: TILE_SIZE * 2,
			backgroundSize: '100%',
			paddingBottom: TILE_SIZE,
			paddingRight: TILE_SIZE,
		};

		const body = (
			<div className="Bubble-bg bg-cover relative cursor-pointer" style={style}>
				<TileSpace />
				<PayloadViewDetails
					className="bottom-3 right-3"
					payload={settings.payload}
				/>
			</div>
		);

		if (showDetails) {
			const payloads = Object.keys(this.payloadToObjectId!) as Array<
				EntityType | ResourceType
			>;

			return (
				<PayloadEditDetails
					width={TILE_SIZE * 2}
					height={TILE_SIZE * 2}
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

export { Bubble };
