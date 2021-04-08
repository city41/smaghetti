import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';

import { EarlyPreviewStarburst } from './EarlyPreviewStarburst';
import { EarlyPreviewModal } from './EarlyPreviewModal';

const meta: Meta = {
	title: 'EarlyPreviewStarburst',
	component: EarlyPreviewStarburst,
};

export default meta;

export const EditorMode = (): ReactElement => {
	return <EarlyPreviewStarburst />;
};

export const EditorModeModal = (): ReactElement => {
	return <EarlyPreviewModal isOpen={true} />;
};
