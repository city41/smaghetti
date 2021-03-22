import React, { useEffect, useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { loadProfile } from '../profileSlice';
import { client } from '../../../remoteData/client';
import { SignInJoinModal } from '../../auth/SignInJoinModal';

function ConnectedProfilePage() {
	const [localUser, setLocalUser] = useState(client.auth.user());
	const dispatch = useDispatch();

	const { loading, user, levels } = useSelector(
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
		return <SignInJoinModal onUser={(user) => setLocalUser(user)} />;
	}

	return <ProfilePage loading={loading} user={user} levels={levels} />;
}

export { ConnectedProfilePage };
