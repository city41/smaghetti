import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { HexExplorer } from '../../HexExplorer';
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
	section: Section;
	rom: Uint8Array;
	onRomFileChosen: (file: File) => void;
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
	{
		callbackWithStatus: 'level-ready',
		ignoreInput: false,
	},
];

const levelLabels = [];

for (let i = 0; i < 72; ++i) {
	levelLabels.push({
		start: 0x400000 + i * 0x800,
		size: 0x800,
		label: 'compressed level ' + i,
	});
}

const levelNameLabels = [];

for (let i = 0; i < 72; ++i) {
	levelNameLabels.push({
		start: 0x424000 + i * 21,
		size: 21,
		label: 'level name ' + i,
	});
}

const labels = [
	...levelLabels,
	...levelNameLabels,
	{ start: 0x424600, size: 72, label: 'level ace coin total table' },
	{ start: 0x424648, size: 72, label: 'level record id table?' },
	{ start: 0x425040, size: 0x120 * 8, label: 'e-coin tiles' },
	{ start: 0x426b40, size: 0x20 * 8, label: 'e-coin palettes' },
	{ start: 0x424690, size: 9, label: 'playable bits' },
	{ start: 0x4246b0, size: 8, label: 'e-coin record table (confirmed)' },
	{ start: 0x4246b8, size: 24, label: 'e-coin record table (suspected)' },
];

function getAnnotationFor(address: number) {
	const label = labels.find(
		(l) => l.start <= address && l.start + l.size > address
	);

	return label?.label;
}

function WiiUExplorerPage({
	section,
	rom,
	onRomFileChosen,
	onBytesChange,
}: WiiUExplorerPageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [hoverAddress, setHoverAddress] = useState(-1);

	useEffect(() => {
		if (rom.length > 0) {
			setTimeout(() => {
				window._gba.setRom(rom.buffer);
				window._gba.defrost(cloneDeep(getSaveState()!));
				window._gba.injectSaveFile(null, 'mario', SCRIPT);
			}, 100);
		}
	}, [rom]);

	function handleRomFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		onRomFileChosen(file);
	}

	return (
		<div>
			{section.bytes.length === 0 && (
				<div className="w-full h-screen grid place-items-center">
					<div>
						<div>choose a SMA4 VC rom, either the original or patched</div>
						<input
							className={clsx({
								'fixed right-0 top-0': section.bytes.length > 0,
							})}
							type="file"
							style={{ color: 'white !important' }}
							accept=".gba"
							onChange={handleRomFile}
						/>
					</div>
				</div>
			)}
			{rom.length > 0 && (
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
			)}
			{section.bytes.length > 0 && (
				<div
					className="flex flex-col"
					style={{ height: 'calc(100vh - 200px)' }}
				>
					{hoverAddress > -1 && (
						<div className="fixed top-0 left-0 w-full mx-auto my-2 text-center">
							{hoverAddress.toString(16)}: {getAnnotationFor(hoverAddress)}
						</div>
					)}
					<div className="px-16 bg-gray-900 flex-1">
						<HexExplorer
							labels={labels}
							offset={section.offset}
							bytes={section.bytes}
							onFocus={(address) => setHoverAddress(address)}
							onBytesChange={onBytesChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export { WiiUExplorerPage };
export type { Section };
