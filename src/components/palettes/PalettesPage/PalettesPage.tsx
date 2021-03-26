import React, { useState } from 'react';
import { ExtractedEntityTileData } from '../../../tiles/extractResourcesToStylesheet';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { PalettedEntity } from './PalettedEntity';
import { Button } from '../../Button';
import { ObjectType, SpriteType } from '../../../entities/entityMap';

type PalettesPageProps = {
	allFilesReady: boolean;
	palettes: Array<Tuple<number, 16>>;
	entities: Array<{
		type: SpriteType | ObjectType;
		data: ExtractedEntityTileData;
	}>;
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
				<Button
					onClick={() => {
						setCurEntityIndex((ci) => {
							if (ci === 0) {
								return entities.length - 1;
							} else {
								return ci - 1;
							}
						});
					}}
				>
					prev
				</Button>
				<Button
					onClick={() => {
						setCurEntityIndex((ci) => {
							if (ci === entities.length - 1) {
								return 0;
							} else {
								return ci + 1;
							}
						});
					}}
				>
					next
				</Button>
				<select
					className="text-black"
					value={curEntity?.type}
					onChange={(e) =>
						setCurEntityIndex(
							entities.findIndex((ent) => ent.type === e.target.value)
						)
					}
				>
					{entities.map((e) => (
						<option key={e.type} value={e.type}>
							{e.type}
						</option>
					))}
				</select>
				<div>{curEntity?.type}</div>
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
