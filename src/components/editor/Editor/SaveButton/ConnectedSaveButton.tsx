import React from 'react';

import { AppState, dispatch } from '../../../../store';

import { SaveButton } from './SaveButton';
import type { PublicSaveButtonProps } from './SaveButton';
import { useSelector } from 'react-redux';
import { saveLevel } from '../../editorSlice';

function ConnectedSaveButton(props: PublicSaveButtonProps) {
	const { saveLevelState } = useSelector((s: AppState) => s.editor.present);

	function handleSaveClick() {
		dispatch(saveLevel());
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
