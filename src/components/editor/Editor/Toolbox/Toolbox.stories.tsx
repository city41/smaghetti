import React from 'react';
import { Meta } from '@storybook/react';

import { Toolbox } from './Toolbox';

const meta: Meta = {
	title: 'Toolbox',
	component: Toolbox,
};

export default meta;

const noop = () => {};

export const Basic = () => {
	return (
		<Toolbox
			mouseMode="draw"
			onMouseModeChanged={noop}
			onResetViewport={noop}
			onScaleDecreased={noop}
			onScaleIncreased={noop}
			canIncreaseScale={false}
			canDecreaseScale={true}
			onUndo={noop}
			onRedo={noop}
			canUndo={true}
			canRedo={false}
			onToggleGrid={noop}
			showGrid={true}
			onEraseLevel={noop}
			isPlaying={false}
			disabled={false}
			disableSaving={false}
			onPlayClick={() => {}}
		/>
	);
};
