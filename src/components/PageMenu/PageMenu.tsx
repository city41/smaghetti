import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './PageMenu.module.css';

type PublicPageMenuProps = {
	className?: string;
	position: 'top' | 'bottom';
	children?: ReactNode;
};

type InternalPageMenuProps = {
	isLoggedIn: boolean;
	onSignInClicked: () => void;
	onJoinClicked: () => void;
};

function PageMenu({
	className,
	position,
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
				'p-4 bg-gray-700 border-white flex flex-row space-x-4 items-center justify-center',
				{
					'rounded-t-xl border-l-4 border-t-4 border-r-4':
						position === 'bottom',
					'rounded-b-xl border-l-4 border-b-4 border-r-4': position === 'top',
				}
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
