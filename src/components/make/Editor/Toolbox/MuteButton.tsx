import React, { FunctionComponent, useState } from 'react';

import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

import { IconButton } from '../../../IconButton';
import { SFX } from '../../../../SFX';

type MuteButtonProps = {
	className?: string;
};

function MuteButton({ className }: MuteButtonProps) {
	const [isMuted, setMuted] = useState(false);

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
				SFX.muted = !isMuted;
			}}
		/>
	);
}

export { MuteButton };
export type { MuteButtonProps };
