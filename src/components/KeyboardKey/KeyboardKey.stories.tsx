import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { KeyboardKey } from './KeyboardKey';

const meta: Meta = {
	title: 'KeyboardKey',
	component: KeyboardKey,
};

export default meta;

export const Basic = () => {
	return (
		<div className="p-4 bg-blue-300">
			<KeyboardKey>t</KeyboardKey>
		</div>
	);
};
