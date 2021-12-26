import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { LevelsButton } from './LevelsButton';

type MenuProps = {
	className?: string;
	children: ReactNode;
};

type MenuEntryProps = {
	current?: boolean;
	onClick: () => void;
	children: ReactNode;
};

function MenuEntry({ current, onClick, children }: MenuEntryProps) {
	return (
		<li>
			<LevelsButton className="w-full" toggled={current} onClick={onClick}>
				{children}
			</LevelsButton>
		</li>
	);
}

function Menu({ className, children }: MenuProps) {
	const childCount = React.Children.count(children);

	return (
		<ul
			className={clsx(className, 'grid items-center', {
				'grid-cols-3': childCount === 3,
				'grid-cols-4': childCount === 4,
				'grid-cols-5': childCount === 5,
				'grid-cols-6': childCount === 6,
			})}
		>
			{children}
		</ul>
	);
}

export { MenuEntry, Menu };
