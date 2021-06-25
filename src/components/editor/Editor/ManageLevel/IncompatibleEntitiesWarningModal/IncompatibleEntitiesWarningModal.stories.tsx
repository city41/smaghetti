import React from 'react';
import { Meta } from '@storybook/react';

import { IncompatibleEntitiesWarningModal } from './IncompatibleEntitiesWarningModal';

const meta: Meta = {
	title: 'IncompatibleEntitiesWarningModal',
	component: IncompatibleEntitiesWarningModal,
};

export default meta;

export const Basic = () => {
	return (
		<IncompatibleEntitiesWarningModal
			isOpen
			onCancel={() => {}}
			onProceed={() => {}}
		/>
	);
};
