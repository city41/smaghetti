import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';

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
import { Add, Exclusion, LevelTree, Patch } from '../types';
import clsx from 'clsx';
import tabStyles from '../../../styles/tabs.module.css';
import { RenderLevel } from './RenderLevel';
import { HexEditor } from './HexEditor';
import { PlainIconButton } from '../../PlainIconButton';

type HexTreePageProps = {
	allFilesReady: boolean;
	onLevelChosen: (file: File) => void;
	onStartEmpty: () => void;
	onStartFromLocalStorage: () => void;
	onExcludeChange: (exclusion: Exclusion) => void;
	onPatch: (patch: Patch) => void;
	onAdd: (add: Add) => void;
	tree: LevelTree | null;
	data: Uint8Array;
	originalData: Uint8Array;
	onFourBytes: (id: number) => void;
	onFiveBytes: (id: number) => void;
	fourByteIds: number[];
	fiveByteIds: number[];
};

const tabs = ['Outline', 'Hex (current)', 'Hex (original)'];

function HexTreePage({
	allFilesReady,
	onLevelChosen,
	onStartEmpty,
	onStartFromLocalStorage,
	onExcludeChange,
	onPatch,
	onAdd,
	tree,
	data,
	originalData,
	onFourBytes,
	onFiveBytes,
	fourByteIds,
	fiveByteIds,
}: HexTreePageProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [focusedEntity, setFocusedEntity] = useState<any>(null);
	const [editState, setEditState] = useState<'editing' | 'running'>('editing');
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	function handleRunningEditToggle() {
		setEditState((e) => (e === 'editing' ? 'running' : 'editing'));
	}

	function handleLevelFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		onLevelChosen(file);
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
							onPatch={onPatch}
							onAdd={onAdd}
							onFourBytes={onFourBytes}
							onFiveBytes={onFiveBytes}
							fourByteIds={fourByteIds}
							fiveByteIds={fiveByteIds}
						/>
					)}
				</>
			);
			break;
		case 'Hex (current)':
			tabBody = <HexEditor data={data} />;
			break;
		case 'Hex (original)':
			tabBody = <HexEditor data={originalData} />;
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div
				className="h-screen overflow-hidden grid"
				style={{ gridTemplateRows: 'min-content max-content min-content 1fr' }}
			>
				<div className="bg-gray-900 text-white shadow-lg w-full space-x-2 p-2">
					<input type="file" accept=".level" onChange={handleLevelFile} />
					<Button onClick={onStartEmpty}>start empty</Button>
					<Button onClick={onStartFromLocalStorage}>
						start from localstorage
					</Button>
					<Button onClick={handleDownloadSave}>Download</Button>
				</div>
				{allFilesReady && data.length > 0 && (
					<div
						className="grid gap-x-16 mx-16 mt-8"
						style={{ gridTemplateColumns: 'max-content 1fr' }}
					>
						<div className="flex flex-row items-center space-x-1 relative p-4 pr-12">
							<GBAPlayer
								className="inline-block"
								romFile={getRom()!}
								biosFile={getBios()!}
								emptySaveFile={getEmptySave()!}
								saveState={getSaveState()!}
								levelData={data}
								isPlaying={editState === 'running'}
								scale={1.5}
							/>
							<PlainIconButton
								className="absolute -left-12 -bottom-2 w-8 h-8 grid place-items-center"
								label={editState === 'editing' ? 'paused' : 'running'}
								icon={editState === 'editing' ? FaPlay : VscDebugRestart}
								onClick={handleRunningEditToggle}
							/>
						</div>
						<RenderLevel
							rooms={tree?.rooms ?? []}
							focusedEntity={focusedEntity}
							onEntityFocus={(e) => setFocusedEntity(e)}
						/>
					</div>
				)}
				<ul className={clsx(tabStyles.tabs, 'mx-16 mt-16')}>
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
				<div className="overflow-auto px-16 xpt-4 xborder-t-4 bg-gray-900">
					{tabBody}
				</div>
			</div>
		</>
	);
}

export { HexTreePage };
