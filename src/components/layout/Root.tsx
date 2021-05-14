import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ImPointUp } from 'react-icons/im';
import { Head } from './Head';
import { Footer } from './Footer';

import logoPng from '../../images/logo.png';

import styles from './Root.module.css';

type RootProps = {
	className?: string;
	title: string;
	subheading?: React.ReactNode;
	metaDescription: string;
	socialMediaImg?: string;
	highlightEditor?: boolean;
	children: React.ReactNode;
};

function MenuLink(props: JSX.IntrinsicElements['a']) {
	return (
		<a
			className={clsx(
				props.className,
				'text-link cursor-pointer hover:underline'
			)}
			{...props}
		/>
	);
}

function HighlightEditor() {
	return (
		<Link href="/make">
			<div className="absolute -bottom-14 -left-4 p-2 bg-green-500 rounded-lg flex flex-row items-center space-x-2">
				<ImPointUp className="w-8 h-8" />
				<div className="w-20 text-sm text-center">try it here</div>
			</div>
		</Link>
	);
}

function Root({
	className,
	title,
	subheading,
	metaDescription,
	socialMediaImg,
	highlightEditor,
	children,
}: RootProps) {
	return (
		<div
			className={clsx(
				className,
				styles.background,
				'flex flex-col items-stretch',
				{}
			)}
		>
			<Head
				title={title}
				metaDescription={metaDescription}
				metaImg={socialMediaImg}
			/>
			<header className="xborder-b border-gray-500 bg-gray-900">
				<div className="bg-heading h-16 flex flex-row items-center justify-between lg:px-4">
					<div className="flex flex-row items-center justify-start space-x-6 max-w-7xl mx-auto w-full">
						<div className="flex flex-row items-center">
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
							<MenuLink
								href="/make"
								className={clsx({ 'border-b-2 border-white': highlightEditor })}
							>
								editor
							</MenuLink>
							{highlightEditor && <HighlightEditor />}
						</div>
						<MenuLink href="/tools">tools</MenuLink>
						<MenuLink href="/whats-new">what&apos;s new</MenuLink>
						<MenuLink href="/roadmap">roadmap</MenuLink>
					</div>
				</div>
				{subheading && (
					<div className="hidden sm:block py-1 px-2 bg-subheading">
						<div className="w-full max-w-6xl mx-auto flex flex-row items-center">
							{subheading}
						</div>
					</div>
				)}
			</header>
			<main role="main" className={clsx(styles.main, 'flex-1 w-full mx-auto')}>
				{children}
			</main>
			<Footer className="mt-16" />
		</div>
	);
}

export { Root };
