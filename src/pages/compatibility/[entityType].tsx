import React from 'react';
import { Provider } from 'react-redux';

import { CompatibilityPage } from '../../components/compatibility/CompatibilityPage';
import type { PublicCompatibilityPageProps } from '../../components/compatibility/CompatibilityPage/CompatibilityPage';
import { store } from '../../store';
import {
	GetStaticPathsContext,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { entityMap, EntityType } from '../../entities/entityMap';

export function getStaticPaths(_context: GetStaticPathsContext) {
	const entityTypes = Object.keys(entityMap);

	return {
		paths: entityTypes.map((entityType) => {
			return { params: { entityType } };
		}),
		fallback: false,
	};
}

export function getStaticProps(
	context: GetStaticPropsContext
): GetStaticPropsResult<PublicCompatibilityPageProps> {
	const entityType = context.params!.entityType as EntityType;

	return {
		props: {
			entityType,
		},
	};
}

function NextCompatibilityEntityTypePage(props: PublicCompatibilityPageProps) {
	return (
		<Provider store={store}>
			<CompatibilityPage {...props} />
		</Provider>
	);
}

export default NextCompatibilityEntityTypePage;
