import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { PlayButton } from './PlayButton';

const meta: Meta = {
	title: 'PlayButton',
	component: PlayButton,
};

export default meta;

export const Basic = () => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<PlayButton
			isPlaying={isPlaying}
			onClick={() => setIsPlaying(!isPlaying)}
		/>
	);
};
