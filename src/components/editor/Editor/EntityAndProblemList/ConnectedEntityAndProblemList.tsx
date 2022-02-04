import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PendingObject } from '../../../../levelData/createLevelData';
import { AppState, dispatch } from '../../../../store';
import {
	deletePendingObject,
	focusPendingObject,
	scrollToEntity,
} from '../../editorSlice';

import {
	EntityAndProblemList,
	PublicEntityAndProblemListProps,
} from './EntityAndProblemList';

const actions = bindActionCreators(
	{
		onProblemClick: scrollToEntity,
		onDeleteClick: deletePendingObject,
	},
	dispatch
);

function ConnectedEntityAndProblemList(props: PublicEntityAndProblemListProps) {
	const { rooms, focused } = useSelector(
		(state: AppState) => state.editor.present
	);

	function handleEntityClick({
		room,
		pendingObject,
	}: {
		room: number;
		pendingObject: PendingObject;
	}) {
		dispatch(scrollToEntity({ room, id: pendingObject.entity.id }));
		dispatch(focusPendingObject(pendingObject));
	}

	return (
		<EntityAndProblemList
			{...props}
			rooms={rooms}
			focused={focused}
			{...actions}
			onEntityClick={handleEntityClick}
		/>
	);
}

export { ConnectedEntityAndProblemList };
