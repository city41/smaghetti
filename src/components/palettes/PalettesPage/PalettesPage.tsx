import React, { useEffect, useState } from 'react';
import { ExtractedEntityTileData } from '../../../tiles/extractResource';
import { EntityType } from '../../../entities/entityMap_generated';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { PalettedEntity } from './PalettedEntity';
import { Button } from '../../Button';

type PalettesPageProps = {
	allFilesReady: boolean;
	palettes: Array<Tuple<number, 16>>;
	entities: Array<{ type: EntityType; data: ExtractedEntityTileData }>;
};

function PalettesPage({
	allFilesReady,
	palettes,
	entities,
}: PalettesPageProps) {
	const [curEntityIndex, setCurEntityIndex] = useState(0);
	const curEntity = entities[curEntityIndex];

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div className="flex flex-row space-x-2">
				<div>{curEntity?.type}</div>
				<Button onClick={() => setCurEntityIndex((ci) => Math.max(0, ci - 1))}>
					prev
				</Button>
				<Button
					onClick={() =>
						setCurEntityIndex((ci) => Math.min(entities.length - 1, ci + 1))
					}
				>
					next
				</Button>
			</div>
			<div className="grid grid-flow-row grid-cols-8 gap-x-2 gap-y-2 items-stretch">
				{curEntity &&
					palettes.length &&
					palettes.map((p, i) => {
						return (
							<PalettedEntity key={i} entity={curEntity.data} palette={p} />
						);
					})}
			</div>
		</>
	);
}

export { PalettesPage };
