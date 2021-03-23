import React, { useEffect, useState } from 'react';
import { client } from '../../../../remoteData/client';
import { bindActionCreators } from 'redux';

import { saveLevel } from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { SaveButton } from './SaveButton';
import type { PublicSaveButtonProps } from './SaveButton';
import { SignInJoinModal } from '../../../auth/SignInJoinModal';
import { useSelector } from 'react-redux';

const actions = bindActionCreators(
	{
		onSaveLevel: saveLevel,
	},
	dispatch
);

function ConnectedSaveButton(props: PublicSaveButtonProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(!!client.auth.user());
	const [showModal, setShowModal] = useState(false);
	const { saveLevelState } = useSelector((s: AppState) => s.editor.present);

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setIsLoggedIn(!!client.auth.user());
		});
	}, []);

	function handleSaveClick() {
		if (isLoggedIn) {
			dispatch(saveLevel());
		} else {
			setShowModal(true);
		}
	}

	function handleUser() {
		setShowModal(false);
		dispatch(saveLevel());
	}

	const modal = showModal ? (
		<SignInJoinModal
			initialMode="join-to-save"
			onCancel={() => setShowModal(false)}
			onUser={handleUser}
		/>
	) : null;

	return (
		<>
			<SaveButton
				{...props}
				onClick={handleSaveClick}
				saveLevelState={saveLevelState}
			/>
			{modal}
		</>
	);
}

export { ConnectedSaveButton };
