import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Section, WiiUExplorerPage } from './WiiUExplorerPage';
import { AppState } from '../../../store';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { getRom } from '../../FileLoader/files';

function ConnectedWiiUExplorerPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const [curSections, setCurSections] = useState<Section[]>([]);
	const [curRomData, setCurRomData] = useState<number[]>([]);

	useEffect(() => {
		if (allFilesReady) {
			const data = Array.from(getRom()!);
			setCurRomData(data);
		}
	}, [allFilesReady]);

	useEffect(() => {
		if (curRomData.length) {
			setCurSections([
				{
					offset: 0x400000,
					bytes: curRomData.slice(0x400000, 0x413020),
				},
				{
					offset: 0x424000,
					bytes: curRomData.slice(0x424000, 0x426c40),
				},
				{
					offset: 0x426c40,
					bytes: curRomData.slice(0x426c40, 0x430000),
				},
			]);
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

	if (curSections.length > 0) {
		return (
			<WiiUExplorerPage
				sections={curSections}
				rom={new Uint8Array(curRomData)}
				onBytesChange={handleBytesChange}
			/>
		);
	} else {
		return <FileLoaderModal isOpen mode="wiiu" />;
	}
}

export { ConnectedWiiUExplorerPage };
