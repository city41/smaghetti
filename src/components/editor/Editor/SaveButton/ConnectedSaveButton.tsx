import React from 'react';

import { AppState } from '../../../../store';

import { SaveButton } from './SaveButton';
import type { PublicSaveButtonProps } from './SaveButton';
import { useSelector } from 'react-redux';

function ConnectedSaveButton(props: PublicSaveButtonProps) {
	const { saveLevelState } = useSelector((s: AppState) => s.editor.present);

	function handleSaveClick() {
		// if (isLoggedIn) {
		// 	dispatch(saveLevel());
		// } else {
		// 	setShowModal(true);
		// }
	}

	return (
		<>
			<SaveButton
				{...props}
				onSaveClick={handleSaveClick}
				saveLevelState={saveLevelState}
			/>
		</>
	);
}

export { ConnectedSaveButton };
