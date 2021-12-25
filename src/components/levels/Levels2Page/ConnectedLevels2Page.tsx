import React, { useState } from 'react';
import { Levels2Page } from './Levels2Page';
import type { PublicLevels2PageProps } from './Levels2Page';

function ConnectedLevels2Page(props: PublicLevels2PageProps) {
	const [page, _setPage] = useState(0);

	return (
		<Levels2Page
			{...props}
			currentPage={0}
			onPreviousClick={() => {}}
			onNextClick={() => {}}
		/>
	);
}

export { ConnectedLevels2Page };
