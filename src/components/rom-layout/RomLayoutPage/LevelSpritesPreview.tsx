import React from 'react';
import { entityMap } from '../../../entities/entityMap';
import { getRom } from '../../FileLoader/files';

type LevelSpritesPreviewProps = {
	offset: number;
};

const entityDefs = Object.values(entityMap);

function parseSprites(offset: number): NewEditorEntity[] {
	const rom = getRom()!;

	const entities: NewEditorEntity[] = [];

	offset++;

	while (rom[offset] !== 0xff && entities.length < 5) {
		let parseResult;

		for (let i = 0; i < entityDefs.length && !parseResult; ++i) {
			parseResult = entityDefs[i].parseSprite?.(rom, offset);
		}

		if (parseResult) {
			offset = parseResult.offset;
			entities.push(parseResult.entity);
		} else {
			++offset;
		}
	}

	return entities;
}

function LevelSpritesPreview({ offset }: LevelSpritesPreviewProps) {
	const entities = parseSprites(offset);

	const entityCmps = entities.map((e, i) => {
		return <div key={i}>{entityMap[e.type].simpleRender(40)}</div>;
	});

	return <div className="flex flex-row gap-x-2">{entityCmps}</div>;
}

export { LevelSpritesPreview };
