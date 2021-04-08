import React from 'react';

import { FaPlay, FaHammer } from 'react-icons/fa';
import { IconButton } from '../../../IconButton';

type PlayButtonProps = {
	className?: string;
	isPlaying: boolean;
	onClick?: () => void;
};

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.15);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;
//
// const Button = styled.button`
// 	border-radius: 50%;
//
// 	background-color: transparent;
//
// 	width: 100%;
// 	height: 100%;
//
// 	/* border: 4px solid white; */
// 	border: none;
//
// 	/* box-shadow: 0px 5px 0px #555; */
//
// 	outline: none;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
//
// 	cursor: pointer;
//
// 	& svg {
// 		width: 24px;
// 		height: 24px;
// 		display: inline-block;
// 		color: white;
// 	}
//
// 	&:hover img {
// 		animation: ${pulse} 0.5s infinite;
// 	}
//
// 	&:active {
// 		/* margin-top: 5px; */
// 		transform: scale(1.1);
// 		transform-origin: center center;
// 		/* box-shadow: 0px 0px 0px #aaa; */
// 	}
// `;

function PlayButton({ className, isPlaying, onClick }: PlayButtonProps) {
	const Icon = isPlaying ? FaHammer : FaPlay;
	const title = isPlaying ? 'edit your level' : 'preview your level';

	return (
		<IconButton
			className={className}
			anchor="top-left"
			label={`${title} (p)`}
			icon={Icon}
			alternate
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
