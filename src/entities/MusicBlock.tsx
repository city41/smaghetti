import type { Entity } from './types';
import { getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { PayloadViewDetails } from '../components/details/PayloadViewDetails';
import { EntityType } from './entityMap';
import { ResourceType } from '../resources/resourceMap';
import { PayloadEditDetails } from '../components/details/PayloadEditDetails';

const MusicBlock: Entity = {
	editorType: 'cell',
	settingsType: 'single',
	defaultSettings: {},
	dimensions: 'x',
	payloadToObjectId: {
		FireFlower: 0x21,
		Leaf: 0x22,
		StarMan: 0x23,
	},
	objectId: 0x14,
	payloadBank: 0,
	emptyBank: 1,
	param1: 'width',

	resource: {
		palette: [
			0x7f96,
			0x7fff,
			0x0,
			0x39ce,
			0x4a52,
			0x6318,
			0x77bd,
			0x732c,
			0x7fd2,
			0x7ffb,
			0x5810,
			0x7597,
			0x7e1d,
			0x0,
			0x0,
			0x0,
		],
		romOffset: 0x131fe0,
		tiles: [
			[312, 314],
			[313, 315],
		],
	},

	toObjectBinary(x, y, w, h, settings): number[] {
		const payloadToObjectId = this.payloadToObjectId!;

		if (settings.payload in payloadToObjectId) {
			// if there is a payload then need to split this up into individual brick objects

			let binaries: number[] = [];
			const objectId = payloadToObjectId[
				settings.payload as keyof typeof payloadToObjectId
			]!;

			for (let by = 0; by < h + 1; ++by) {
				for (let bx = 0; bx < w + 1; ++bx) {
					binaries = binaries.concat([0, y + by, x + bx, objectId]);
				}
			}

			return binaries;
		} else {
			return [getBankParam1(1, w), y, x, this.objectId!];
		}
	},

	simpleRender(mw, mh) {
		return (
			<div
				className="MusicBlock-bg bg-cover"
				style={{ width: mw, height: mh }}
			/>
		);
	},

	render(showDetails, settings, onSettingsChange) {
		const body = (
			<div
				className="MusicBlock-bg bg-cover relative cursor-pointer"
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
					canClear
				>
					{body}
				</PayloadEditDetails>
			);
		} else {
			return body;
		}
	},
};

export { MusicBlock };
