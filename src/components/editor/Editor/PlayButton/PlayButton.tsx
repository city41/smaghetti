import React from 'react';

import { FaPlay, FaHammer } from 'react-icons/fa';
import { PlainIconButton } from '../../../PlainIconButton';

type PlayButtonProps = {
	className?: string;
	isPlaying: boolean;
	disabled: boolean;
	onClick?: () => void;
};

function PlayButton({
	className,
	isPlaying,
	disabled,
	onClick,
}: PlayButtonProps) {
	const Icon = isPlaying ? FaHammer : FaPlay;
	const title = isPlaying ? 'edit your level' : 'preview your level';

	return (
		<PlainIconButton
			disabled={disabled}
			className={className}
			size="medium"
			label={`${title} (p)`}
			icon={Icon}
			onClick={() => {
				onClick?.();

				// modern browsers only allow audio after the user has indicated they want it, ie via a button click
				// so need to resume the context here in order to allow the GBA audio to play, no worries if the user chose
				// to mute it, it would still be muted in that case
				window._gba.audio.context.resume();
			}}
		/>
	);
}

export { PlayButton };
export type { PlayButtonProps };
