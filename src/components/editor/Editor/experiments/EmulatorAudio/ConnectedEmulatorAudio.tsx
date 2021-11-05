import React from 'react';
import { useSelector } from 'react-redux';

import { EmulatorAudio } from './EmulatorAudio';
import { AppState, dispatch } from '../../../../../store';
import { toggleAudio } from '../../../editorSlice';

function ConnectedEmulatorAudio() {
	const { unmute } = useSelector((state: AppState) => state.editor.present);

	return (
		<EmulatorAudio onToggle={() => dispatch(toggleAudio())} unmute={unmute} />
	);
}

export { ConnectedEmulatorAudio };
