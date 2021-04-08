import React from 'react';
import { Meta } from '@storybook/react';

import { Root } from './Root';

const meta: Meta = {
	title: 'Layout/Root',
	component: Root,
};

export default meta;

export const Basic = () => {
	return (
		<Root title="basic" metaDescription="meta">
			A basic page
		</Root>
	);
};
