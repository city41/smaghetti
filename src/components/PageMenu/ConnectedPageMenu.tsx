import React, { useEffect, useState } from 'react';
import {
	client,
	isLoggedIn as supabaseIsLoggedIn,
} from '../../remoteData/client';
import { PageMenu, PublicPageMenuProps } from './PageMenu';
import { SignInJoinModal } from '../auth/SignInJoinModal';
import type { SignInJoinModalMode } from '../auth/SignInJoinModal';

function ConnectedPageMenu(props: PublicPageMenuProps) {
	const [
		signInModalMode,
		setSignInJoinModalMode,
	] = useState<SignInJoinModalMode | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(supabaseIsLoggedIn());

	useEffect(() => {
		client.auth.onAuthStateChange(() => {
			setIsLoggedIn(supabaseIsLoggedIn());
		});
	}, []);

	return (
		<>
			{signInModalMode !== null && !isLoggedIn && (
				<SignInJoinModal
					initialMode={signInModalMode}
					onClose={() => setSignInJoinModalMode(null)}
					onUser={() => setIsLoggedIn(true)}
				/>
			)}
			<PageMenu
				{...props}
				isLoggedIn={isLoggedIn}
				onSignInClicked={() => setSignInJoinModalMode('sign-in')}
				onJoinClicked={() => setSignInJoinModalMode('join')}
			/>
		</>
	);
}

export { ConnectedPageMenu };
