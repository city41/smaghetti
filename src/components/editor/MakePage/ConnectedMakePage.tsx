import React from 'react';
import { useSelector } from 'react-redux';

import { MakePage, PublicMakePageProps } from './MakePage';
import { AppState } from '../../../store';

function ConnectedMakePage(props: PublicMakePageProps) {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <MakePage allFilesReady={allFilesReady} {...props} />;
}

export { ConnectedMakePage };
