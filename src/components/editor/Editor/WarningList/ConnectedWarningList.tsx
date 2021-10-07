import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState, dispatch } from '../../../../store';
import { scrollToEntity } from '../../editorSlice';

import { WarningList, PublicWarningListProps } from './WarningList';

const actions = bindActionCreators(
	{
		onWarningClick: scrollToEntity,
	},
	dispatch
);

function ConnectedWarningList(props: PublicWarningListProps) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	return <WarningList {...props} rooms={rooms} {...actions} />;
}

export { ConnectedWarningList };
