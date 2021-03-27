import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store';

import { DownloadButton } from './DownloadButton';
import type { PublicDownloadButtonProps } from './DownloadButton';
import {
	downloadLevelAsSaveFile,
	LevelToSave,
} from '../../../../levelData/downloadLevelAsSaveFile';

function ConnectedDownloadButton(props: PublicDownloadButtonProps) {
	const {
		entities,
		tiles,
		levelTileWidth,
		levelTileHeight,
		metadata,
	} = useSelector((state: AppState) => state.editor.present);

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
	}

	return <DownloadButton {...props} onClick={handleDownloadClick} />;
}

export { ConnectedDownloadButton };
