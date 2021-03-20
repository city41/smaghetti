import React, { useEffect, useState } from 'react';

import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';

import { IconButton } from '../../../IconButton';

type MuteButtonProps = {
	className?: string;
};

const LOCALSTORAGE_KEY = 'smaghetti_mute';

function MuteButton({ className }: MuteButtonProps) {
	const [isMuted, setMuted] = useState(
		process.env.NODE_ENV === 'development' ? true : false
	);

	useEffect(() => {
		const lsvalue = localStorage.getItem(LOCALSTORAGE_KEY);

		if (lsvalue === 'true') {
			setMuted(true);
		} else if (lsvalue === 'false') {
			setMuted(false);
		}
	}, []);

	useEffect(() => {
		window._gba.audio.masterVolume = isMuted ? 0 : 1;
		localStorage.setItem(LOCALSTORAGE_KEY, isMuted.toString());
	}, [isMuted]);

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
			}}
		/>
	);
}

export { MuteButton };
export type { MuteButtonProps };
