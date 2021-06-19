import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { encodeObjectSets, getBankParam1 } from './util';
import { TILE_SIZE } from '../tiles/constants';
import { ANY_SPRITE_GRAPHIC_SET } from './constants';
import { Resizer } from '../components/Resizer';

import styles from '../components/Resizer/ResizingStyles.module.css';

function getHeight(
	entity: EditorEntity | undefined,
	room: RoomData | undefined,
	width: number
): number {
	if (!entity || !room) {
		return 2;
	}

	const ey = entity.y / TILE_SIZE;
	const ex = entity.x / TILE_SIZE;

	for (let y = ey + 1; y < room.roomTileHeight; ++y) {
		for (let x = ex; x < ex + width; ++x) {
			if (room.stage.matrix[y]?.[x]) {
				return y - ey;
			}
		}
	}

	return room.roomTileHeight - ey;
}

const GrassPlateau: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-large',
		title: 'Grass Plateau',
	},

	objectSets: encodeObjectSets([
		[4, 11],
		[4, 4],
		[12, 11],
		[12, 4],
	]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x5,
	emptyBank: 1,

	resource: {
		palettes: [
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
			[160, 161, 162, 163, 164, 165],
			[176, 177, 178, 179, 180, 181],
			[166, 167, 168, 167, 168, 169],
			[182, 183, 167, 183, 167, 185],
		],
		romOffset: 1584308,
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = settings.width ?? 1;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="GrassPlateau-bg bg-center bg-no-repeat"
				style={{
					width: size,
					height: size,
					backgroundSize: `100% ${(4 / 6) * 100}%`,
				}}
			/>
		);
	},

	render(_showDetails, settings, onSettingsChange, entity, room) {
		const width = settings.width ?? this.defaultSettings!.width;
		const height = getHeight(entity, room, width);

		const style = {
			width: width * TILE_SIZE,
			height: height * TILE_SIZE,
		};

		const leftCornerStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
		};

		const rightCornerStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: -TILE_SIZE * 2,
		};

		const plateauCenterStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: -TILE_SIZE,
		};

		const plateaCenterPieces = [];
		for (let i = 0; i < width - 2; ++i) {
			plateaCenterPieces.push(
				<div style={plateauCenterStyle} className="GrassPlateau-bg" />
			);
		}

		const plateau = (
			<div className="flex flex-row">
				<div className="GrassPlateau-bg" style={leftCornerStyle} />
				{plateaCenterPieces}
				<div className="GrassPlateau-bg" style={rightCornerStyle} />
			</div>
		);

		const leftBodyStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionY: -TILE_SIZE,
		};

		const rightBodyStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: -TILE_SIZE * 2,
			backgroundPositionY: -TILE_SIZE,
		};

		const centerBodyStyle = {
			width: TILE_SIZE,
			height: TILE_SIZE,
			backgroundPositionX: -TILE_SIZE,
			backgroundPositionY: -TILE_SIZE,
		};

		const bodyCenterPieces = [];
		for (let i = 0; i < width - 2; ++i) {
			bodyCenterPieces.push(
				<div style={centerBodyStyle} className="GrassPlateau-bg" />
			);
		}

		const bodyRow = (
			<div className="flex flex-row">
				<div className="GrassPlateau-bg" style={leftBodyStyle} />
				{bodyCenterPieces}
				<div className="GrassPlateau-bg" style={rightBodyStyle} />
			</div>
		);

		const bodyRows = [];
		for (let i = 0; i < height - 1; ++i) {
			bodyRows.push(bodyRow);
		}

		const size = { x: width, y: 1 };

		return (
			<div
				className={clsx('relative', {
					[styles.resizing]: settings?.resizing,
				})}
				style={style}
			>
				{plateau}
				{bodyRows}
				{entity && (
					<Resizer
						className="absolute top-0 right-0"
						style={{ marginRight: '-0.12rem', marginBottom: '-0.12rem' }}
						size={size}
						increment={TILE_SIZE}
						axis="x"
						onSizeChange={(newSizePoint) => {
							onSettingsChange({ width: Math.max(2, newSizePoint.x) });
						}}
						onResizeStart={() => onSettingsChange({ resizing: true })}
						onResizeEnd={() => onSettingsChange({ resizing: false })}
					/>
				)}
			</div>
		);
	},
};

export { GrassPlateau };
