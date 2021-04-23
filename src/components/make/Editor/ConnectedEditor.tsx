import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Editor, EditorProps } from './Editor';
import { AppState } from '../../../store';

type ConnectedEditorProps = Partial<EditorProps>;

const ConnectedEditor: FunctionComponent<ConnectedEditorProps> = (props) => {
	const {
		storedForResizeMode,
		storedForManageRoomsMode,
		loadLevelState,
	} = useSelector((state: AppState) => state.editor.present);

	const mode = storedForResizeMode
		? 'resizing'
		: storedForManageRoomsMode
		? 'managing-rooms'
		: 'editing';

	return <Editor mode={mode} loadLevelState={loadLevelState} {...props} />;
};

export { ConnectedEditor };
