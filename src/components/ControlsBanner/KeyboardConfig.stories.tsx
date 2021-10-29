import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';
import { KeyboardConfig } from './KeyboardConfig';

const meta: Meta = {
	title: 'KeyboardConfig',
	component: KeyboardConfig,
};

export default meta;

export const Basic = (): ReactElement => {
	return <KeyboardConfig />;
};
