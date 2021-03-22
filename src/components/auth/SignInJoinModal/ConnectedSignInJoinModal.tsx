import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';

import { client } from '../../../remoteData/client';
import { setUsername } from '../../../remoteData';
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

  async function handleSignIn(credentials: Credentials) {
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
      await setUsername(result.user.id, credentials.username!);
      onUser(result.user);
    } else {
      setSupabaseError(result.error?.message ?? null);
    }
  }

  return (
    <SignInJoinModal
      {...publicProps}
      onJoin={handleJoin}
      onSignIn={handleSignIn}
      error={supabaseError}
    />
  );
}

export { ConnectedSignInJoinModal };
