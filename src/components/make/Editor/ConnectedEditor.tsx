import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Editor, EditorProps } from './Editor';
import { AppState } from '../../../store';

type ConnectedEditorProps = Partial<EditorProps>;

const ConnectedEditor: FunctionComponent<ConnectedEditorProps> = (props) => {
	const { storedForManageLevelMode, loadLevelState } = useSelector(
		(state: AppState) => state.editor.present
	);
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const mode = storedForManageLevelMode ? 'managing-rooms' : 'editing';

	return (
		<Editor
			mode={mode}
			loadLevelState={loadLevelState}
			{...props}
			areFilesReady={allFilesReady}
		/>
	);
};

export { ConnectedEditor };
