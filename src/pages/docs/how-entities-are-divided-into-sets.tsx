import React from 'react';
import { Root } from '../../components/layout/Root';
import clsx from 'clsx';
import typographyStyles from '../../styles/typography.module.css';

function NextHowEntitiesAreDividedIntoSetsPage() {
	return (
		<Root title="How entities are divided into sets" metaDescription="">
			<div
				className={clsx(typographyStyles.typography, 'max-w-2xl mx-auto pt-16')}
			>
				<h1>How entities are divided into sets</h1>
				<p>TODO: actually write this :)</p>
			</div>
		</Root>
	);
}

export default NextHowEntitiesAreDividedIntoSetsPage;
