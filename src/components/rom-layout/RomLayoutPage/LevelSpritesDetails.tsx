import React from 'react';
import { entityMap } from '../../../entities/entityMap';
import { TILE_SIZE } from '../../../tiles/constants';
import { ROOM_WIDTH_INCREMENT } from '../../editor/constants';
import { getRom } from '../../FileLoader/files';
import { RoomThumbnail } from '../../RoomThumbnail';

type LevelSpritesDetailsProps = {
	offset: number;
};

const entityDefs = Object.values(entityMap);

function parseSprites(offset: number): NewEditorEntity[] {
	const rom = getRom()!;

	const entities: NewEditorEntity[] = [];

	offset++;

	while (rom[offset] !== 0xff) {
		let parseResult;

		for (let i = 0; i < entityDefs.length && !parseResult; ++i) {
			parseResult = entityDefs[i].parseSprite?.(rom, offset);
		}

		if (parseResult) {
			offset = parseResult.offset;
			const newEntity = parseResult.entity;

			if (newEntity) {
				entities.push(parseResult.entity);
			}
		} else {
			++offset;
		}
	}

	return entities;
}

function getDim(
	entities: NewEditorEntity[],
	dim: 'x' | 'y',
	chooser: (a: number, b: number) => number,
	seed: number
): number {
	return entities.reduce<number>((champ, contender) => {
		const td = contender[dim] / TILE_SIZE;
		return chooser(champ, td);
	}, seed);
}

function LevelSpritesDetails({ offset }: LevelSpritesDetailsProps) {
	const entities = parseSprites(offset) as EditorEntity[];

	const topY = getDim(entities, 'y', Math.min, Number.MAX_SAFE_INTEGER);
	const bottomY = getDim(entities, 'y', Math.max, Number.MIN_SAFE_INTEGER);
	const leftX = getDim(entities, 'x', Math.min, Number.MAX_SAFE_INTEGER);
	const rightX = getDim(entities, 'x', Math.max, Number.MIN_SAFE_INTEGER);

	const room: RoomData = {
		roomTileWidth: rightX,
		roomTileHeight: bottomY,
		paletteEntries: [],
		settings: {
			bgColor: 0,
			bgExtraColorAndEffect: 0,
			bgGraphic: 0,
			music: 0,
		},
		actors: {
			entities,
			matrix: [],
		},
		stage: {
			entities: [],
			matrix: [],
		},
	};

	return (
		<RoomThumbnail
			className="bg-gray-600"
			upperLeftTile={{ x: leftX - 1, y: topY - 3 }}
			heightInTiles={bottomY - topY + 6}
			widthInTiles={Math.min(rightX, ROOM_WIDTH_INCREMENT * 3)}
			scale={1}
			room={room}
		/>
	);
}

export { LevelSpritesDetails };
