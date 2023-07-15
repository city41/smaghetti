import React from 'react';
import { PageMenu, PublicPageMenuProps } from './PageMenu';

function ConnectedPageMenu(props: PublicPageMenuProps) {
	return (
		<>
			<PageMenu
				{...props}
				isLoggedIn={false}
				onSignInClicked={() => {}}
				onJoinClicked={() => {}}
			/>
		</>
	);
}

export { ConnectedPageMenu };
