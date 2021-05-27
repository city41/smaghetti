import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MakePage } from './MakePage';
import { AppState, dispatch } from '../../../store';
import { loadLevel } from '../editorSlice';

type ConnectedMakePageProps = {
	id?: string;
};

function ConnectedMakePage({ id }: ConnectedMakePageProps) {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	useEffect(() => {
		if (id) {
			dispatch(loadLevel(id));
		}
	}, [id]);

	return <MakePage allFilesReady={allFilesReady} showLevelChooser={!id} />;
}

export { ConnectedMakePage };
