import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { LevelObject } from '../../../levelData/parseObjectsFromLevelFile';
import { LevelSprite } from '../../../levelData/parseSpritesFromLevelFile';
import { LevelTransport } from '../../../levelData/parseTransportsFromLevelFile';
import { LevelObject as LevelObjectCmp } from './LevelObject';
import { LevelSprite as LevelSpriteCmp } from './LevelSprite';
import { TILE_SIZE } from '../../../tiles/constants';

type RenderLevelPageProps = {
	allFilesReady: boolean;
	objects: LevelObject[];
	sprites: LevelSprite[];
	transports: LevelTransport[];
	onLoadFile: (levelFile: File) => void;
};

function RenderLevelPage({
	allFilesReady,
	objects,
	sprites,
	transports,
	onLoadFile,
}: RenderLevelPageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div>
				<p>
					You will need a *.level file for this tool. level files are the binary
					data for the e-reader levels in SMA4.
				</p>
				<input
					className="block"
					type="file"
					accept=".level"
					onChange={(e) => onLoadFile(e.target.files![0])}
				/>
				<div className="relative">
					{objects.map((o, i) => (
						<LevelObjectCmp key={`object-${i}`} object={o} />
					))}
					{sprites.map((s, i) => (
						<LevelSpriteCmp key={`sprite-${i}`} sprite={s} />
					))}
					{transports.map((t, i) => (
						<div
							key={i}
							className="absolute bg-red-600"
							style={{
								width: TILE_SIZE,
								height: TILE_SIZE,
								// * 2 since this is rendered at 2x, need to move all this into a transport cmp anyway
								top: t.sy * TILE_SIZE * 2,
								left: t.sx * TILE_SIZE * 2,
							}}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export { RenderLevelPage };
