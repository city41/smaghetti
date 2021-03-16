import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { NoSaveStatesDisclaimerModal } from './NoSaveStatesDisclaimerModal';

const meta: Meta = {
	title: 'NoSaveStatesDisclaimerModal',
	component: NoSaveStatesDisclaimerModal,
};

export default meta;

export const Basic = () => {
	return <NoSaveStatesDisclaimerModal forceOpen />;
};
