import React from 'react';
import localForage from 'localforage';
import { SettingsPage } from './SettingsPage';

function ConnectedSettingsPage() {
	async function handleClearRom() {
		try {
			await localForage.clear();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error('localForage error', e);
		}
	}

	return <SettingsPage onClearRom={handleClearRom} />;
}

export { ConnectedSettingsPage };
