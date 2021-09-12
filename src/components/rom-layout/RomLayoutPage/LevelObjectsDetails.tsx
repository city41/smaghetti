import React, { useEffect, useState } from 'react';
import { AiFillSave } from 'react-icons/ai';
import { ANY_OBJECT_SET } from '../../../entities/constants';
import { entityMap } from '../../../entities/entityMap';
import { decodeObjectSet } from '../../../entities/util';
import { TILE_SIZE } from '../../../tiles/constants';
import { PLAY_WINDOW_TILE_WIDTH } from '../../editor/constants';
import { getRom } from '../../FileLoader/files';
import { PlainIconButton } from '../../PlainIconButton';
import { RoomThumbnail } from '../../RoomThumbnail';

type LevelObjectsDetailsProps = {
	offset: number;
	size: number;
};

const entityDefs = Object.values(entityMap);

function memoize(
	method: (start: number, end: number) => Promise<NewEditorEntity[]>
) {
	const cache: Record<string, Promise<NewEditorEntity[]>> = {};

	return async function (...args: [number, number]) {
		const argString = JSON.stringify(args);
		cache[argString] = cache[argString] || method(...args);
		return cache[argString];
	};
}

function wait(millis: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

const parseObjects = memoize(async function _parseObjects(
	start: number,
	end: number
): Promise<NewEditorEntity[]> {
	await wait(2);
	const rom = getRom()!;

	const entities: NewEditorEntity[] = [];

	const objectSet = rom[start - 9] & 0xf;

	let offset = start;
	while (offset < end && rom[offset] !== 0xff) {
		let parseResult;

		for (let i = 0; i < entityDefs.length && !parseResult; ++i) {
			const entityDef = entityDefs[i];

			if (
				entityDef.parseObject &&
				(entityDef.objectSets === ANY_OBJECT_SET ||
					entityDef.objectSets.some(
						(os) => decodeObjectSet(os)[0] === objectSet
					))
			) {
				parseResult = entityDef.parseObject(rom, offset);
			}
		}

		if (parseResult) {
			offset = parseResult.offset;
			entities.push(...parseResult.entities);
		} else {
			offset += 4;

			if (rom[offset + 1] === 0 || rom[offset + 1] >= 0x40) {
				++offset;
			}
			// const fourResult = await parseObjects(offset + 4, end);
			// const fiveResult = await parseObjects(offset + 5, end);

			// if (fourResult.length > fiveResult.length) {
			// 	offset += 4;
			// } else {
			// 	offset += 5;
			// }
		}
	}

	return entities;
});

function getDim(
	entities: NewEditorEntity[],
	dim: 'x' | 'y',
	chooser: (a: number, b: number) => number,
	seed: number
): number {
	return entities.reduce<number>((champ, contender) => {
		const divisor =
			entityMap[contender.type].editorType === 'cell' ? 1 : TILE_SIZE;
		const td = contender[dim] / divisor;
		return chooser(champ, td);
	}, seed);
}

function buildMatrix(entities: NewEditorEntity[]): EditorEntityMatrix {
	const matrix: EditorEntityMatrix = [];

	entities.forEach((e) => {
		if (entityMap[e.type].editorType === 'cell') {
			const row = (matrix[e.y] = matrix[e.y] ?? []);
			row[e.x] = e as EditorEntity;
		}
	});

	return matrix;
}

function LevelObjectsDetails({ offset, size }: LevelObjectsDetailsProps) {
	const [loading, setLoading] = useState(true);
	const [entities, setEntities] = useState<EditorEntity[]>([]);

	useEffect(() => {
		parseObjects(offset, offset + size).then((parsedEntities) => {
			setEntities(parsedEntities as EditorEntity[]);
			setLoading(false);
		});
	}, []);

	let body;

	const rom = getRom()!;

	if (loading) {
		body = <PlainIconButton loading icon={AiFillSave} label="loading" />;
	} else {
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
				bgGraphic: rom[offset - 5],
				music: 0,
			},
			actors: {
				entities: [],
				matrix: [],
			},
			stage: {
				entities: entities.filter(
					(e) => entityMap[e.type].editorType === 'entity'
				),
				matrix: buildMatrix(entities),
			},
		};

		body = (
			<div className="w-full overflow-auto">
				<RoomThumbnail
					className="bg-gray-600"
					upperLeftTile={{ x: leftX, y: topY }}
					heightInTiles={bottomY}
					widthInTiles={Math.min(rightX, PLAY_WINDOW_TILE_WIDTH * 5)}
					scale={1}
					room={room}
					showEntireEntityRender
				/>
			</div>
		);
	}

	return <div className="flex flex-row gap-x-2">{body}</div>;
}

export { LevelObjectsDetails };
