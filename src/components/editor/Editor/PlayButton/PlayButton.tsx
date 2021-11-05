import React from 'react';

import { PlainIconButton } from '../../../PlainIconButton';
import { IconPlayLarge, IconHammer } from '../../../../icons';

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
	const Icon = isPlaying ? IconHammer : IconPlayLarge;
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
			}}
		/>
	);
}

export { PlayButton };
export type { PlayButtonProps };
