import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';

import { StaticStarburst } from './StaticStarburst';
import { StaticModal } from './StaticModal';

const meta: Meta = {
	title: 'StaticStarburst',
	component: StaticStarburst,
};

export default meta;

export const EditorMode = (): ReactElement => {
	return <StaticStarburst />;
};

export const EditorModeModal = (): ReactElement => {
	return <StaticModal isOpen={true} />;
};
