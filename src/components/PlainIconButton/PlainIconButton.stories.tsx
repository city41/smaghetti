import React from 'react';
import { Meta } from '@storybook/react';

import { PlainIconButton } from './PlainIconButton';
import { FaPencilAlt } from 'react-icons/fa';

const meta: Meta = {
	title: 'PlainIconButton',
	component: PlainIconButton,
};

export default meta;

export const Basic = () => {
	return (
		<div className="p-4 bg-blue-300">
			<PlainIconButton icon={FaPencilAlt} label="undo" />
		</div>
	);
};

export const Loading = () => {
	return (
		<div className="p-4 bg-blue-300">
			<PlainIconButton icon={FaPencilAlt} label="undo" loading />
		</div>
	);
};
