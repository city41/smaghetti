import React from 'react';
import { Meta } from '@storybook/react';

import { SaveButton } from './SaveButton';

const meta: Meta = {
	title: 'SaveButton',
	component: SaveButton,
};

export default meta;

export const Basic = () => {
	return <SaveButton onSaveClick={() => {}} saveLevelState="dormant" />;
};

export const Saving = () => {
	return <SaveButton onSaveClick={() => {}} saveLevelState="saving" />;
};

export const SaveSuccess = () => {
	return <SaveButton onSaveClick={() => {}} saveLevelState="success" />;
};

export const SaveError = () => {
	return <SaveButton onSaveClick={() => {}} saveLevelState="error" />;
};

export const WithSaveACopy = () => {
	return (
		<SaveButton
			onSaveClick={() => {}}
			onSaveACopyClick={() => {}}
			saveLevelState="dormant"
		/>
	);
};
