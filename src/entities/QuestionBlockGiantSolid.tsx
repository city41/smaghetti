import React from 'react';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { TileSpace } from './TileSpace';
import { ResourceType } from '../resources/resourceMap';
import { PayloadEditDetails } from './detailPanes/PayloadEditDetails';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { encodeObjectSets, getBankParam1 } from './util';

const payloadToObjectId = {
	Coin: 0x2,
	Leaf: 0x3,
};

const QuestionBlockGiantSolid: Entity = {
	paletteCategory: 'object',
	paletteInfo: {
		title: 'Question Block - Giant, Solid',
		description:
			'This is the "main" giant question block meant to be used in levels. It only has two possible payloads, but it fully interacts with enemies.',
	},

	objectSets: encodeObjectSets([
		[11, 11],
		[13, 11],
		[5, 11],
	]),
	spriteGraphicSets: [-1, -1, -1, -1, 1, -1],
	layer: 'stage',
	editorType: 'double-cell',
	dimensions: 'x',
	payloadToObjectId,
	objectId: 0x94,
	param1: 'width',
	width: 2,
	height: 2,

	defaultSettings: { payload: 'Coin' },

	toObjectBinary({ x, y, w, settings }) {
		const payloadToObjectId = this.payloadToObjectId!;
		const payload = settings.payload ?? this.defaultSettings!.payload;
		const objectId =
			payloadToObjectId![payload as keyof typeof payloadToObjectId] ??
			this.objectId;

		return [getBankParam1(1, w), y, x, objectId];
	},

	// TODO: this is an unusual parse
	// parseObject(data, offset) {
	// 	return parseObjectIdMapObject(
	// 		data,
	// 		offset,
	// 		0,
	// 		objectIdToPayload,
	// 		'payload',
	// 		this
	// 	);
	// },

	simpleRender(size) {
		return (
			<div
				className="relative QuestionBlockGiant-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute -bottom-3 left-0 w-full text-center bg-black text-white text-xs">
					solid
				</div>
			</div>
		);
	},

	render({ showDetails, settings, onSettingsChange }) {
		const style = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };
		const spaceStyle = { width: TILE_SIZE * 2, height: TILE_SIZE * 2 };

		const labelStyle = {
			fontSize: 2,
			bottom: 0,
		};

		const body = (
			<div style={style} className="relative QuestionBlockGiant-bg bg-cover">
				<TileSpace style={spaceStyle} className="absolute top-0 left-0" />
				<div
					className="absolute left-0 w-full text-center bg-black text-white"
					style={labelStyle}
				>
					solid
				</div>
				<PayloadViewDetails payload={settings.payload} />
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

	getProblem({ entity }) {
		const tx = entity.x / TILE_SIZE;

		if (tx % 2 === 1) {
			return 'Behaves strangely if not on an even x coordinate';
		}
	},
};

export { QuestionBlockGiantSolid };
