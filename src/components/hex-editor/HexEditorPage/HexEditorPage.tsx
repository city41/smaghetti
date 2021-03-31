import React, { useEffect, useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { GBAPlayer } from '../../LevelPlayer/GBAPlayer';
import { HexEditor } from './HexEditor';
import {
	getBios,
	getEmptySave,
	getRom,
	getSaveState,
} from '../../FileLoader/files';

type HexEditorPageProps = {
	allFilesReady: boolean;
};

function HexEditorPage({ allFilesReady }: HexEditorPageProps) {
	const [injectCount, setInjectCount] = useState(0);
	const [levelData, setLevelData] = useState<Uint8Array | null>(null);
	const [editState, setEditState] = useState<'editing' | 'running'>('editing');

	function handleLevelFile(e: React.ChangeEvent<HTMLInputElement>) {
		const reader = new FileReader();

		reader.onloadend = (ole) => {
			setLevelData(new Uint8Array(ole.target!.result as ArrayBuffer));
		};

		reader.readAsArrayBuffer(e.target.files![0]);
	}

	function handleClick() {
		setEditState((e) => (e === 'editing' ? 'running' : 'editing'));
	}

	function handleInject() {
		// forcing a rerender should cause an injection to happen
		setInjectCount((c) => c + 1);
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div className="h-screen overflow-hidden">
				<div className="bg-white shadow-lg w-full">
					<label>
						level file
						<input type="file" accept=".level" onChange={handleLevelFile} />
					</label>
					<button className="bg-blue-100 px-2 py-1" onClick={handleClick}>
						{editState}
					</button>
					<button className="bg-blue-100 px-2 py-1" onClick={handleInject}>
						inject
					</button>
				</div>
				{allFilesReady && levelData && (
					<GBAPlayer
						className="inline-block"
						romFile={getRom()!}
						biosFile={getBios()!}
						emptySaveFile={getEmptySave()!}
						saveState={getSaveState()!}
						levelData={levelData}
						isPlaying={editState === 'running'}
						scale={1}
					/>
				)}
				<div
					className="overflow-y-auto"
					style={{ height: 'calc(100% - 200px)' }}
				>
					<HexEditor data={levelData} />
				</div>
			</div>
		</>
	);
}

export { HexEditorPage };
