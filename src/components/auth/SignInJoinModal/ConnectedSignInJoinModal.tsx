import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';

import { client } from '../../../remoteData/client';
import { SignInJoinModal } from './SignInJoinModal';
import type {
	Credentials,
	PublicSignInJoinModalProps,
} from './SignInJoinModal';

type ConnectedSignInJoinModalProps = PublicSignInJoinModalProps & {
	onUser: (user: User) => void;
};

function convertCredentials(credentials: Credentials) {
	return {
		...credentials,
		email: credentials.email + '@smaghetti.com',
	};
}

function convertError(err: string): string {
	return err
		.replace(/email address/g, 'username')
		.replace(/email/g, 'username');
}

function ConnectedSignInJoinModal({
	onUser,
	...publicProps
}: ConnectedSignInJoinModalProps) {
	const [supabaseError, _setSupabaseError] = useState<null | string>(null);
	const [joinSuccessful, setJoinSuccessful] = useState(false);

	function setSupabaseError(error: string) {
		_setSupabaseError(convertError(error));
	}

	async function handleSignIn(credentials: Credentials) {
		const result = await client.auth.signIn(convertCredentials(credentials));

		if (result.user) {
			onUser(result.user);
		} else {
			setSupabaseError(convertError(result.error?.message ?? ''));
		}
	}

	async function handleJoin(credentials: Credentials) {
		const result = await client.auth.signUp(convertCredentials(credentials));

		if (result.user) {
			setJoinSuccessful(true);
		} else {
			setSupabaseError(
				convertError(result.error?.message ?? 'Uh oh, something went wrong')
			);
		}
	}

	return (
		<SignInJoinModal
			{...publicProps}
			onJoin={handleJoin}
			onSignIn={handleSignIn}
			error={supabaseError}
			joinSuccessful={joinSuccessful}
		/>
	);
}

export { ConnectedSignInJoinModal };
