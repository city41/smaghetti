import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Editor, EditorProps } from './Editor';
import { AppState } from '../../../store';

type ConnectedEditorProps = Partial<EditorProps>;

const ConnectedEditor: FunctionComponent<ConnectedEditorProps> = (props) => {
	const { storedForManageLevelMode, loadLevelState } = useSelector(
		(state: AppState) => state.editor.present
	);

	const { inGameBinaryLevelChooser } = useSelector(
		(state: AppState) => state.experiments
	);

	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const { name, creatorName, savedLevelId } = useSelector(
		(state: AppState) => state.editor.present
	);

	const mode = storedForManageLevelMode ? 'managing-rooms' : 'editing';

	return (
		<Editor
			mode={mode}
			loadLevelState={loadLevelState}
			{...props}
			areFilesReady={allFilesReady}
			levelName={name}
			creatorName={creatorName}
			savedLevelId={savedLevelId}
			inGameBinaryLevelChooser={inGameBinaryLevelChooser}
		/>
	);
};

export { ConnectedEditor };
