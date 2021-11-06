import React, { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import { AudioToggle } from './AudioToggle';

const AUDIO_TOGGLE_KEY = 'smaghetti_emulator_audio_unmute';

function ConnectedAudioToggle() {
	const [audioToggle, setAudioToggle] = useLocalStorage(
		AUDIO_TOGGLE_KEY,
		'false'
	);

	useEffect(() => {
		window._gba.audio.pause(audioToggle === 'false');
	}, [audioToggle]);

	return (
		<AudioToggle
			onToggle={() => setAudioToggle((audioToggle === 'false').toString())}
			unmute={audioToggle === 'true'}
		/>
	);
}

export { ConnectedAudioToggle };
