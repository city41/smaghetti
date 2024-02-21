import React from 'react';
import { Meta } from '@storybook/react';

import { SaveButton } from './SaveButton';

const meta: Meta = {
	title: 'SaveButton',
	component: SaveButton,
};

export default meta;

export const Basic = () => {
	return <SaveButton onClick={() => {}} saveLevelState="dormant" />;
};

export const Saving = () => {
	return <SaveButton onClick={() => {}} saveLevelState="saving" />;
};

export const SaveSuccess = () => {
	return <SaveButton onClick={() => {}} saveLevelState="success" />;
};

export const SaveError = () => {
	return <SaveButton onClick={() => {}} saveLevelState="error" />;
};
