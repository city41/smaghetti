import React, { FunctionComponent, useState } from 'react';

import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

import { IconButton } from '../../../IconButton';

type MuteButtonProps = {
	className?: string;
};

function MuteButton({ className }: MuteButtonProps) {
	const [isMuted, setMuted] = useState(
		process.env.NODE_ENV === 'development' ? true : false
	);

	const icon = isMuted ? FaVolumeMute : FaVolumeDown;

	return (
		<IconButton
			className={className}
			icon={icon}
			label="toggle sound"
			anchor="top"
			toggleable
			toggled={isMuted}
			onClick={() => {
				setMuted(!isMuted);
				window._gba.audio.masterVolume = !isMuted ? 0 : 1;
			}}
		/>
	);
}

export { MuteButton };
export type { MuteButtonProps };
