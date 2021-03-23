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

function ConnectedSignInJoinModal({
	onUser,
	...publicProps
}: ConnectedSignInJoinModalProps) {
	const [supabaseError, setSupabaseError] = useState<null | string>(null);
	const [joinSuccessful, setJoinSuccessful] = useState(false);

	async function handleSignIn(credentials: Credentials) {
		// HACK; doesn't seem supabase updates the token if one already exists.
		// and one will exist if a user who has not verified their email is logged in.
		// so a workaround is just delete the token, signing in will then create a new one
		localStorage.removeItem('supabase.auth.token');
		const result = await client.auth.signIn(credentials);

		if (result.user) {
			onUser(result.user);
		} else {
			setSupabaseError(result.error?.message ?? null);
		}
	}

	async function handleJoin(credentials: Credentials) {
		const result = await client.auth.signUp(credentials);

		if (result.user) {
			setJoinSuccessful(true);
		} else {
			setSupabaseError(result.error?.message ?? 'Uh oh, something went wrong');
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
