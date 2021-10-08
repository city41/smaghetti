import React from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState, dispatch } from '../../../../store';
import { scrollToEntity } from '../../editorSlice';

import { ProblemList, PublicProblemListProps } from './ProblemList';

const actions = bindActionCreators(
	{
		onProblemClick: scrollToEntity,
	},
	dispatch
);

function ConnectedProblemList(props: PublicProblemListProps) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	return <ProblemList {...props} rooms={rooms} {...actions} />;
}

export { ConnectedProblemList };
