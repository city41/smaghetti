import React, { useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { GBAPlayer } from '../../LevelPlayer/GBAPlayer';
import {
	getBios,
	getEmptySave,
	getRom,
	getSaveState,
} from '../../FileLoader/files';
import { Button } from '../../Button';
import { HexTree } from './HexTree';
import { injectLevelIntoSave } from '../../../levelData/injectLevelIntoSave';
import { sendFileToAnchorTag } from '../../../levelData/downloadLevelAsSaveFile';
import { Exclusion, LevelTree } from '../types';
import clsx from 'clsx';
import tabStyles from '../../../styles/tabs.module.css';
import { RenderLevel } from './RenderLevel';

type HexTreePageProps = {
	allFilesReady: boolean;
	onLevelChosen: (file: File) => void;
	onStartEmpty: () => void;
	onExcludeChange: (exclusion: Exclusion) => void;
	tree: LevelTree | null;
	data: Uint8Array;
};

const tabs = ['Outline', 'Hex', 'Snapshots'];

function HexTreePage({
	allFilesReady,
	onLevelChosen,
	onStartEmpty,
	onExcludeChange,
	tree,
	data,
}: HexTreePageProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [focusedEntity, setFocusedEntity] = useState<any>(null);
	const [editState, setEditState] = useState<'editing' | 'running'>('editing');
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	function handleRunningEditToggle() {
		setEditState((e) => (e === 'editing' ? 'running' : 'editing'));
	}

	function handleLevelFile(e: React.ChangeEvent<HTMLInputElement>) {
		onLevelChosen(e.target.files![0]);
	}

	function handleDownloadSave() {
		if (data.length) {
			const saveFile = injectLevelIntoSave(getEmptySave()!, data);
			sendFileToAnchorTag(saveFile, 'hex-tree.sav');
		}
	}

	let tabBody = null;

	switch (tabs[currentTabIndex]) {
		case 'Outline':
			tabBody = (
				<>
					{tree && (
						<HexTree
							tree={tree}
							onExcludeChange={onExcludeChange}
							focusedEntity={focusedEntity}
							onEntityFocus={(e) => setFocusedEntity(e)}
						/>
					)}
				</>
			);
			break;
		case 'Hex':
			tabBody = <>hex editor goes here</>;
			break;
		case 'Snapshots':
			tabBody = <>snapshots go here</>;
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div
				className="h-screen overflow-hidden grid"
				style={{ gridTemplateRows: 'min-content max-content min-content 1fr' }}
			>
				<div className="bg-white shadow-lg w-full space-x-2 p-1">
					<label className="text-black">
						level file
						<input type="file" accept=".level" onChange={handleLevelFile} />
					</label>

					<Button onClick={onStartEmpty}>start empty</Button>
				</div>
				{allFilesReady && data.length > 0 && (
					<div className="grid grid-cols-2">
						<div className="flex flex-row items-center space-x-2">
							<GBAPlayer
								className="inline-block"
								romFile={getRom()!}
								biosFile={getBios()!}
								emptySaveFile={getEmptySave()!}
								saveState={getSaveState()!}
								levelData={data}
								isPlaying={editState === 'running'}
								scale={1}
							/>
							<Button onClick={handleRunningEditToggle}>
								{editState === 'editing' ? 'paused' : 'running'}
							</Button>
							<Button onClick={handleDownloadSave}>download save</Button>
						</div>
						{tree && (
							<RenderLevel
								rooms={tree.rooms}
								focusedEntity={focusedEntity}
								onEntityFocus={(e) => setFocusedEntity(e)}
							/>
						)}
					</div>
				)}
				<ul className={clsx(tabStyles.tabs)}>
					{tabs.map((t, i) => {
						return (
							<li
								key={t}
								className={clsx({
									[tabStyles.currentTab]: currentTabIndex === i,
								})}
								onClick={() => setCurrentTabIndex(i)}
							>
								{t}
							</li>
						);
					})}
				</ul>
				<div className="overflow-auto">{tabBody}</div>
			</div>
		</>
	);
}

export { HexTreePage };
