import React from 'react';
import { Meta } from '@storybook/react';

import { PlainIconButton } from './PlainIconButton';
import { IconPencil } from '../../icons';

const meta: Meta = {
	title: 'PlainIconButton',
	component: PlainIconButton,
};

export default meta;

export const Basic = () => {
	return (
		<div className="p-4 bg-blue-300">
			<PlainIconButton icon={IconPencil} label="undo" />
		</div>
	);
};

export const Loading = () => {
	return (
		<div className="p-4 bg-blue-300">
			<PlainIconButton icon={IconPencil} label="undo" loading />
		</div>
	);
};
