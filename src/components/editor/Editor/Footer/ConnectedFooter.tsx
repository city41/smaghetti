import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { ExperimentsModal } from '../experiments/ExperimentsModal/ExperimentsModal';

import { Footer, PublicFooterProps } from './Footer';

function ConnectedFooter(props: PublicFooterProps) {
	const [showExperimentsModal, setShowExperimentsModal] = useState(false);
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

	return (
		<>
			<Footer
				{...props}
				level={level}
				onExperimentsClick={() => setShowExperimentsModal((sem) => !sem)}
			/>
			<ExperimentsModal
				isOpen={showExperimentsModal}
				onRequestClose={() => setShowExperimentsModal(false)}
			/>
		</>
	);
}

export { ConnectedFooter };
