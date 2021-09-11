import React from 'react';
import { useSelector } from 'react-redux';

import { SectionPercentage } from './SectionPercentage';
import { AppState } from '../../../../store';

function ConnectedSectionPercentage() {
	const { sectionsTotalSize, romSize } = useSelector(
		(state: AppState) => state.romLayout
	);

	return <SectionPercentage sections={sectionsTotalSize} rom={romSize} />;
}

export { ConnectedSectionPercentage };
