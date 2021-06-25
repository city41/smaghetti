import React from 'react';
import { Meta } from '@storybook/react';

import { KeyboardHelpModal } from './KeyboardHelpModal';

const meta: Meta = {
	title: 'KeyboardHelpModal',
	component: KeyboardHelpModal,
};

export default meta;

export const Basic = () => {
	return <KeyboardHelpModal isOpen />;
};
