import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';

import { Section, WiiUExplorerPage } from './WiiUExplorerPage';

function ConnectedWiiUExplorerPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const [curSection, setCurSection] = useState<Section>({
		offset: 0,
		bytes: [],
	});
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
			setCurSection({
				offset: 0x400000,
				bytes: curRomData.slice(0x400000, 0x424a54),
			});
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
				section={curSection}
				rom={new Uint8Array(curRomData)}
				onBytesChange={handleBytesChange}
				onRomFileChosen={handleRomFileChosen}
			/>
		);
	}
}

export { ConnectedWiiUExplorerPage };
