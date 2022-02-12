import React from 'react';

import { Overwrite1_1 } from './Overwrite1_1';
import { dispatch } from '../../../../../store';
import { downloadIPS } from '../experimentsSlice';

function ConnectedOverwrite1_1() {
	function handleDownloadPatch() {
		dispatch(downloadIPS());
	}

	return <Overwrite1_1 onDownloadPatch={handleDownloadPatch} />;
}

export { ConnectedOverwrite1_1 };
