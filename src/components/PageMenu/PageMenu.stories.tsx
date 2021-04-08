import React from 'react';
import { Meta } from '@storybook/react';

import { PageMenu } from './PageMenu';

const meta: Meta = {
	title: 'PageMenu',
	component: PageMenu,
};

export default meta;

export const Basic = () => {
	return (
		<PageMenu
			anchor="bottom"
			isLoggedIn={false}
			onSignInClicked={() => {}}
			onJoinClicked={() => {}}
		/>
	);
};
