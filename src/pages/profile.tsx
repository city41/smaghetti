import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';
import { ProfilePage } from '../components/profile/ProfilePage';

export default function GatsbyProfilePage() {
	return (
		<Provider store={store}>
			<ProfilePage />
		</Provider>
	);
}
