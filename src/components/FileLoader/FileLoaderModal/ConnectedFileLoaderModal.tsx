import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../store';
import { FileLoaderModal, PublicFileLoaderModalProps } from './FileLoaderModal';
import {
	setMode,
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
	const {
		overallExtractionState,
		romFileState,
		otherFilesState,
		extractionGraphicState,
	} = useSelector((state: AppState) => state.fileLoader);

	useEffect(() => {
		dispatch(loadEmptySave());
		dispatch(loadBios());
		dispatch(loadSaveState());
		dispatch(loadExampleLevel());
	}, []);

	useEffect(() => {
		dispatch(setMode(props.mode));
	}, [props.mode]);

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
			overallExtractionState={overallExtractionState}
			romFileState={romFileState}
			otherFilesState={otherFilesState}
			extractionGraphicState={extractionGraphicState}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
