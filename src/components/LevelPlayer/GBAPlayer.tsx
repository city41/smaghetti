import React, { CSSProperties, RefObject, useEffect, useState } from 'react';
import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';

import { injectLevelIntoSave } from '../../levelData/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';
import { ECoinInfo } from '../../levelData/typesAndConstants';
import { overwriteLevel1_1 } from '../../levelData/overwrite1_1';

type GBAPlayerProps = {
	className?: string;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	saveState: Record<string, unknown>;
	levelData: Uint8Array | null;
	ecoinInfo: ECoinInfo | null;
	isPlaying: boolean;
	playAs: PlayAsCharacter;
	scale?: number;
	canvasRef: RefObject<HTMLCanvasElement>;
	neverShowCrashScreen?: boolean;
};

function GBAPlayer({
	className,
	biosFile,
	romFile,
	emptySaveFile,
	saveState,
	levelData,
	ecoinInfo,
	isPlaying,
	playAs,
	scale = 3,
	canvasRef,
	neverShowCrashScreen,
}: GBAPlayerProps) {
	const [gbaStatus, setGbaStatus] = useState<GBAStatus>('reset');
	const [hasCrashed, setHasCrashed] = useState(false);

	useEffect(() => {
		window._gba.setCanvas(canvasRef.current!);
		window._gba.setBios(biosFile.buffer);

		window._gba.statusCallback = (status) => {
			setGbaStatus(status);

			if (status === 'ready-to-inject') {
				if (levelData) {
					const saveFileWithInjectedLevel = injectLevelIntoSave(
						emptySaveFile,
						levelData,
						ecoinInfo
					);
					window._gba.injectSaveFile(saveFileWithInjectedLevel.buffer, playAs);
				}
			}

			if (status === 'crashed') {
				setHasCrashed(true);
			}
		};

		return () => {
			window._gba.statusCallback = undefined;
		};
	}, [levelData, playAs]);

	useEffect(() => {
		if (isPlaying) {
			canvasRef.current!.getContext('2d')!.imageSmoothingEnabled = false;

			// @ts-ignore
			if (window.overwrite1_1 && levelData) {
				romFile = overwriteLevel1_1(romFile, levelData);
			}

			window._gba.setRom(romFile.buffer);
			window._gba.defrost(cloneDeep(saveState));
			window._gba.runStable();
		} else {
			setHasCrashed(false);
			window._gba.pause();
		}
		// @ts-ignore
	}, [isPlaying, window.overwrite1_1 && levelData]);

	return (
		<div
			className={clsx(className, styles.root, 'relative')}
			style={{ '--scale': scale } as CSSProperties}
		>
			<canvas
				style={{ cursor: 'none' }}
				ref={canvasRef}
				width={240}
				height={160}
			/>
			{gbaStatus !== 'level-ready' && !hasCrashed && isPlaying && (
				<>
					<div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gray-700 z-10" />
					<div className="absolute bottom-1 left-1 z-10 text-xs">
						one moment...
					</div>
				</>
			)}
			{hasCrashed && !neverShowCrashScreen && (
				<>
					<div className="absolute top-0 left-0 w-full h-full opacity-75 bg-red-700 z-10" />
					<div className="absolute top-0 left-0 w-full h-full text-white z-10 p-3 space-y-2">
						<h3 className="font-bold text-base">Game crashed :(</h3>
						<p className="text-xs">
							Please undo your last change and try again
						</p>
					</div>
				</>
			)}
		</div>
	);
}

export { GBAPlayer };
