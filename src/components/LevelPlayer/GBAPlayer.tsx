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

declare global {
	interface _GameBoyAdvance {
		new (): _GameBoyAdvance;
		setCanvas: (canvas: HTMLCanvasElement) => void;
		setBios: (bios: ArrayBuffer) => void;
		setRom: (rom: ArrayBuffer) => void;
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
	emptySaveFile,
	levelData,
	isPlaying,
}: GBAPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const gbaRef = useRef<InstanceType<Window['GameBoyAdvance']> | null>(null);

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
		gbaRef.current = gbaRef.current || new window.GameBoyAdvance();

		if (isPlaying) {
			if (canvasRef.current) {
				playRom(
					gbaRef.current,
					canvasRef.current,
					biosFile,
					romFile,
					emptySaveFile,
					levelData
				);
			}
		} else {
			gbaRef.current.pause();
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
