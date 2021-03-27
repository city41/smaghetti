import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Root } from '../../layout/Root';
import { LevelEntry } from './LevelEntry';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { LoadingBar } from '../../LoadingBar';

import tabStyles from '../../../styles/tabs.module.css';

type ProfilePageProps = {
	allFilesReady: boolean;
	loadState: 'dormant' | 'loading' | 'success' | 'error';
	user: User | null;
	levels: Level[];
	onEditLevel: (level: Level) => void;
	onDeleteLevel: (level: Level) => void;
	onDownloadLevel: (level: Level) => void;
};

const tabs = ['Levels', 'Settings'];

function ProfilePage({
	allFilesReady,
	loadState,
	user,
	levels,
	onEditLevel,
	onDeleteLevel,
	onDownloadLevel,
}: ProfilePageProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	let body;

	let currentTabBody;

	switch (tabs[currentIndex]) {
		case 'Levels':
			currentTabBody = (
				<div
					className="grid items-start"
					style={{
						gridTemplateColumns: 'repeat(auto-fill, 400px)',
						columnGap: '4rem',
						rowGap: '4rem',
					}}
				>
					{levels.map((l) => {
						return (
							<LevelEntry
								key={l.id}
								level={l}
								onEdit={() => onEditLevel(l)}
								onDelete={() => onDeleteLevel(l)}
								onDownload={() => onDownloadLevel(l)}
							/>
						);
					})}
					{levels.length === 0 && (
						<div>
							You have no levels, who not{' '}
							<Link href="/make" passHref>
								<a className="text-blue-300 cursor-pointer">go make one?</a>
							</Link>
						</div>
					)}
				</div>
			);
			break;

		case 'Settings':
			currentTabBody = <div>No settings yet. Stay tuned.</div>;
			break;
	}

	switch (loadState) {
		case 'dormant':
		case 'loading':
			body = (
				<div className="mt-24 grid place-items-center">
					<div>
						<p className="text-center">Grabbing your data...</p>
						<LoadingBar className="w-48" percent={100} />
					</div>
				</div>
			);
			break;

		case 'error':
			body = (
				<div className="mt-24 grid place-items-center">
					<div className="inline-block p-4 bg-red-100 text-red-900">
						An error occurred, try refreshing the page
					</div>
				</div>
			);
			break;

		case 'success':
			if (!user || !levels) {
				throw new Error(
					'ProfilePage: loadState indicates success, but there is missing data'
				);
			}

			body = (
				<>
					<div className="py-8 bg-gray-800">
						<div className="max-w-6xl mx-auto">
							<h1 className="text-3xl font-bold">{user.username}</h1>
						</div>
					</div>
					<div className="max-w-6xl mx-auto">
						<ul className={clsx(tabStyles.tabs, 'mb-8')}>
							{tabs.map((t, i) => {
								return (
									<li
										key={t}
										className={clsx({
											[tabStyles.currentTab]: currentIndex === i,
										})}
										onClick={() => setCurrentIndex(i)}
									>
										{t}
									</li>
								);
							})}
						</ul>
						{currentTabBody}
					</div>
				</>
			);
			break;
	}

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Profile" metaDescription="">
				{allFilesReady && body}
			</Root>
		</>
	);
}

export { ProfilePage };
