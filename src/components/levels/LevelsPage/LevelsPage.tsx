import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Root } from '../../layout/Root';
import { LoadingBar } from '../../LoadingBar';
import { LevelRow } from './LevelRow';

type InternalLevelsPageProps = {
	allFilesReady: boolean;
	loadState: 'dormant' | 'loading' | 'success' | 'error';
	levels: Level[];
};

function LevelsPage({
	allFilesReady,
	loadState,
	levels,
}: InternalLevelsPageProps) {
	let body = null;

	switch (loadState) {
		case 'dormant':
		case 'loading':
			body = <LoadingBar percent={100} />;
			break;
		case 'error':
			body = (
				<div className="bg-red-200 text-black p-2">
					Hmmm, levels failed to load. Try refreshing the browser.
				</div>
			);
			break;
		case 'success':
			if (levels.length > 0) {
				body = (
					<div className="space-y-8">
						{levels.map((l) => (
							<LevelRow key={l.id} level={l} />
						))}
					</div>
				);
			} else {
				body = (
					<div className="text-center mt-32">
						No published levels yet, why not{' '}
						<a className="text-blue-300 hover:underline" href="/make">
							be the first?
						</a>
					</div>
				);
			}
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Levels" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<h1 className="font-bold text-5xl text-center mb-8">
						Community made levels
					</h1>
					<p className="mt-4 mb-8 px-8 text-sm text-gray-400">
						Want your level to show up here? Click on the &quot;publish&quot;
						button when looking at all your levels in the editor.
					</p>
					{body}
				</div>
			</Root>
		</>
	);
}

export { LevelsPage };
