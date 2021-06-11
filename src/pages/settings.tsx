import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';
import { SettingsPage } from '../components/profile/SettingsPage';

export default function NextProfilePage() {
	return (
		<Provider store={store}>
			<SettingsPage />
		</Provider>
	);
}
