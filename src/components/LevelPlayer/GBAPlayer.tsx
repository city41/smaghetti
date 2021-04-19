import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';

import { injectLevelIntoSave } from '../../levelData/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';

type GBAPlayerProps = {
	className?: string;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	saveState: Record<string, unknown>;
	levelData: Uint8Array;
	isPlaying: boolean;
	scale?: number;
};

function GBAPlayer({
	className,
	biosFile,
	romFile,
	emptySaveFile,
	saveState,
	levelData,
	isPlaying,
	scale = 3,
}: GBAPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [gbaStatus, setGbaStatus] = useState<GBAStatus>('reset');
	const [hasCrashed, setHasCrashed] = useState(false);

	useEffect(() => {
		window._gba.setCanvas(canvasRef.current!);
		window._gba.setBios(biosFile.buffer);

		window._gba.statusCallback = (status) => {
			console.log('gba status', status);
			setGbaStatus(status);

			if (status === 'ready-to-inject') {
				const saveFileWithInjectedLevel = injectLevelIntoSave(
					emptySaveFile,
					levelData
				);
				window._gba.injectSaveFile(saveFileWithInjectedLevel.buffer);
			}

			if (status === 'crashed') {
				setHasCrashed(true);
			}
		};

		return () => {
			window._gba.statusCallback = undefined;
		};
	}, [levelData]);

	useEffect(() => {
		if (isPlaying) {
			canvasRef.current!.getContext('2d')!.imageSmoothingEnabled = false;

			window._gba.setRom(romFile.buffer);
			window._gba.defrost(cloneDeep(saveState));
			window._gba.setSavedata(emptySaveFile.buffer);
			window._gba.runStable();
		} else {
			setHasCrashed(false);
			window._gba.pause();
		}
	}, [isPlaying]);

	return (
		<div
			className={clsx(
				className,
				styles.root,
				'relative border border-black bg-green-50'
			)}
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
			{hasCrashed && (
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
