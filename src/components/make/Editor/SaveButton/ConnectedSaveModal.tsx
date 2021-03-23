import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../../store';
import { SaveModal } from './SaveModal';
import { saveLevel } from '../../editorSlice';

type ConnectedSaveModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function ConnectedSaveModal({ isOpen, onClose }: ConnectedSaveModalProps) {
	const dispatch = useDispatch();

	const {
		tiles,
		entities,
		levelTileWidth,
		levelTileHeight,
		savingLevel,
		savedLevelId,
		saveLevelError,
	} = useSelector((state: AppState) => state.editor.present);

	const dispatchSaveLevel = useCallback(() => {
		dispatch(saveLevel());
	}, [dispatch]);

	const levelUrl =
		(savedLevelId &&
			`${window.location.protocol}//${window.location.host}/play/${savedLevelId}`) ||
		undefined;

	return (
		<SaveModal
			isOpen={isOpen}
			onClose={onClose}
			tileData={tiles}
			entities={entities}
			levelTileWidth={levelTileWidth}
			levelTileHeight={levelTileHeight}
			savingLevel={savingLevel}
			saveLevel={dispatchSaveLevel}
			saveLevelError={saveLevelError}
			levelUrl={levelUrl}
		/>
	);
}

export { ConnectedSaveModal };
