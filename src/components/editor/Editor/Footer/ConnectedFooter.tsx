import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';

import { Footer, PublicFooterProps } from './Footer';

function ConnectedFooter(props: PublicFooterProps) {
	const { rooms } = useSelector((state: AppState) => state.editor.present);

	const { settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	const level: LevelToLoadInGBA = {
		name,
		data: {
			settings,
			rooms,
		},
	};

	return <Footer {...props} level={level} />;
}

export { ConnectedFooter };
