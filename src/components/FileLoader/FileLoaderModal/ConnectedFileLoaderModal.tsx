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
		onBiosFileChosen: loadBios,
	},
	dispatch
);

function ConnectedFileLoaderModal({ isOpen }: ConnectedFileLoaderModalProps) {
	useEffect(() => {
		dispatch(loadEmptySave());
	}, []);

	const {
		isLoadingBios,
		isLoadingRom,
		loadBiosError,
		loadRomError,
		loadEmptySaveError,
	} = useSelector((state: AppState) => state.fileLoader);

	return (
		<FileLoaderModal
			isOpen={isOpen}
			isLoadingBios={isLoadingBios}
			isLoadingRom={isLoadingRom}
			loadBiosError={loadBiosError}
			loadRomError={loadRomError}
			loadEmptySaveError={loadEmptySaveError}
			{...actions}
		/>
	);
}

export { ConnectedFileLoaderModal };
