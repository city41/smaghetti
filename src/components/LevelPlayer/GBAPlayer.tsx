import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// import { injectLevelIntoSave } from '../lib/injectLevelIntoSave';

import styles from './GBAPlayer.module.css';

type GBAPlayerProps = {
	className?: string;
	biosFile: Uint8Array;
	romFile: Uint8Array;
	levelData: Uint8Array;
	isPlaying: boolean;
};

declare global {
	interface _GameBoyAdvance {
		new (): _GameBoyAdvance;
		setCanvas: (canvas: HTMLCanvasElement) => void;
		setBios: (bios: Uint8Array) => void;
		setRom: (rom: Uint8Array) => void;
		runStable: () => void;
		pause: () => void;
		setSavedata: (data: ArrayBuffer) => void;
		downloadSavedata: () => void;
	}

	interface Window {
		GameBoyAdvance: _GameBoyAdvance;
		loadRom: (url: string, callback: (result: ArrayBuffer) => void) => void;
	}
}

function GBAPlayer({
	className,
	biosFile,
	romFile,
	levelData,
	isPlaying,
}: GBAPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const gbaRef = useRef<InstanceType<Window['GameBoyAdvance']> | null>(null);

	// function injectLevelData(
	// 	levelData: Uint8Array | null,
	// 	callback?: () => void
	// ) {
	// 	window.loadRom('/empty.sav', (saveFile) => {
	// 		let saveFileArray = new Uint8Array(saveFile);
	// 		if (levelData) {
	// 			saveFileArray = injectLevelIntoSave(
	// 				new Uint8Array(saveFile),
	// 				levelData
	// 			);
	// 		}
	//
	// 		gbaRef.current.setSavedata(saveFileArray.buffer);
	//
	// 		callback?.();
	// 		gbaRef.current.runStable();
	// 		gbaRef.current.audio.masterVolume = 0;
	// 	});
	// }

	function playRom(
		gba: Window['GameBoyAdvance'],
		canvas: HTMLCanvasElement,
		bios: Uint8Array,
		rom: Uint8Array,
		levelData: Uint8Array | null
	) {
		canvas.getContext('2d')!.imageSmoothingEnabled = false;

		gba.setCanvas(canvas);
		gba.setBios(bios);
		gba.setRom(rom);
		gba.runStable();
	}

	useEffect(() => {
		gbaRef.current = gbaRef.current || new window.GameBoyAdvance();

		if (isPlaying) {
			if (canvasRef.current) {
				playRom(
					gbaRef.current,
					canvasRef.current,
					biosFile,
					romFile,
					levelData
				);
			}
		} else {
			gbaRef.current.pause();
		}
	}, [isPlaying, romFile, levelData, biosFile, canvasRef.current]);

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
