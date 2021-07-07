import React from 'react';
import { Root } from '../../layout/Root';
import { EntityPopularity } from '../EntityPopularity';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { stats } from '../../../stats/stats';

type InternalStatsPageProps = {
	allFilesReady: boolean;
};

function StatsPage({ allFilesReady }: InternalStatsPageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Level Statistics" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<p className="bg-red-200 -mx-4 p-4 mb-8 text-gray-900">
						This is a new page, pretty raw and simple so far, but it will get
						better
					</p>
					{allFilesReady && (
						<EntityPopularity entitiesByCount={stats.entitiesByCount} />
					)}
					<p className="mt-8 text-gray-500 text-xs text-right">
						<span className="text-gray-300">Stats last calculated:</span>{' '}
						{stats.lastUpdated}
					</p>
				</div>
			</Root>
		</>
	);
}

export { StatsPage };
