import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState, dispatch } from '../../../store';
import { FileLoaderModal } from './FileLoaderModal';
import { loadBios, loadRom } from '../fileLoaderSlice';

type ConnectedFileLoaderModalProps = {
	isOpen: boolean;
};

const actions = bindActionCreators(
	{
		onRomFileChosen: loadRom,
		onBiosFileChosen: loadBios,
	},
	dispatch
);

function ConnectedFileLoaderModal({ isOpen }: ConnectedFileLoaderModalProps) {
	const {
		isLoadingBios,
		isLoadingRom,
		// loadBiosError,
		// loadRomError
	} = useSelector((state: AppState) => state.fileLoader);

	return (
		<FileLoaderModal
			isOpen={isOpen}
			isLoadingBios={isLoadingBios}
			isLoadingRom={isLoadingRom}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
