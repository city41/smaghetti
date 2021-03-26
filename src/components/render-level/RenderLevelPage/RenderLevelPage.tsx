import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { LevelObject } from '../../../tiles/parseObjectsFromLevelFile';
import { LevelObject as LevelObjectCmp } from './LevelObject';

type RenderLevelPageProps = {
	allFilesReady: boolean;
	objects: LevelObject[];
	onLoadFile: (levelFile: File) => void;
};

function RenderLevelPage({
	allFilesReady,
	objects,
	onLoadFile,
}: RenderLevelPageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div>
				<input
					className="block"
					type="file"
					accept=".level"
					onChange={(e) => onLoadFile(e.target.files![0])}
				/>
				<div className="relative">
					{objects.map((o, i) => (
						<LevelObjectCmp key={i} object={o} />
					))}
				</div>
			</div>
		</>
	);
}

export { RenderLevelPage };
