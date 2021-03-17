import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { injectLevelIntoSave } from '../../levelData/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';

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

	function playRom(
		gba: Window['GameBoyAdvance'],
		canvas: HTMLCanvasElement,
		bios: Uint8Array,
		rom: Uint8Array,
		emptySaveFile: Uint8Array,
		levelData: Uint8Array
	) {
		canvas.getContext('2d')!.imageSmoothingEnabled = false;

		const saveFileWithInjectedLevel = injectLevelIntoSave(
			emptySaveFile,
			levelData
		);

		// const url = window.URL.createObjectURL(
		// 	new Blob([levelData.buffer], { type: 'application/octet-stream' })
		// );
		//
		// window.open(url);

		gba.setCanvas(canvas);
		gba.setBios(bios.buffer);
		gba.setRom(rom.buffer);
		gba.setSavedata(saveFileWithInjectedLevel.buffer);
		gba.runStable();
	}

	useEffect(() => {
		if (isPlaying) {
			if (canvasRef.current) {
				playRom(
					window._gba,
					canvasRef.current,
					biosFile,
					romFile,
					emptySaveFile,
					levelData
				);
			}
		} else {
			window._gba.pause();
		}
	}, [
		isPlaying,
		// romFile,
		// levelData,
		// biosFile,
		// emptySaveFile,
		// canvasRef.current,
	]);

	return (
		<canvas
			className={clsx(
				className,
				styles.root,
				'border border-black bg-green-50'
			)}
			ref={canvasRef}
			width={240}
			height={160}
		/>
	);
}

export { GBAPlayer };
