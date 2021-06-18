import 'ignore-styles';
import * as fs from 'fs';
import * as path from 'path';
import { createCanvas } from 'canvas';
import { entityMap, EntityType } from '../src/entities/entityMap';
import { resourceMap, ResourceType } from '../src/resources/resourceMap';
// @ts-ignore no types
import sha1 from 'js-sha1';
import { isStaticResource } from '../src/resources/util';
import { Resource } from '../src/resources/types';
import { extractResourceToDataUrl } from '../src/tiles/extractResourcesToStylesheet';

type ShaMap = Partial<Record<EntityType | ResourceType, string>>;

function canvasGenerator(width: number, height: number) {
	return createCanvas(width, height);
}

function buildShaMap(rom: Uint8Array): ShaMap {
	const shaMap: ShaMap = {};

	const entityResourceMap = Object.keys(entityMap).reduce<
		Partial<Record<EntityType, Resource>>
	>((building, key) => {
		const entityDef = entityMap[key as EntityType];
		if (entityDef.resource) {
			building[key as EntityType] = entityDef.resource;
		}

		return building;
	}, {});

	const fullResourceMap = {
		...entityResourceMap,
		...resourceMap,
	};

	const keys = Object.keys(fullResourceMap) as Array<EntityType | ResourceType>;

	for (let i = 0; i < keys.length; ++i) {
		const resourceName = keys[i];
		const resource = fullResourceMap[resourceName];

		if (!resource) {
			throw new Error(
				`extractResourcesToStylesheet: failed to get a resource from the passed in record: ${resourceName}`
			);
		}

		let dataUrl;

		if (isStaticResource(resource)) {
			// @ts-ignore canvasGenerator wants an HTMLCanvasElement
			dataUrl = extractResourceToDataUrl(rom, resource, canvasGenerator);
		} else {
			// @ts-ignore canvasGenerator wants an HTMLCanvasElement
			dataUrl = resource.extract(rom, canvasGenerator);
		}

		const sha = sha1(dataUrl);

		shaMap[resourceName] = sha;
	}

	return shaMap;
}

function writeShaMap(shaMap: ShaMap, outPath: string) {
	const src = `export const resourceShaMap: Record<string, string> = ${JSON.stringify(
		shaMap,
		null,
		2
	)};`;

	const shaMapPath = path.resolve(process.cwd(), outPath);
	fs.writeFileSync(shaMapPath, src);
}

async function main() {
	const romPath = process.argv[2];
	const outPath = process.argv[3];

	if (!romPath || !outPath) {
		console.error('usage: node generateResourceShas <path-to-sma4-rom>');
		process.exit(1);
	}

	const rom = new Uint8Array(
		fs.readFileSync(path.resolve(process.cwd(), romPath))
	);

	const shaMap = await buildShaMap(rom);

	writeShaMap(shaMap, outPath);
	console.log('resource sha map built');
}

main();
