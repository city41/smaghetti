import React, { useEffect, useState } from 'react';
import { client } from '../../../../remoteData/client';

import { saveLevel, saveLevelCopy } from '../../editorSlice';
import { AppState, dispatch } from '../../../../store';

import { SaveButton } from './SaveButton';
import type { PublicSaveButtonProps } from './SaveButton';
import { SignInJoinModal } from '../../../auth/SignInJoinModal';
import { useSelector } from 'react-redux';

function ConnectedSaveButton(props: PublicSaveButtonProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(!!client.auth.user());
	const [showModal, setShowModal] = useState(false);
	const { saveLevelState, savedLevelId } = useSelector(
		(s: AppState) => s.editor.present
	);

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

	function handleSaveACopyClick() {
		if (isLoggedIn) {
			dispatch(saveLevelCopy());
		} else {
			// this should never happen, but doesn't hurt to be defensive
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
			onClose={() => setShowModal(false)}
			onUser={handleUser}
		/>
	) : null;

	return (
		<>
			<SaveButton
				{...props}
				onSaveClick={handleSaveClick}
				onSaveACopyClick={savedLevelId ? handleSaveACopyClick : undefined}
				saveLevelState={saveLevelState}
			/>
			{modal}
		</>
	);
}

export { ConnectedSaveButton };
