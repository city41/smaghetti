import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../store';
import { FileLoaderModal } from './FileLoaderModal';
import {
	loadBios,
	loadRom,
	loadEmptySave,
	loadSaveState,
	extract,
} from '../fileLoaderSlice';

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
	const { overallExtractionState, romFileState, otherFilesState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		dispatch(loadEmptySave());
		dispatch(loadBios());
		dispatch(loadSaveState());
	}, []);

	useEffect(() => {
		if (
			overallExtractionState === 'not-started' &&
			romFileState === 'success' &&
			otherFilesState === 'success'
		) {
			dispatch(extract());
		}
	}, [overallExtractionState, romFileState, otherFilesState]);

	return (
		<FileLoaderModal
			isOpen={isOpen && process.env.NODE_ENV === 'production'}
			extractionState={overallExtractionState}
			romFileState={romFileState}
			otherFilesState={otherFilesState}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
