import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { WiiUExplorerPage } from './WiiUExplorerPage';
import { AppState } from '../../../store';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { getRom } from '../../FileLoader/files';

function ConnectedWiiUExplorerPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const [curBytes, setCurBytes] = useState<number[]>([]);

	useEffect(() => {
		if (allFilesReady) {
			setCurBytes(Array.from(getRom()!.slice(0x400000, 0x413020)));
		}
	}, [allFilesReady]);

	if (curBytes.length > 0) {
		return <WiiUExplorerPage bytes={curBytes} />;
	} else {
		return <FileLoaderModal isOpen mode="wiiu" />;
	}
}

export { ConnectedWiiUExplorerPage };
