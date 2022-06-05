import 'ignore-styles';
import fs from 'fs';
import path from 'path';
import { entityMap, EntityType } from '../src/entities/entityMap';
import { exec } from 'child_process';
import { toHexString } from '../src/components/hex-tree/HexTreePage/util';

function getBytes(e: EntityType): string | null {
	const entity = entityMap[e];

	if (entity.toObjectBinary) {
		const bytes = entity.toObjectBinary({
			x: 4,
			y: 22,
			w: 1,
			h: 1,
			settings: entity.defaultSettings ?? {},
		});

		return bytes.map(toHexString).join(' ');
	}

	return null;
}

function alreadyDumped(byteS: string): boolean {
	return fs.existsSync(
		path.resolve(
			process.cwd(),
			`./brute/results_getObjectSetBytes_${byteS.replace(/ /g, '_')}`
		)
	);
}

async function redump(e: EntityType): Promise<void> {
	return new Promise((resolve) => {
		const bytes = getBytes(e);

		if (!bytes) {
			console.log('skipping', e);
			resolve();
		} else if (alreadyDumped(bytes)) {
			console.log('already dumped', e);
			resolve();
		} else {
			console.log('dumping', e);
			exec(
				`TS_NODE_FILES=true yarn run-ts-node ./brute/getObjectSetBytes '${bytes}' 0 32`,
				() => {
					console.log('done', e);
					resolve();
				}
			);
		}
	});
}

async function main() {
	let receivedINT = false;

	process.on('SIGINT', () => {
		receivedINT = true;
		console.log('received sigint, will stop when current entity is done');
	});

	const entities = Object.keys(entityMap);

	for (let i = 0; i < entities.length; ++i) {
		const entity = entities[i] as EntityType;

		await redump(entity);

		if (receivedINT) {
			break;
		}
	}
}

main().then(() => {
	console.log('finished');
});
