import React from 'react';
import { Root } from '../../layout/Root';
import { LevelEntry } from './LevelEntry';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';

type ProfilePageProps = {
	allFilesReady: boolean;
	loading: boolean;
	user: User | null;
	levels: Level[] | null;
};

function ProfilePage({
	allFilesReady,
	loading,
	user,
	levels,
}: ProfilePageProps) {
	if (loading || !user || !levels) {
		return <div>loading...</div>;
	} else {
		return (
			<>
				<FileLoaderModal isOpen={!allFilesReady} />
				<Root title="Profile" metaDescription="">
					<div className="max-w-2xl mx-auto pt-16">
						<h1 className="text-3xl font-bold">{user.username}</h1>
						<h2 className="text-2xl font-bold mb-16">Your Levels</h2>
						{allFilesReady
							? levels.map((l) => {
									return <LevelEntry key={l.id} level={l} />;
							  })
							: null}
					</div>
				</Root>
			</>
		);
	}
}

export { ProfilePage };
