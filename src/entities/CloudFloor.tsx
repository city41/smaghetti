import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import React from 'react';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { TileSpace } from './TileSpace';

function isCloudFloorBelow(
	entity: EditorEntity | undefined,
	room: RoomData | undefined
): boolean {
	if (!entity || !room) {
		return false;
	}

	const cellBelow = room.stage.matrix[entity.y + 1]?.[entity.x];

	if (!cellBelow) {
		return false;
	}

	return cellBelow.type === 'CloudFloor';
}

const CloudFloor: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-sky',
		title: 'Cloud Floor',
	},

	objectSets: encodeObjectSets([[13, 13]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'cell',
	settingsType: 'single',
	dimensions: 'x',
	objectId: 0x2d,
	param2: 'width',
	emptyBank: 1,

	resources: {
		CloudFloorTop: {
			palettes: [
				[
					31744,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					29484,
					32722,
					32763,
					21938,
					26166,
					30362,
					32541,
					0,
					0,
				],
				[
					31744,
					0,
					32767,
					24035,
					31400,
					5278,
					607,
					9055,
					8973,
					0,
					0,
					0,
					25535,
					0,
					0,
					0,
				],
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					10793,
					15021,
					18225,
					22452,
					8663,
					14971,
				],
			],
			tiles: [
				[
					{
						romOffset: 1253344,
						tileIndex: 255,
						palette: 1,
					},
					{
						romOffset: 1253344,
						tileIndex: 255,
						palette: 1,
					},
				],
				[
					526,
					{
						tileIndex: 527,
						palette: 2,
					},
				],
			],
			romOffset: 1501760,
		},
		CloudFloorBottom: {
			palettes: [
				[
					31744,
					32767,
					0,
					14798,
					19026,
					25368,
					30653,
					29484,
					32722,
					32763,
					21938,
					26166,
					30362,
					32541,
					0,
					0,
				],
				[
					31744,
					32767,
					0,
					26019,
					31371,
					32622,
					32726,
					5524,
					11833,
					17085,
					10793,
					15021,
					18225,
					22452,
					8663,
					14971,
				],
			],
			tiles: [
				[
					568,
					{
						tileIndex: 551,
						palette: 1,
					},
				],
				[534, 535],
			],
			romOffset: 1501760,
		},
	},

	toObjectBinary({ x, y, w }) {
		return [getBankParam1(1, 1), y, x, this.objectId, w];
	},

	simpleRender(size) {
		const cellStyle = { width: size, height: size };
		return (
			<div className="relative" style={cellStyle}>
				<div
					className="CloudFloorTop-bg absolute left-0 bg-cover"
					style={{ ...cellStyle, top: -size }}
				/>
				<div
					className="CloudFloorBottom-bg absolute top-0 left-0 bg-cover"
					style={cellStyle}
				/>
			</div>
		);
	},

	render() {
		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div style={style} className="relative">
				<div
					style={style}
					className="CloudFloorTop-bg absolute top-0 left-0 bg-cover"
				/>
				<div
					style={{ ...style, top: TILE_SIZE }}
					className="CloudFloorBottom-bg absolute left-0 bg-cover"
				/>
				<TileSpace style={style} className="absolute top-0 left-0" />
			</div>
		);
	},

	getProblem({ room, entity }) {
		if (isCloudFloorBelow(entity, room)) {
			return 'Gets corrupted when a cloud floor is directly below';
		}
	},
};

export { CloudFloor };
