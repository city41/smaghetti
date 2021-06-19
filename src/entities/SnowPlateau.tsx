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

const SnowPlateau: Entity = {
	paletteCategory: 'terrain',
	paletteInfo: {
		subCategory: 'terrain-winter',
		title: 'Snow Plateau',
	},

	objectSets: encodeObjectSets([[12, 12]]),
	spriteGraphicSets: ANY_SPRITE_GRAPHIC_SET,
	layer: 'stage',
	editorType: 'entity',
	settingsType: 'single',
	defaultSettings: { width: 3 },
	dimensions: 'none',
	param1: 'width',
	objectId: 0x6,
	emptyBank: 1,

	resource: {
		palettes: [
			[
				31744,
				32767,
				0,
				19948,
				24144,
				28371,
				31575,
				500,
				666,
				895,
				27057,
				30390,
				32729,
				26617,
				32317,
				32607,
			],
		],
		tiles: [
			[512, 513, 536, 513, 536, 537],
			[528, 529, 552, 529, 552, 553],
			[528, 529, 552, 529, 552, 553],
			[528, 529, 552, 529, 552, 553],
		],
		romOffset: 1472116,
	},

	toObjectBinary(x, y, _w, _h, settings) {
		const width = settings.width ?? 1;
		return [getBankParam1(1, width - 1), y, x, this.objectId];
	},

	simpleRender(size) {
		return (
			<div
				className="SnowPlateau-bg bg-center bg-no-repeat"
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
				<div style={plateauCenterStyle} className="SnowPlateau-bg" />
			);
		}

		const plateau = (
			<div className="flex flex-row">
				<div className="SnowPlateau-bg" style={leftCornerStyle} />
				{plateaCenterPieces}
				<div className="SnowPlateau-bg" style={rightCornerStyle} />
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
				<div style={centerBodyStyle} className="SnowPlateau-bg" />
			);
		}

		const bodyRow = (
			<div className="flex flex-row">
				<div className="SnowPlateau-bg" style={leftBodyStyle} />
				{bodyCenterPieces}
				<div className="SnowPlateau-bg" style={rightBodyStyle} />
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

export { SnowPlateau };
