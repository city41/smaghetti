import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { EarlyPreviewStarburst } from './EarlyPreviewStarburst';
import { EarlyPreviewModal } from './EarlyPreviewModal';

const meta: Meta = {
	title: 'EarlyPreviewStarburst',
	component: EarlyPreviewStarburst,
};

export default meta;

export const EditorMode = () => {
	return <EarlyPreviewStarburst mode="editor" />;
};

export const EditorModeModal = () => {
	return <EarlyPreviewModal isOpen={true} mode="editor" />;
};

export const PlayerModeModal = () => {
	return <EarlyPreviewModal isOpen={true} mode="player" />;
};
