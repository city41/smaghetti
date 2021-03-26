import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { injectLevelIntoSave } from '../../levelData/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';
import { LoadingBar } from '../LoadingBar';

type GBAPlayerProps = {
	className?: string;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	emptySaveFile: Uint8Array;
	levelData: Uint8Array;
	isPlaying: boolean;
};

function GBAPlayer({
	className,
	biosFile,
	romFile,
	emptySaveFile,
	levelData,
	isPlaying,
}: GBAPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [gbaStatus, setGbaStatus] = useState<GBAStatus>('reset');

	useEffect(() => {
		window._gba.statusCallback = (status) => {
			console.log('gba status', status);
			setGbaStatus(status);
		};

		return () => {
			window._gba.statusCallback = undefined;
		};
	}, []);

	useEffect(() => {
		if (isPlaying) {
			const saveFileWithInjectedLevel = injectLevelIntoSave(
				emptySaveFile,
				levelData
			);

			// const url = window.URL.createObjectURL(
			// 	new Blob([levelData.buffer], { type: 'application/octet-stream' })
			// );
			//
			// window.open(url);

			canvasRef.current!.getContext('2d')!.imageSmoothingEnabled = false;

			window._gba.injectSaveFile(saveFileWithInjectedLevel.buffer);
		} else {
			console.log('setting rom');
			window._gba.setCanvas(canvasRef.current!);
			window._gba.setBios(biosFile.buffer);
			window._gba.setRom(romFile.buffer);
			window._gba.setSavedata(emptySaveFile.buffer);
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
					<div className="absolute top-16 left-10 grid place-items-center z-10">
						<div style={{ fontSize: '0.25rem' }}>getting to your level ...</div>
						<LoadingBar className="w-28" percent={100} />
						<div
							style={{ fontSize: '0.25rem' }}
							className="mt-1 px-0.5 py-0.5 bg-green-500 text-white"
						>
							Letting you jump straight into your level is on the todo list!
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export { GBAPlayer };
