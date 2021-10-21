import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { IconButton } from './IconButton';
import { IconButtonGroup } from './IconButtonGroup';
import { IconPencil } from '../../icons';

const meta: Meta = {
	title: 'IconButton',
	component: IconButton,
};

export default meta;

export const Basic = () => {
	return (
		<div className="p-4 bg-blue-300">
			<IconButton icon={IconPencil} label="undo" />
		</div>
	);
};

export const Loading = () => {
	return (
		<div className="p-4 bg-blue-300">
			<IconButton icon={IconPencil} label="undo" loading />
		</div>
	);
};

export const Alternate = () => {
	return (
		<div className="p-4 bg-blue-300">
			<IconButton icon={IconPencil} label="undo" alternate />
		</div>
	);
};

export const Anchored = () => {
	return (
		<div className="flex flex-row p-4 bg-blue-300 space-x-4">
			<IconButton icon={IconPencil} label="undo" anchor="top" />
			<IconButton icon={IconPencil} label="undo" anchor="left" />
			<IconButton icon={IconPencil} label="undo" anchor="right" />
			<IconButton icon={IconPencil} label="undo" anchor="bottom" />
			<IconButton icon={IconPencil} label="undo" anchor="top-left" />
			<IconButton icon={IconPencil} label="undo" anchor="top-right" />
		</div>
	);
};

export const Group = () => {
	return (
		<div className="p-4 bg-blue-300">
			<IconButtonGroup>
				<IconButton icon={IconPencil} label="undo" />
				<IconButton icon={IconPencil} label="redo" />
				<IconButton icon={IconPencil} label="more" />
			</IconButtonGroup>
		</div>
	);
};

export const ToggleGroup = () => {
	const [toggledIndex, setToggledIndex] = useState(0);
	return (
		<div className="p-4 bg-blue-300">
			<IconButtonGroup>
				{[0, 1, 2].map((i) => (
					<IconButton
						key={i}
						icon={IconPencil}
						label={`ind${i}`}
						toggled={toggledIndex === i}
						onClick={() => setToggledIndex(i)}
					/>
				))}
			</IconButtonGroup>
		</div>
	);
};

export const AnchoredLeftGroup = () => {
	return (
		<div className="p-4 bg-blue-300">
			<IconButtonGroup anchor="left">
				<IconButton icon={IconPencil} label="undo" anchor="left" />
				<IconButton icon={IconPencil} label="redo" anchor="left" />
				<IconButton icon={IconPencil} label="more" anchor="left" />
			</IconButtonGroup>
		</div>
	);
};
