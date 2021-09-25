import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

import styles from './PageMenu.module.css';

type PublicPageMenuProps = {
	className?: string;
	children?: ReactNode;
	onLevelsClicked: () => void;
};

type InternalPageMenuProps = {
	isLoggedIn: boolean;
	onSignInClicked: () => void;
	onJoinClicked: () => void;
};

function PageMenu({
	className,
	isLoggedIn,
	onLevelsClicked,
	onSignInClicked,
	onJoinClicked,
	children,
}: PublicPageMenuProps & InternalPageMenuProps) {
	const menu = isLoggedIn ? (
		<>
			<a onClick={onLevelsClicked}>your levels</a>
		</>
	) : (
		<>
			<a
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onSignInClicked();
				}}
			>
				sign in
			</a>
			<a
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onJoinClicked();
				}}
			>
				join
			</a>
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
			<Link href="/whats-new" passHref>
				<a target="_blank" rel="noreferrer">
					what&apos;s new
				</a>
			</Link>
			<Link href="/help" passHref>
				<a target="_blank" rel="noreferrer">
					help
				</a>
			</Link>
			<Link href="https://discord.gg/wBVE4yyWhM" passHref>
				<a target="_blank" rel="noreferrer" title="discord">
					<FaDiscord className="w-5 h-5" />
				</a>
			</Link>
		</nav>
	);
}

export { PageMenu };
export type { PublicPageMenuProps, InternalPageMenuProps };
