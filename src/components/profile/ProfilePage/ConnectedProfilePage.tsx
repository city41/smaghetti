import React, { useEffect, useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, dispatch } from '../../../store';
import { loadProfile, deleteLevel } from '../profileSlice';
import { client } from '../../../remoteData/client';
import { SignInJoinModal } from '../../auth/SignInJoinModal';
import { bindActionCreators } from 'redux';

const actions = bindActionCreators(
	{
		onDeleteLevel: deleteLevel,
	},
	dispatch
);

function ConnectedProfilePage() {
	const [localUser, setLocalUser] = useState(client.auth.user());

	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const { loadState, user, levels } = useSelector(
		(state: AppState) => state.profile
	);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setLocalUser(client.auth.user());
		});
	}, []);

	useEffect(() => {
		if (localUser) {
			dispatch(loadProfile());
		}
	}, [localUser, dispatch]);

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

	return (
		<ProfilePage
			allFilesReady={allFilesReady}
			loadState={loadState}
			user={user}
			levels={levels}
			{...actions}
		/>
	);
}

export { ConnectedProfilePage };
