import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { EarlyPreviewStarburst } from './EarlyPreviewStarburst';

const meta: Meta = {
	title: 'EarlyPreviewStarburst',
	component: EarlyPreviewStarburst,
};

export default meta;

export const EditorMode = () => {
	return <EarlyPreviewStarburst mode="editor" />;
};
