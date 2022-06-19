import React from 'react';

import { OverwriteClassic1_1InVCVersion } from './OverwriteClassic1_1InVCVersion';
import { dispatch } from '../../../../../store';
import { downloadOverwriteClassic1_1InVCVersionIPS } from '../experimentsSlice';

function ConnectedOverwriteClassic1_1InVCVersion() {
	function handleDownloadPatch() {
		dispatch(downloadOverwriteClassic1_1InVCVersionIPS());
	}

	return (
		<OverwriteClassic1_1InVCVersion onDownloadPatch={handleDownloadPatch} />
	);
}

export { ConnectedOverwriteClassic1_1InVCVersion };
