import React from 'react';
import { Meta } from '@storybook/react';

import { LoadingBar } from './LoadingBar';

const meta: Meta = {
	title: 'LoadingBar',
	component: LoadingBar,
};

export default meta;

export const Indeterminate = () => {
	return <LoadingBar percent={-1} />;
};

export const Filling = () => {
	return <LoadingBar percent={40} />;
};
