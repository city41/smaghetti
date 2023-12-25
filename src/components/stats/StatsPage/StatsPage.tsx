import React from 'react';
import { Root } from '../../layout/Root';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { stats } from '../../../stats/stats';
import { EntityPopularity } from '../EntityPopularity';
import { UnusedEntities } from '../UnusedEntities';
import { RoomCounts } from '../RoomCounts';

type InternalStatsPageProps = {
	allFilesReady: boolean;
};

function StatsPage({ allFilesReady }: InternalStatsPageProps) {
	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Level Statistics" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					{allFilesReady && (
						<div>
							<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
								<EntityPopularity entitiesByCount={stats.entitiesByCount} />
							</div>
							<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
								<UnusedEntities entitiesByCount={stats.entitiesByCount} />
							</div>
							<div className="mt-16 pb-16 px-4 sm:px-0 border-b border-dotted border-gray-500 last:border-0">
								<RoomCounts
									roomsPerLevelPercentages={stats.roomsPerLevelPercentages}
								/>
							</div>
						</div>
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
