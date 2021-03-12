import React from 'react';
import { Meta } from '@storybook/react';
import { Warning } from '../Warning';

const meta: Meta = {
	title: 'Warning',
	component: Warning,
};

export default meta;

export const Basic = () => {
	return <Warning>A basic warning</Warning>;
};
