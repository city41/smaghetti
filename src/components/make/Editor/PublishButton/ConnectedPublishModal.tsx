import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../../store';
import { PublishModal } from './PublishModal';
import { saveLevel } from '../../editorSlice';

type ConnectedPublishModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const ConnectedPublishModal: FunctionComponent<ConnectedPublishModalProps> = ({
	isOpen,
	onClose,
}) => {
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
		<PublishModal
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
};

export { ConnectedPublishModal };
