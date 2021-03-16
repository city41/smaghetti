import React from 'react';
import { Meta } from '@storybook/react';

import { ControlsBanner } from './ControlsBanner';
import { ControlsHelpModal } from './ControlsHelpModal';

const meta: Meta = {
	title: 'ControlsBanner',
	component: ControlsBanner,
};

export default meta;

export const Basic = () => {
	return (
		<div className="bg-blue-100 p-2">
			<ControlsBanner />
		</div>
	);
};

export const HelpModal = () => {
	return <ControlsHelpModal isOpen onRequestClose={() => {}} />;
};
