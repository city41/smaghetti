import React from 'react';
import clsx from 'clsx';

import { FaPlay, FaHammer } from 'react-icons/fa';

import { SFX } from '../../../../SFX';

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
		<div
			className={clsx(className, 'text-2xl text-white', { '': isPlaying })}
			title={`${title} (p)`}
			onClick={() => {
				SFX.buttonClicked();
				onClick?.();
			}}
		>
			<Icon />
		</div>
	);
}

export { PlayButton };
export type { PlayButtonProps };
