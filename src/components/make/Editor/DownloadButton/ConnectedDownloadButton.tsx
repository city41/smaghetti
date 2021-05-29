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
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	const { settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	const [showDownloadHelp, setShowDownloadHelp] = useState(false);

	function handleDownloadClick() {
		const level: LevelToSave = {
			name,
			settings,
			data: {
				rooms: rooms.map((r) => {
					return {
						...r,
						entities: r.actors.entities,
						matrixLayer: {
							width: r.roomTileWidth,
							height: r.roomTileHeight,
							data: r.stage.matrix,
						},
					};
				}),
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
