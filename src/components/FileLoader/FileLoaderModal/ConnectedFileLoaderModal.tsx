import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../store';
import { FileLoaderModal } from './FileLoaderModal';
import { loadBios, loadRom, loadEmptySave } from '../fileLoaderSlice';

type ConnectedFileLoaderModalProps = {
	isOpen: boolean;
};

const actions = bindActionCreators(
	{
		onRomFileChosen: loadRom,
	},
	dispatch
);

function ConnectedFileLoaderModal({ isOpen }: ConnectedFileLoaderModalProps) {
	useEffect(() => {
		dispatch(loadEmptySave());
		dispatch(loadBios());
	}, []);

	const { romFileState, otherFilesState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	return (
		<FileLoaderModal
			isOpen={isOpen}
			romFileState={romFileState}
			otherFilesState={otherFilesState}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
