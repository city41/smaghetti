import React from 'react';
import { Root } from '../../layout/Root';
// import { LevelEntry } from '../../levels/components/levelEntry';

type ProfilePageProps = {
	loading: boolean;
	user: User | null;
	levels: Level[] | null;
};

function ProfilePage({ loading, user, levels }: ProfilePageProps) {
	if (loading || !user || !levels) {
		return <div>loading...</div>;
	} else {
		return (
			<Root title="Profile" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<h1 className="text-3xl font-bold mb-16">{user?.username}</h1>
					{levels.map((l) => {
						return <div key={l.id}>level with id {l.id}</div>;
					})}
				</div>
			</Root>
		);
	}
}

export { ProfilePage };
