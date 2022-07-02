import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { HexExplorer } from '../../HexExplorer';
import tabStyles from '../../../styles/tabs.module.css';
import { getBios, getEmptySave, getSaveState } from '../../FileLoader/files';
import { cloneDeep } from 'lodash';
import { GBAPlayer } from '../../LevelPlayer/GBAPlayer';

type OnBytesChangeProps = {
	address: number;
	bytes: number[];
};

type Section = {
	offset: number;
	bytes: number[];
};

type WiiUExplorerPageProps = {
	sections: Section[];
	rom: Uint8Array;
	onBytesChange?: (props: OnBytesChangeProps) => void;
};

const A_BUTTON = 0;
const RIGHT_BUTTON = 4;

const SCRIPT = [
	{
		// file menu, with Level Card highlighted
		// choose to go into level menu
		description: 'A to go into e-reader world',
		frameDelay: 1,
		input: A_BUTTON,
	},
	{
		// e-reader world
		description: 'first right in e-reader world',
		frameDelay: 90,
		input: RIGHT_BUTTON,
	},
	{
		// e-reader world
		description: 'second right in e-reader world',
		frameDelay: 16,
		input: RIGHT_BUTTON,
	},
	{
		// e-reader world
		// choose to go into level menu
		description: 'A to go into level menu',
		frameDelay: 16,
		input: A_BUTTON,
	},
];

function WiiUExplorerPage({
	sections,
	rom,
	onBytesChange,
}: WiiUExplorerPageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			window._gba.setRom(rom.buffer);
			window._gba.defrost(cloneDeep(getSaveState()!));
			window._gba.injectSaveFile(null, 'mario', SCRIPT);
		}, 100);
	}, [rom]);

	const tabBody = (
		<HexExplorer
			bytes={sections[currentTabIndex].bytes}
			onBytesChange={({ address, bytes }) => {
				onBytesChange?.({
					address: address + sections[currentTabIndex].offset,
					bytes,
				});
			}}
		/>
	);

	return (
		<div>
			<GBAPlayer
				romFile={rom}
				levelData={null}
				ecoinInfo={null}
				biosFile={getBios()!}
				emptySaveFile={getEmptySave()!}
				saveState={getSaveState()!}
				isPlaying={false}
				playAs="mario"
				scale={1}
				canvasRef={canvasRef}
				neverShowCrashScreen
			/>
			<ul className={clsx(tabStyles.tabs, 'mx-16 mt-16')}>
				{sections.map((s, i) => {
					return (
						<li
							key={s.offset}
							className={clsx({
								[tabStyles.currentTab]: currentTabIndex === i,
							})}
							onClick={() => setCurrentTabIndex(i)}
						>
							{s.offset.toString(16)}-{(s.offset + s.bytes.length).toString(16)}
						</li>
					);
				})}
			</ul>
			<div className="relative overflow-auto px-16 xpt-4 xborder-t-4 bg-gray-900">
				{tabBody}
			</div>
		</div>
	);
}

export { WiiUExplorerPage };
export type { Section };
