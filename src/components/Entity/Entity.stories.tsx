import React, { ReactElement } from 'react';

import { Entity } from './Entity';

export default {
	title: 'Entity',
	component: Entity,
};

export const Basic = (): ReactElement => <Entity type="Player" />;
