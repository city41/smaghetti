import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './PageMenu.module.css';

type PublicPageMenuProps = {
	className?: string;
	children?: ReactNode;
};

type InternalPageMenuProps = {
	isLoggedIn: boolean;
	onSignInClicked: () => void;
	onJoinClicked: () => void;
};

function PageMenu({
	className,
	isLoggedIn,
	onSignInClicked,
	onJoinClicked,
	children,
}: PublicPageMenuProps & InternalPageMenuProps) {
	const hasChildren = React.Children.count(children) > 0;

	const menu = isLoggedIn ? (
		<>
			<Link href="/profile" passHref>
				<a className={clsx({ [styles.preDivider]: hasChildren })}>profile</a>
			</Link>
		</>
	) : (
		<>
			<a
				className={clsx({ [styles.preDivider]: hasChildren })}
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
				'p-4 bg-gray-700 flex flex-row space-x-4 items-center justify-center'
			)}
		>
			{children}
			{menu}
			<Link href="/" passHref>
				<a className={styles.homeLink} />
			</Link>
		</nav>
	);
}

export { PageMenu };
export type { PublicPageMenuProps, InternalPageMenuProps };
