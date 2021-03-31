import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';

import { injectLevelIntoSave } from '../../levelData/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';

type GBAPlayerProps = {
	className?: string;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	saveState: object;
	levelData: Uint8Array;
	isPlaying: boolean;
};

function GBAPlayer({
	className,
	biosFile,
	romFile,
	emptySaveFile,
	saveState,
	levelData,
	isPlaying,
}: GBAPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [gbaStatus, setGbaStatus] = useState<GBAStatus>('reset');

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
		>
			<canvas ref={canvasRef} width={240} height={160} />
			{gbaStatus !== 'level-ready' && (
				<>
					<div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gray-700 z-10" />
					<div className="absolute bottom-1 left-1 z-10 text-xs">
						one moment...
					</div>
				</>
			)}
		</div>
	);
}

export { GBAPlayer };
