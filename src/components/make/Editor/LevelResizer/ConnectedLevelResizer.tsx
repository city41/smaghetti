import React, { FunctionComponent } from 'react';
import { bindActionCreators } from 'redux';

import { resizeLevel, resizeLevelComplete } from '../../editorSlice';
import { dispatch } from '../../../../store';

import { LevelResizer, LevelResizerProps } from './LevelResizer';

type ConnectedLevelResizerProps = Partial<LevelResizerProps>;

const actions = bindActionCreators(
	{
		onResizeLevel: resizeLevel,
		onResizeLevelComplete: resizeLevelComplete,
	},
	dispatch
);

const ConnectedLevelResizer: FunctionComponent<ConnectedLevelResizerProps> = (
	props
) => {
	return <LevelResizer {...props} {...actions} />;
};

export { ConnectedLevelResizer };
