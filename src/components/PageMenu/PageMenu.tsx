import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IconDiscord } from '../../icons';

import styles from './PageMenu.module.css';
import { DISCORD_LINK } from '../../constants';

type PublicPageMenuProps = {
	className?: string;
	children?: ReactNode;
	onLevelsClicked: () => void;
};

function PageMenu({
	className,
	onLevelsClicked,
	children,
}: PublicPageMenuProps) {
	const menu = (
		<>
			<a onClick={onLevelsClicked}>your levels</a>
		</>
	);

	return (
		<nav
			className={clsx(
				styles.root,
				className,
				'py-1 px-4 text-sm bg-gray-700 flex flex-row space-x-4 items-center justify-around'
			)}
		>
			{children}
			{menu}
			<Link href="/help" passHref legacyBehavior>
				<a target="_blank" rel="noreferrer">
					help
				</a>
			</Link>
			<Link href={DISCORD_LINK} passHref legacyBehavior>
				<a target="_blank" rel="noreferrer" title="discord">
					<IconDiscord className="w-5 h-5" />
				</a>
			</Link>
		</nav>
	);
}

export { PageMenu };
export type { PublicPageMenuProps };
