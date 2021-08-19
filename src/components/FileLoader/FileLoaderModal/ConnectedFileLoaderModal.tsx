import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../store';
import { FileLoaderModal, PublicFileLoaderModalProps } from './FileLoaderModal';
import {
	loadBios,
	loadRom,
	loadEmptySave,
	loadSaveState,
	loadExampleLevel,
	extract,
} from '../fileLoaderSlice';

const actions = bindActionCreators(
	{
		onRomFileChosen: loadRom,
	},
	dispatch
);

function ConnectedFileLoaderModal(props: PublicFileLoaderModalProps) {
	const { overallExtractionState, romFileState, otherFilesState } = useSelector(
		(state: AppState) => state.fileLoader
	);

	useEffect(() => {
		dispatch(loadEmptySave());
		dispatch(loadBios());
		dispatch(loadSaveState());
		dispatch(loadExampleLevel());
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
			{...props}
			extractionState={overallExtractionState}
			romFileState={romFileState}
			otherFilesState={otherFilesState}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
