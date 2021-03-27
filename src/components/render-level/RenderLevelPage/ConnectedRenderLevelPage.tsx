import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RenderLevelPage } from './RenderLevelPage';
import { AppState, dispatch } from '../../../store';
import { loadLevel } from '../renderLevelSlice';

const actions = bindActionCreators(
	{
		onLoadFile: loadLevel,
	},
	dispatch
);

function ConnectedRenderLevelPage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	const { objects, sprites } = useSelector(
		(state: AppState) => state['render-level']
	);

	return (
		<RenderLevelPage
			allFilesReady={allFilesReady}
			objects={objects}
			sprites={sprites}
			{...actions}
		/>
	);
}

export { ConnectedRenderLevelPage };
