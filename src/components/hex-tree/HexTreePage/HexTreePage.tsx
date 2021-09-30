import React, { useEffect, useRef, useState } from 'react';
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
import { sendBlobToAnchorTag } from '../../../levelData/downloadLevelAsSaveFile';
import {
	Add,
	ByteSizes,
	ExcludeAfter,
	Exclusion,
	LevelTree,
	Patch,
} from '../types';
import clsx from 'clsx';
import tabStyles from '../../../styles/tabs.module.css';
import { RenderLevel } from './RenderLevel';
import { HexEditor } from './HexEditor';
import { ECoin } from './ECoin';
import { PlainIconButton } from '../../PlainIconButton';
import cloneDeep from 'lodash/cloneDeep';
import { InGameLevel, inGameLevels } from '../inGameLevels';

function getInGameLevelName(igl: InGameLevel): string {
	if (igl.name) {
		return igl.name;
	}

	if (igl.sprites) {
		return `0x${igl.sprites.toString(16)}`;
	}

	if (igl.root) {
		return `0x${igl.root.toString(16)}`;
	}

	return '???';
}

type HexTreePageProps = {
	allFilesReady: boolean;
	mode: 'rom' | 'e-reader';
	levelName: string | null;
	onLevelChosen: (file: File) => void;
	onStartEmpty: () => void;
	onReset: () => void;
	onStartFromLocalStorage: () => void;
	onInGameLevelChosen: (level: InGameLevel) => void;
	onExcludeChange: (exclusion: Exclusion) => void;
	onExcludeAfter: (arg: ExcludeAfter) => void;
	onPatch: (patch: Patch) => void;
	onAdd: (add: Add) => void;
	tree: LevelTree | null;
	data: Uint8Array;
	originalData: Uint8Array;
	onFourBytes: (arg: { type: 'sprite' | 'object'; id: number }) => void;
	onFiveBytes: (arg: { type: 'sprite' | 'object'; id: number }) => void;
	byteSizes: ByteSizes;
};

function HexTreePage({
	allFilesReady,
	mode,
	levelName,
	onLevelChosen,
	onStartEmpty,
	onReset,
	onStartFromLocalStorage,
	onInGameLevelChosen,
	onExcludeChange,
	onExcludeAfter,
	onPatch,
	onAdd,
	tree,
	data,
	originalData,
	onFourBytes,
	onFiveBytes,
	byteSizes,
}: HexTreePageProps) {
	const tabs =
		mode === 'e-reader'
			? ['Outline', 'Hex (current)', 'Hex (original)', 'e-coin']
			: ['Outline'];

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [focusedEntity, setFocusedEntity] = useState<any>(null);
	const [immediateMode, setImmediateMode] = useState(false);
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
			const fileBlob = new Blob([saveFile.buffer], {
				type: 'application/octet-stream',
			});
			sendBlobToAnchorTag(fileBlob, 'hex-tree.sav');
		}
	}

	let tabBody = null;

	useEffect(() => {
		if (immediateMode) {
			setTimeout(() => {
				window._gba.setRom(getRom()!.buffer);
				window._gba.defrost(cloneDeep(getSaveState()!));
				window._gba.setSavedata(getEmptySave()!.buffer);
				window._gba.runStable();
			}, 10);
		}
	}, [immediateMode, data]);

	switch (tabs[currentTabIndex]) {
		case 'Outline':
			tabBody = (
				<>
					{tree && (
						<HexTree
							tree={tree}
							onExcludeChange={onExcludeChange}
							onExcludeAfter={onExcludeAfter}
							focusedEntity={focusedEntity}
							onEntityFocus={(e) => setFocusedEntity(e)}
							onPatch={onPatch}
							onAdd={onAdd}
							onFourBytes={onFourBytes}
							onFiveBytes={onFiveBytes}
							byteSizes={byteSizes}
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
		case 'e-coin':
			tabBody = <ECoin data={originalData} />;
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div
				className="h-screen overflow-hidden grid"
				style={{ gridTemplateRows: 'min-content max-content min-content 1fr' }}
			>
				<div className="bg-gray-900 text-white shadow-lg w-full flex flex-row items-center space-x-2 p-2">
					<input
						type="file"
						style={{ color: 'white !important' }}
						accept=".level"
						onChange={handleLevelFile}
					/>
					<Button onClick={onStartEmpty}>start empty</Button>
					<Button onClick={onStartFromLocalStorage}>
						start from localstorage
					</Button>
					<div className="mx-2 flex flex-row gap-x-2">
						<span>or, in game level:</span>
						<select
							className="text-black"
							onChange={(e) => {
								const val = Number(e.target.value);
								if (val >= 0) {
									onInGameLevelChosen(inGameLevels[val]);
								}
							}}
						>
							<option value={-1}>-</option>
							{inGameLevels.map((igl, i) => (
								<option key={`${getInGameLevelName(igl)}-${i}`} value={i}>
									{getInGameLevelName(igl)}
								</option>
							))}
						</select>
					</div>
					<Button onClick={onReset}>reset</Button>
					<Button onClick={handleDownloadSave}>Download</Button>
					<div className="flex-1 text-white text-right pr-2">{levelName}</div>
				</div>
				{allFilesReady && data.length > 0 && (
					<div
						className="grid gap-x-16 mx-16 mt-8"
						style={{ gridTemplateColumns: 'max-content 1fr' }}
					>
						<div className="flex flex-row items-center space-x-1 relative p-4 pr-12">
							{mode === 'e-reader' ? (
								<>
									<GBAPlayer
										className="inline-block"
										romFile={getRom()!}
										biosFile={getBios()!}
										emptySaveFile={getEmptySave()!}
										saveState={getSaveState()!}
										levelData={data}
										isPlaying={editState === 'running' || immediateMode}
										scale={1.5}
										canvasRef={canvasRef}
									/>
									<PlainIconButton
										className="absolute -left-12 -bottom-2 w-8 h-8 grid place-items-center"
										label={editState === 'editing' ? 'paused' : 'running'}
										icon={editState === 'editing' ? FaPlay : VscDebugRestart}
										onClick={handleRunningEditToggle}
										disabled={immediateMode}
									/>
									<div className="absolute left-0 -bottom-2 xw-32 h-8 flex flex-row items-center space-x-2">
										<input
											id="immediate-mode-input"
											type="checkbox"
											checked={immediateMode}
											onChange={() => setImmediateMode((im) => !im)}
										/>
										<div className="flex flex-col">
											<label
												htmlFor="immediate-mode-input"
												className="cursor-pointer"
											>
												immediate mode
											</label>
											<div className="text-xs text-gray-400">
												emulator resets whenever level changes
											</div>
										</div>
									</div>
								</>
							) : (
								<div>gba not available for in game levels ... yet</div>
							)}
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
