import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLevelName } from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { MetadataMenu } from './MetadataMenu';
import { PublicMetadataMenuProps } from './MetadataMenu';

const actions = bindActionCreators(
	{
		onSetLevelName: setLevelName,
	},
	dispatch
);

function ConnectedMetadataMenu(props: PublicMetadataMenuProps) {
	const { metadata } = useSelector((s: AppState) => s.editor.present);
	return <MetadataMenu {...props} levelName={metadata.name} {...actions} />;
}

export { ConnectedMetadataMenu };
