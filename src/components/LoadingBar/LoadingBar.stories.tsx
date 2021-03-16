import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { LoadingBar } from './LoadingBar';

const meta: Meta = {
	title: 'LoadingBar',
	component: LoadingBar,
};

export default meta;

export const Basic = () => {
	return <LoadingBar percent={100} />;
};

export const Filling = () => {
	return <LoadingBar percent={40} />;
};
