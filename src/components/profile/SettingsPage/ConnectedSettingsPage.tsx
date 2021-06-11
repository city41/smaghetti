import React, { useEffect, useState } from 'react';
import localForage from 'localforage';
import { SettingsPage } from './SettingsPage';
import { client } from '../../../remoteData/client';
import { SignInJoinModal } from '../../auth/SignInJoinModal';
import { ROM_KEY } from '../../FileLoader/FileLoaderModal/FileLoaderModal';

function ConnectedSettingsPage() {
	const [localUser, setLocalUser] = useState(client.auth.user());

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setLocalUser(client.auth.user());
		});
	}, []);

	async function handleClearRom() {
		try {
			await localForage.removeItem(ROM_KEY);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log('localForage error', e);
		}
	}

	if (!localUser) {
		return (
			<SignInJoinModal
				onUser={(user) => setLocalUser(user)}
				onClose={() => {
					window.location.replace('/');
				}}
			/>
		);
	}

	return <SettingsPage onClearRom={handleClearRom} />;
}

export { ConnectedSettingsPage };
