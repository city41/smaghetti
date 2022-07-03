import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';

import { Section, WiiUExplorerPage } from './WiiUExplorerPage';

function ConnectedWiiUExplorerPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const [curSections, setCurSections] = useState<Section[]>([]);
	const [curRomData, setCurRomData] = useState<number[]>([]);

	const handleRomFileChosen = useCallback(
		function handleRomFileChosen(romFile: File) {
			if (allFilesReady) {
				const reader = new FileReader();

				reader.onloadend = () => {
					const data = new Uint8Array(reader.result as ArrayBuffer);
					setCurRomData(Array.from(data));
				};

				reader.readAsArrayBuffer(romFile);
			}
		},
		[allFilesReady]
	);

	useEffect(() => {
		if (curRomData.length) {
			const sections = [];
			for (let i = 0x400000; i < 0x430000; i += 0x400010) {
				sections.push({
					offset: i,
					bytes: curRomData.slice(i, i + 0x400010),
				});
			}
			setCurSections(sections);
		}
	}, [curRomData]);

	function handleBytesChange({
		address,
		bytes,
	}: {
		address: number;
		bytes: number[];
	}) {
		setCurRomData((d) => {
			const newData = [...d];
			for (let i = 0; i < bytes.length; ++i) {
				newData[address + i] = bytes[i];
			}

			return newData;
		});
	}

	if (!allFilesReady) {
		return <FileLoaderModal isOpen mode="none" />;
	} else {
		return (
			<WiiUExplorerPage
				sections={curSections}
				rom={new Uint8Array(curRomData)}
				onBytesChange={handleBytesChange}
				onRomFileChosen={handleRomFileChosen}
			/>
		);
	}
}

export { ConnectedWiiUExplorerPage };
