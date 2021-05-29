import React from 'react';
import { Meta } from '@storybook/react';

import { MetadataMenu } from './MetadataMenu';

const meta: Meta = {
	title: 'MetadataMenu',
	component: MetadataMenu,
};

export default meta;

export const Basic = () => {
	return (
		<MetadataMenu
			levelName="my level"
			isManagingLevel={false}
			currentRoomIndex={1}
			roomCount={3}
			onManageLevelClick={() => {}}
			onRoomIndexChange={() => {}}
		/>
	);
};

export const IsManaging = () => {
	return (
		<MetadataMenu
			levelName="my level"
			isManagingLevel={true}
			currentRoomIndex={1}
			roomCount={3}
			onManageLevelClick={() => {}}
			onRoomIndexChange={() => {}}
		/>
	);
};
