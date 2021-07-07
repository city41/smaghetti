import React from 'react';
import { Root } from '../../layout/Root';
import { EntityPopularity } from '../EntityPopularity';
// import { stats } from '../../../stats/stats';
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
					<h1 className="font-bold text-2xl text-center mb-8">
						Entity Popularity
					</h1>
					{allFilesReady && (
						<EntityPopularity entitiesByCount={stats.entitiesByCount} />
					)}
				</div>
			</Root>
		</>
	);
}

export { StatsPage };
