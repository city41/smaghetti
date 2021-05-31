import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getLevels } from '../../../../remoteData';
import { Root } from '../../../layout/Root';
import { LevelEntry } from '../../../profile/ProfilePage/LevelEntry';
import { convertLevelToLatestVersion } from '../../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../../level/deserialize';
import { FileLoaderModal } from '../../../FileLoader/FileLoaderModal';
import { deleteLevel } from '../../../../remoteData/deleteLevel';

type InternalLevelsPageProps = {
	allFilesReady: boolean;
};

function LevelsPage({ allFilesReady }: InternalLevelsPageProps) {
	const router = useRouter();
	const [levels, setLevels] = useState<SerializedLevel[]>([]);

	useEffect(() => {
		getLevels().then((retrievedLevels) => setLevels(retrievedLevels));
	}, []);

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="levels" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16 space-y-4">
					{levels.map((l) => {
						const converted = convertLevelToLatestVersion(l);

						if (!converted) {
							return null;
						}

						const hydratedLevel = {
							...converted,
							data: deserialize(converted.data).levelData,
						};

						return (
							<LevelEntry
								key={hydratedLevel.id}
								level={hydratedLevel}
								onEdit={() => {
									router.push(`/make/${hydratedLevel.id}`);
								}}
								onDelete={async () => {
									await deleteLevel(hydratedLevel.id);
									setLevels((l) => {
										return l.filter((lev) => lev.id !== hydratedLevel.id);
									});
								}}
							/>
						);
					})}
				</div>
			</Root>
		</>
	);
}

export { LevelsPage };
