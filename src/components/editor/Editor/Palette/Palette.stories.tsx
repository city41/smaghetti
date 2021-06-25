import React from 'react';
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
				paletteEntries={['Brick', 'Coin', 'Goomba']}
				validEntityTypes={['Brick', 'Coin', 'Goomba']}
				onPaletteEntryIndexChosen={() => {}}
				onPaletteEntryRemove={() => {}}
				onPaletteEntryAdded={() => {}}
			/>
		</div>
	);
};
