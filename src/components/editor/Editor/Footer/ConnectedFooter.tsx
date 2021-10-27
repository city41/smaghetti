import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { ExperimentsModal } from '../experiments/ExperimentsModal/ExperimentsModal';

import { Footer, PublicFooterProps } from './Footer';

function ConnectedFooter(props: PublicFooterProps) {
	const [showExperimentsModal, setShowExperimentsModal] = useState(false);
	const { rooms, mouseMode } = useSelector(
		(state: AppState) => state.editor.present
	);

	const { settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	const level: LevelToLoadInGBA = useMemo(
		() => ({
			name,
			data: {
				settings,
				rooms,
			},
		}),
		// this is nasty but it works. only recalc the level if we are not panning
		// recalcing the level for every pan is very expensive
		[mouseMode !== 'pan' && rooms]
	);

	const handleExperimentsClick = useCallback(
		() => setShowExperimentsModal((sem) => !sem),
		[setShowExperimentsModal]
	);

	return (
		<>
			<Footer
				{...props}
				level={level}
				onExperimentsClick={handleExperimentsClick}
			/>
			<ExperimentsModal
				isOpen={showExperimentsModal}
				onRequestClose={() => setShowExperimentsModal(false)}
			/>
		</>
	);
}

export { ConnectedFooter };
