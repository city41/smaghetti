import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store';

import { DownloadButton } from './DownloadButton';
import type { PublicDownloadButtonProps } from './DownloadButton';
import {
	downloadLevelAsSaveFile,
	LevelToSave,
} from '../../../../levelData/downloadLevelAsSaveFile';
import { HowToUseDownloadModal } from '../../../profile/ProfilePage/LevelEntry/HowToUseDownloadModal';

function ConnectedDownloadButton(props: PublicDownloadButtonProps) {
	const {
		entities,
		tiles,
		levelTileWidth,
		levelTileHeight,
		metadata,
	} = useSelector((state: AppState) => state.editor.present);

	const [showDownloadHelp, setShowDownloadHelp] = useState(false);

	function handleDownloadClick() {
		const tileLayer: TileLayer = {
			width: levelTileWidth,
			height: levelTileHeight,
			data: tiles,
		};

		const level: LevelToSave = {
			name: metadata.name,
			data: {
				entities,
				tileLayer,
			},
		};

		downloadLevelAsSaveFile(level);

		setShowDownloadHelp(true);
	}

	function handleCloseHelpModal() {
		setShowDownloadHelp(false);
	}

	return (
		<>
			<DownloadButton {...props} onClick={handleDownloadClick} />
			<HowToUseDownloadModal
				isOpen={showDownloadHelp}
				onRequestClose={handleCloseHelpModal}
			/>
		</>
	);
}

export { ConnectedDownloadButton };
