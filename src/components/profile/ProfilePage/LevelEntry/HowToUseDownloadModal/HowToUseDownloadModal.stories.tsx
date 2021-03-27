import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { HowToUseDownloadModal } from './HowToUseDownloadModal';

const meta: Meta = {
	title: 'HowToUseDownloadModal',
	component: HowToUseDownloadModal,
};

export default meta;

export const Basic = () => {
	return <HowToUseDownloadModal isOpen onRequestClose={() => {}} />;
};
