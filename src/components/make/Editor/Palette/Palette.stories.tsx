import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { Palette } from './Palette';

const meta: Meta = {
	title: 'Palette',
	component: Palette,
};

export default meta;

export const Basic = () => {
	return (
		<div className="inline-block p-4 bg-blue-200">
			<Palette
				paletteEntries={[
					{ brushMode: 'tile', type: 'brick' },
					{ brushMode: 'tile', type: 'coin' },
					{ brushMode: 'entity', type: 'Goomba' },
				]}
				onPaletteEntryIndexChosen={() => {}}
				onPaletteEntryRemove={() => {}}
				onPaletteEntryAdded={() => {}}
			/>
		</div>
	);
};
