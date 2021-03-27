import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { LevelObject } from '../../../levelData/parseObjectsFromLevelFile';
import { LevelSprite } from '../../../levelData/parseSpritesFromLevelFile';
import { LevelObject as LevelObjectCmp } from './LevelObject';
import { LevelSprite as LevelSpriteCmp } from './LevelSprite';

type RenderLevelPageProps = {
	allFilesReady: boolean;
	objects: LevelObject[];
	sprites: LevelSprite[];
	onLoadFile: (levelFile: File) => void;
};

function RenderLevelPage({
	allFilesReady,
	objects,
	sprites,
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
				</div>
			</div>
		</>
	);
}

export { RenderLevelPage };
