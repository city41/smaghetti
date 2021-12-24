import React from 'react';
import { Root } from '../../layout/Root';

type InternalCreatorLevelsPageProps = {
	creator: string;
};

function CreatorLevelsPage({ creator }: InternalCreatorLevelsPageProps) {
	return (
		<Root
			metaDescription={`All the levels ${creator} has made`}
			title={`${creator}'s levels`}
		>
			{creator}&apos;s levels
		</Root>
	);
}

export { CreatorLevelsPage };
