import React from 'react';
import { useSelector } from 'react-redux';

import { CompatibilityPage } from './CompatibilityPage';
import type { PublicCompatibilityPageProps } from './CompatibilityPage';
import { AppState } from '../../../store';

function ConnectedCompatibilityPage(props: PublicCompatibilityPageProps) {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);

	return <CompatibilityPage allFilesReady={allFilesReady} {...props} />;
}

export { ConnectedCompatibilityPage };
