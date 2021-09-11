import React from 'react';
import { ANY_OBJECT_SET } from '../../../entities/constants';
import { entityMap } from '../../../entities/entityMap';
import { decodeObjectSet } from '../../../entities/util';
import { getRom } from '../../FileLoader/files';

type LevelObjectsPreviewProps = {
	offset: number;
};

const entityDefs = Object.values(entityMap);

function parseObjects(offset: number): NewEditorEntity[] {
	const rom = getRom()!;

	const entities: NewEditorEntity[] = [];

	const objectSet = rom[offset - 9] & 0xf;

	while (offset < rom.length && rom[offset] !== 0xff && entities.length < 5) {
		let parseResult;

		for (let i = 0; i < entityDefs.length && !parseResult; ++i) {
			const entityDef = entityDefs[i];

			if (
				(entityDef.objectSets === ANY_OBJECT_SET ||
					entityDef.objectSets.some(
						(os) => decodeObjectSet(os)[0] === objectSet
					)) &&
				entityDef.parseObject
			) {
				parseResult = entityDef.parseObject(rom, offset);
			}
		}

		if (parseResult) {
			offset = parseResult.offset;
			entities.push(parseResult.entities[0]);
		} else {
			++offset;
		}
	}

	return entities;
}

function LevelObjectsPreview({ offset }: LevelObjectsPreviewProps) {
	// const entities = offset === 0x1408d6 ? parseObjects(offset) : [];
	const entities = parseObjects(offset);

	const entityCmps = entities.map((e, i) => {
		return <div key={i}>{entityMap[e.type].simpleRender(40)}</div>;
	});

	return <div className="flex flex-row gap-x-2">{entityCmps}</div>;
}

export { LevelObjectsPreview };
