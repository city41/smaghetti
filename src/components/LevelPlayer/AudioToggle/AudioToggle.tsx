import React from 'react';
import { IconVolumeMute, IconVolumeUnmute } from '../../../icons';
import { PlainIconButton } from '../../PlainIconButton';

type InternalAudioToggleProps = {
	onToggle: () => void;
	unmute: boolean;
};

function AudioToggle({ onToggle, unmute }: InternalAudioToggleProps) {
	const icon = unmute ? IconVolumeUnmute : IconVolumeMute;

	return (
		<PlainIconButton
			className="bg-green-500"
			icon={icon}
			label="audio"
			onClick={onToggle}
			size="large"
		/>
	);
}

export { AudioToggle };
