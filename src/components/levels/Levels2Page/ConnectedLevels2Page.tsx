import React from 'react';
import { Levels2Page } from './Levels2Page';
import type { PublicLevels2PageProps } from './Levels2Page';

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	return <Levels2Page {...props} />;
}

export { ConnectedLevels2Page };
