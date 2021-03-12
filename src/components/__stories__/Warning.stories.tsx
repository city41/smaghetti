import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Warning } from '../Warning';

const meta: Meta = {
	title: 'Warning',
	component: Warning,
};

export default meta;

export const SimpleWarning = () => {
	return <Warning>A basic warning</Warning>;
};
