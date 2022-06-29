import React from 'react';
import { useSelector } from 'react-redux';

import { WiiUExplorerPage } from './WiiUExplorerPage';
import { AppState } from '../../../store';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { getRom } from '../../FileLoader/files';

function ConnectedWiiUExplorerPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	if (allFilesReady) {
		return <WiiUExplorerPage bytes={getRom()!} />;
	} else {
		return <FileLoaderModal isOpen mode="wiiu" />;
	}
}

export { ConnectedWiiUExplorerPage };
