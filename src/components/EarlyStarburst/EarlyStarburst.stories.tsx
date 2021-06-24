import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';

import { EarlyStarburst } from './EarlyStarburst';
import { EarlyModal } from './EarlyModal';

const meta: Meta = {
	title: 'EarlyPreviewStarburst',
	component: EarlyStarburst,
};

export default meta;

export const EditorMode = (): ReactElement => {
	return <EarlyStarburst />;
};

export const EditorModeModal = (): ReactElement => {
	return <EarlyModal isOpen={true} />;
};
