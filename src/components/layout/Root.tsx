import React from 'react';
import clsx from 'clsx';
import { Head } from './Head';
import { Footer } from './Footer';

import styles from './Root.module.css';
import { Header } from './Header';

type RootProps = {
	className?: string;
	title: string;
	metaDescription: string;
	socialMediaImg?: string;
	children: React.ReactNode;
};

function Root({
	className,
	title,
	metaDescription,
	socialMediaImg,
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
			<Header />
			<main role="main" className={clsx(styles.main, 'flex-1 w-full mx-auto')}>
				{children}
			</main>
			<Footer className="mt-16" />
		</div>
	);
}

export { Root };
