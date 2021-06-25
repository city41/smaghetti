import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLayerLock } from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { Layers, PublicLayersProps } from './Layers';

const actions = bindActionCreators(
	{
		onToggleLayerLock: toggleLayerLock,
	},
	dispatch
);

function ConnectedLayers(props: PublicLayersProps) {
	const { actors, stage } = useSelector(
		(state: AppState) => state.editor.currentRoom
	);

	return <Layers actors={actors} stage={stage} {...props} {...actions} />;
}

export { ConnectedLayers };
