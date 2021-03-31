import React, { useEffect, useRef, useState } from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { Button } from '../../Button';
import { getBios, getEmptySave, getRom } from '../../FileLoader/files';
import { serialize } from '../../../saveStates/serializer';

type SaveStatesPageProps = {
	allFilesReady: boolean;
};

function downloadFile(data: string, filename: string) {
	const element = document.createElement('a');
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
	);
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function getFirstDiff(a: string, b: string): string {
	for (let i = 0; i < a.length && i < b.length; ++i) {
		if (a[i] !== b[i]) {
			return `${i}:${a.substr(i - 40, 100)}`;
		}
	}

	return 'NODIFFS';
}

function SaveStatesPage({ allFilesReady }: SaveStatesPageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [saveState, setSaveState] = useState<any>();
	const [isPlaying, setIsPlaying] = useState(false);
	const [serializedSaveState, setSerializedSaveState] = useState('');
	const [restoredSerialized, setRestoredSerialized] = useState('');

	function reset() {
		window._gba.setCanvas(canvasRef.current!);
		window._gba.setBios(getBios()!.buffer);
		window._gba.setRom(getRom()!.buffer);
		window._gba.setSavedata(getEmptySave()!.buffer);
	}

	useEffect(() => {
		if (allFilesReady && canvasRef.current) {
			reset();
		}
	}, [allFilesReady]);

	const handleReset = reset;

	const handleSave = () => {
		window._gba.pause();
		const saveState = window._gba.freeze();
		setSaveState(saveState);
		const serialized = serialize(saveState);
		setSerializedSaveState(serialized);
		setIsPlaying(false);
		downloadFile(serialized, 'saveState.txt');
	};
	const handleRestore = () => {
		if (saveState) {
			window._gba.pause();
			window._gba.setRom(getRom()!.buffer);
			window._gba.defrost(saveState);
			setRestoredSerialized(
				// @ts-ignore
				serialize(window._gba.video.freeze(), { space: 2 })
			);
			window._gba.runStable();
			setIsPlaying(true);
		}
	};

	const handlePlayPause = () => {
		if (isPlaying) {
			window._gba.pause();
		} else {
			window._gba.runStable();
		}
		setIsPlaying((p) => !p);
	};

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<div>
				<p>
					This page is a sandbox to work on adding save state support to gbajs
				</p>
				<div className="flex flex-row space-x-2">
					<Button onClick={handleReset}>reset</Button>
					<Button onClick={handlePlayPause}>
						{isPlaying ? 'pause' : 'play'}
					</Button>
					<Button onClick={handleSave}>Save</Button>
					<Button onClick={handleRestore}>Restore</Button>
				</div>
				<canvas width={240} height={160} ref={canvasRef} />
				{serializedSaveState && restoredSerialized && (
					<>
						<div>{getFirstDiff(serializedSaveState, restoredSerialized)}</div>
						<div className="grid grid-cols-2">
							<pre>{serializedSaveState}</pre>
							<pre>{restoredSerialized}</pre>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export { SaveStatesPage };
