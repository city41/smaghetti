import React from 'react';
import clsx from 'clsx';
import styles from './Root.module.css';
import logoPng from '../../images/logo.png';
import Link from 'next/link';
import { ImPointUp } from 'react-icons/im';

type HeaderProps = {
	className?: string;
	highlightEditor?: boolean;
};

function MenuLink(props: JSX.IntrinsicElements['a']) {
	return (
		<a
			{...props}
			className={clsx(
				props.className,
				'text-link cursor-pointer hover:underline'
			)}
		/>
	);
}

function HighlightEditor() {
	return (
		<Link href="/editor">
			<div className="hidden sm:flex absolute -bottom-16 -left-4 p-2 bg-green-500 rounded-lg flex-row items-center space-x-2">
				<ImPointUp className="w-8 h-8" />
				<div className="w-20 text-sm text-center">try it here</div>
			</div>
		</Link>
	);
}

function Header({ className, highlightEditor }: HeaderProps) {
	return (
		<header className={clsx(className, 'bg-gray-900 w-full')}>
			<div className="mx-auto max-w-7xl w-full">
				<div className="pl-20 sm:pl-8  h-32 sm:h-16 mt-2 mb-4 sm:mt-0 sm:mb-0 flex flex-col flex-wrap sm:flex-row items-start sm:items-center justify-start space-y-2 sm:space-y-0 sm:space-x-5 max-w-7xl mx-auto w-full">
					<div className="absolute top-1 left-1 sm:static flex flex-row items-center">
						<a href="/" className={clsx(styles.logo, 'block lg:-ml-4')}>
							<img
								className="w-full h-full"
								src={logoPng}
								alt="smaghetti logo"
								width={52}
								height={52}
							/>
						</a>
						<div className="hidden sm:block text-2xl text-focal font-light text-center pl-4">
							<a href="/">Smaghetti</a>
						</div>
					</div>
					<div className={clsx({ relative: highlightEditor })}>
						<MenuLink href="/editor">editor</MenuLink>
						{highlightEditor && <HighlightEditor />}
					</div>
					<MenuLink href="/levels">levels</MenuLink>
					<MenuLink href="/whats-new">what&apos;s new</MenuLink>
					<MenuLink href="/roadmap">roadmap</MenuLink>
					<MenuLink href="/credits">credits</MenuLink>
					<MenuLink
						href="https://www.reddit.com/r/smaghetti/"
						target="_blank"
						rel="noreferrer"
						title="Smaghetti subreddit"
					>
						subreddit
					</MenuLink>
					<MenuLink
						href="https://github.com/city41/smaghetti"
						target="_blank"
						rel="noreferrer"
						title="GitHub repo"
					>
						github
					</MenuLink>
				</div>
			</div>
		</header>
	);
}

export { Header };
