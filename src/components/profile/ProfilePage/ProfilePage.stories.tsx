import React from 'react';
import { Meta } from '@storybook/react';

import { ProfilePage } from './ProfilePage';

const meta: Meta = {
	title: 'ProfilePage',
	component: ProfilePage,
};

export default meta;

export const Loading = () => {
	return (
		<ProfilePage
			allFilesReady={false}
			loadState="loading"
			user={null}
			levels={[]}
		/>
	);
};

export const Error = () => {
	return (
		<ProfilePage
			allFilesReady={false}
			loadState="error"
			user={null}
			levels={[]}
		/>
	);
};

export const Basic = () => {
	return (
		<ProfilePage
			allFilesReady={true}
			loadState="success"
			user={{ id: '1', username: 'Mario' }}
			levels={[]}
		/>
	);
};
