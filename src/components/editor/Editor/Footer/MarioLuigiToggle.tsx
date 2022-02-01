import React from 'react';
import clsx from 'clsx';

type MarioLuigiToggle = {
	className?: string;
	currentValue: PlayAsCharacter;
	onClick: () => void;
};

function MarioLuigiToggle({
	className,
	currentValue,
	onClick,
}: MarioLuigiToggle) {
	return (
		<button className={clsx(className, 'flex flex-row')} onClick={onClick}>
			<div
				className={clsx('w-4 h-4 bg-cover', {
					'MarioLetterIconActive-bg': currentValue === 'mario',
					'MarioLetterIconInactive-bg': currentValue !== 'mario',
				})}
			/>
			<div
				className={clsx('w-5 h-4 bg-cover', {
					'LuigiLetterIconActive-bg': currentValue === 'luigi',
					'LuigiLetterIconInactive-bg': currentValue !== 'luigi',
				})}
			/>
		</button>
	);
}

export { MarioLuigiToggle };
