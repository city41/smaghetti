import React, { useEffect, useState } from 'react';
import { ANY_OBJECT_SET } from '../../../entities/constants';
import { entityMap } from '../../../entities/entityMap';
import { decodeObjectSet } from '../../../entities/util';
import { TILE_SIZE } from '../../../tiles/constants';
import { PLAY_WINDOW_TILE_WIDTH } from '../../editor/constants';
import { getRom } from '../../FileLoader/files';
import { PlainIconButton } from '../../PlainIconButton';
import { RoomThumbnail } from '../../RoomThumbnail';
import { IconSave } from '../../../icons';
import {
	BACKGROUND_GRAPHIC_VALUES,
	IN_GAME_LEVEL_HEADER_SIZE,
	MUSIC_VALUES,
} from '../../../levelData/constants';

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
				parseResult = entityDef.parseObject(rom, offset, true);
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

function toHexByteString(b: number): string {
	const asString = b.toString(16);

	if (asString.length === 1) {
		return '0' + asString;
	}
	return asString;
}

function toHexSlice(bytes: number[], start: number, count: number): string {
	const sl = bytes.slice(start, start + count);
	return sl.map(toHexByteString).join(' ');
}

function findBackground(bg: number): string {
	const entry = Object.entries(BACKGROUND_GRAPHIC_VALUES).find(
		(e) => e[1] === bg
	);

	return entry?.[0] ?? 'unknown';
}

function findMusic(m: number): string {
	const entry = Object.entries(MUSIC_VALUES).find((e) => e[1] === m);

	return entry?.[0] ?? 'unknown';
}

function Header({ bytes }: { bytes: number[] }) {
	return (
		<table>
			<tbody>
				<tr>
					<td colSpan={2}>{toHexSlice(bytes, 0, bytes.length)}</td>
				</tr>
				<tr>
					<td>Level ID Next area (big endian)</td>
					<td>{toHexSlice(bytes, 0, 2)}</td>
				</tr>
				<tr>
					<td>Opponent id of next area (big endian)</td>
					<td>{toHexSlice(bytes, 2, 2)}</td>
				</tr>
				<tr>
					<td>start pos y/map length</td>
					<td>{toHexSlice(bytes, 4, 1)}</td>
				</tr>
				<tr>
					<td>start pos x</td>
					<td>{toHexSlice(bytes, 5, 1)}</td>
				</tr>
				<tr>
					<td>scroll type/object set</td>
					<td>{toHexSlice(bytes, 6, 1)}</td>
				</tr>
				<tr>
					<td>gfx</td>
					<td>{toHexSlice(bytes, 7, 1)}</td>
				</tr>
				<tr>
					<td>object set next area/music</td>
					<td>{toHexSlice(bytes, 8, 1)}</td>
					<td>{findMusic(bytes[8] && 0xf)}</td>
				</tr>
				<tr>
					<td>extra color/extra effect</td>
					<td>{toHexSlice(bytes, 9, 1)}</td>
				</tr>
				<tr>
					<td>background</td>
					<td>{toHexSlice(bytes, 10, 1)}</td>
					<td>{findBackground(bytes[10])}</td>
				</tr>
			</tbody>
		</table>
	);
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

	if (loading) {
		body = <PlainIconButton loading icon={IconSave} label="loading" />;
	} else {
		const rom = getRom()!;

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

		const levelBytes = Array.from(rom.slice(offset, offset + size))
			.map((b) => b.toString(16))
			.join(' ');

		body = (
			<div className="w-full overflow-auto">
				<Header
					bytes={Array.from(
						rom.slice(offset - IN_GAME_LEVEL_HEADER_SIZE, offset)
					)}
				/>
				<div className="my-2 bg-gray-600 text-white">{levelBytes}</div>
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
