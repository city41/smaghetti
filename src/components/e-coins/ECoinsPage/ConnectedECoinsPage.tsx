import React, { useEffect, useState } from 'react';
import { ECoinsPage, PublicECoinsPageProps } from './ECoinsPage';
import { convertLevelToLatestVersion } from '../../../level/versioning/convertLevelToLatestVersion';
import { deserialize } from '../../../level/deserialize';
import { CategoryUserOrder } from '../../levels/Levels2Page/categories';
import { ECoinTileData } from '../../../entities/ECoin/ECoinData';
import isEqual from 'lodash/isEqual';

type LoadingState = 'loading' | 'error' | 'success';

type FlatSerializedLevel = Omit<SerializedLevel, 'user'> & {
	username: string;
	total_vote_count: number;
};

async function getLevels(
	order: CategoryUserOrder
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	const request = await fetch(
		`/level-archive/get_published_levels_that_have_ecoins_order${order}.json`
	);
	const data = await request.json();
	return { levels: data, totalCount: 310 };
}

function isCustomECoin(data: number[] | undefined): boolean {
	if (!data) {
		return false;
	}

	return !isEqual(data, ECoinTileData);
}

function hasCustomECoin(level: Level): boolean {
	let eCoinEntity;

	for (let i = 0; i < level.data.rooms.length; ++i) {
		eCoinEntity = level.data.rooms[i].stage.entities.find(
			(e) => e.type === 'ECoin'
		);

		if (eCoinEntity) {
			return isCustomECoin(
				eCoinEntity?.settings?.coinData as number[] | undefined
			);
		}
	}

	return false;
}

function ConnectedECoinsPage(props: PublicECoinsPageProps) {
	const [loadingState, setLoadingState] = useState<LoadingState>('loading');
	const [levels, setLevels] = useState<Level[]>([]);

	useEffect(() => {
		setLevels([]);
		setLoadingState('loading');
	}, [props.currentOrder]);

	useEffect(() => {
		setLoadingState('loading');
		getLevels(props.currentOrder)
			.then(({ levels: retrievedLevels }) => {
				const convertedLevels = retrievedLevels.reduce<Level[]>(
					(building, rawLevel) => {
						const serializedLevel = {
							...rawLevel,
							user: {
								username: rawLevel.username,
							},
						};

						const convertedLevel = convertLevelToLatestVersion(serializedLevel);

						if (convertedLevel) {
							const level: Level = {
								...convertedLevel,
								data: deserialize(convertedLevel.data),
							};

							if (hasCustomECoin(level)) {
								return building.concat(level);
							} else {
								return building;
							}
						} else {
							return building;
						}
					},
					[]
				);

				setLevels(convertedLevels);
				setLoadingState('success');
			})
			.catch(() => {
				setLoadingState('error');
			});
	}, [props.currentOrder, setLoadingState]);

	return <ECoinsPage {...props} loadingState={loadingState} levels={levels} />;
}

export { ConnectedECoinsPage };
