import React, { useEffect, useState } from 'react';
import { AiFillSave } from 'react-icons/ai';
import { ANY_OBJECT_SET } from '../../../entities/constants';
import { entityMap } from '../../../entities/entityMap';
import { decodeObjectSet } from '../../../entities/util';
import { getRom } from '../../FileLoader/files';
import { PlainIconButton } from '../../PlainIconButton';

type LevelObjectsPreviewProps = {
	offset: number;
	size: number;
};

const entityDefs = Object.values(entityMap);

function memoize(method: Function) {
	let cache: Record<string, any> = {};

	return async function (...args: any[]) {
		let argString = JSON.stringify(args);
		cache[argString] = cache[argString] || method.apply(undefined, args);
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
	while (offset < end && rom[offset] !== 0xff && entities.length < 5) {
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
			entities.push(parseResult.entities[0]);
		} else {
			const fourResult = await parseObjects(offset + 4, end);
			const fiveResult = await parseObjects(offset + 5, end);

			if (fourResult.length > fiveResult.length) {
				offset += 4;
			} else {
				offset += 5;
			}
		}
	}

	return entities;
});

function LevelObjectsPreview({ offset, size }: LevelObjectsPreviewProps) {
	const [loading, setLoading] = useState(true);
	const [entities, setEntities] = useState<NewEditorEntity[]>([]);

	useEffect(() => {
		parseObjects(offset, offset + size).then((parsedEntities) => {
			setEntities(parsedEntities);
			setLoading(false);
		});
	}, []);

	let body;

	if (loading) {
		body = <PlainIconButton loading icon={AiFillSave} label="loading" />;
	} else {
		body = entities.map((e, i) => {
			return <div key={i}>{entityMap[e.type].simpleRender(40)}</div>;
		});
	}

	return <div className="flex flex-row gap-x-2">{body}</div>;
}

export { LevelObjectsPreview };
