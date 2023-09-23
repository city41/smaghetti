import React from 'react';
import { useSelector } from 'react-redux';

import { MoreMenu } from './MoreMenu';
import type { PublicMoreMenuProps, MoreMenuAction } from './MoreMenu';
import { AppState, dispatch } from '../../../../store';
import { CURRENT_VERSION } from '../../../../level/versioning/convertLevelToLatestVersion';
import { serialize } from '../../../../level/serialize';
import { downloadLevelAsJson } from '../../../../levelData/downloadLevelAsSaveFile';
import { loadLevelFromFile } from '../../editorSlice';

async function getFileToUpload(): Promise<File | null> {
	return new Promise((resolve) => {
		const fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');

		fileSelector.onchange = () => {
			resolve(fileSelector.files?.[0] ?? null);
		};

		fileSelector.click();
	});
}

function ConnectedMoreMenu(props: PublicMoreMenuProps) {
	const { rooms, settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	async function handleMoreMenuClick(action: MoreMenuAction) {
		if (action === 'export') {
			const level: LevelToLoadInGBA = {
				name,
				data: {
					settings,
					rooms,
				},
			};

			const serializedLevel: SerializedLevel = {
				...level,
				id: `exported-${level.name}`,
				created_at: '',
				version: CURRENT_VERSION,
				data: serialize(level.data),
			};
			downloadLevelAsJson(serializedLevel);
		} else if (action === 'load') {
			const file = await getFileToUpload();

			if (file) {
				dispatch(loadLevelFromFile(file));
			}
		}

		props.onClick?.(action);
	}

	return <MoreMenu {...props} onClick={handleMoreMenuClick} />;
}

export { ConnectedMoreMenu };
