import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Editor, EditorProps } from './Editor';
import { AppState, dispatch } from '../../../store';
import { bindActionCreators } from 'redux';
import { scaleDecreased, scaleIncreased } from '../editorSlice';

type ConnectedEditorProps = Partial<EditorProps>;

const actions = bindActionCreators(
	{
		onScaleDecreased: scaleDecreased,
		onScaleIncreased: scaleIncreased,
	},
	dispatch
);

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

	return (
		<Editor
			mode={mode}
			loadLevelState={loadLevelState}
			{...props}
			{...actions}
		/>
	);
};

export { ConnectedEditor };
