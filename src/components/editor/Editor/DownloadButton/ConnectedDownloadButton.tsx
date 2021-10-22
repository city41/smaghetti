import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../store';

import { DownloadButton } from './DownloadButton';
import type { PublicDownloadButtonProps } from './DownloadButton';
import {
	downloadLevelAsJson,
	downloadLevelAsSaveFile,
} from '../../../../levelData/downloadLevelAsSaveFile';
import { HowToUseDownloadModal } from '../../../HowToUseDownloadModal';
import { serialize } from '../../../../level/serialize';
import { CURRENT_VERSION } from '../../../../level/versioning/convertLevelToLatestVersion';

function ConnectedDownloadButton(props: PublicDownloadButtonProps) {
	const { rooms, settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	const [showDownloadHelp, setShowDownloadHelp] = useState(false);

	function handleDownloadClick() {
		const level: LevelToLoadInGBA = {
			name,
			data: {
				settings,
				rooms,
			},
		};

		downloadLevelAsSaveFile(level);

		if (process.env.NODE_ENV !== 'production') {
			downloadLevelAsJson(level);
			const serializedLevel: SerializedLevel = {
				...level,
				id: 'download-serialized',
				created_at: '',
				version: CURRENT_VERSION,
				name: `${level.name}-serialized`,
				data: serialize(level.data),
			};
			downloadLevelAsJson(serializedLevel);
		}

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
