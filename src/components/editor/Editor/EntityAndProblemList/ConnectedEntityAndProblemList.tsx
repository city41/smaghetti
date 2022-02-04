import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState, dispatch } from '../../../../store';
import { deleteEntity, scrollToEntity } from '../../editorSlice';

import {
	EntityAndProblemList,
	PublicEntityAndProblemListProps,
} from './EntityAndProblemList';

const actions = bindActionCreators(
	{
		onProblemClick: scrollToEntity,
		onDeleteClick: deleteEntity,
	},
	dispatch
);

function ConnectedEntityAndProblemList(props: PublicEntityAndProblemListProps) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	return <EntityAndProblemList {...props} rooms={rooms} {...actions} />;
}

export { ConnectedEntityAndProblemList };
