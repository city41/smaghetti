import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';

import { ArchiveStarburst } from './ArchiveStarburst';
import { ArchiveModal } from './ArchiveModal';

const meta: Meta = {
	title: 'ArchivePreviewStarburst',
	component: ArchiveStarburst,
};

export default meta;

export const EditorMode = (): ReactElement => {
	return <ArchiveStarburst />;
};

export const EditorModeModal = (): ReactElement => {
	return <ArchiveModal isOpen={true} />;
};
