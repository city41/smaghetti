import React from 'react';
import { IconType } from 'react-icons/lib';
import { BiPlay, BiFastForward } from 'react-icons/bi';

const speeds = ['slow', 'fast'] as const;
type Speed = typeof speeds[number];

type PlatformSpeedButtonProps = {
	className?: string;
	currentSpeed: Speed;
	onSpeedChange: (newSpeed: Speed) => void;
};

const speedToIcon: Record<Speed, IconType> = {
	slow: BiPlay,
	fast: BiFastForward,
};

function PlatformSpeedButton({
	className,
	currentSpeed,
	onSpeedChange,
}: PlatformSpeedButtonProps) {
	const SpeedIcon = speedToIcon[currentSpeed];

	return (
		<button
			className={className}
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();

				const speedIndex = speeds.indexOf(currentSpeed);
				const newSpeedIndex = (speedIndex + 1) % speeds.length;
				const newSpeed = speeds[newSpeedIndex];
				onSpeedChange(newSpeed);
			}}
		>
			<SpeedIcon
				style={{ borderRadius: '10%', padding: 0.5 }}
				className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
			/>
		</button>
	);
}

export { PlatformSpeedButton };
export type { Speed };
