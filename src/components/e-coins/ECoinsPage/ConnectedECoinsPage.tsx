import React, { useEffect, useState } from 'react';
import { ECoinsPage, PublicECoinsPageProps } from './ECoinsPage';
import { client } from '../../../remoteData/client';
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

const userOrderToOrderColumn: Record<CategoryUserOrder, string> = {
	newest: 'updated_at',
	popular: 'total_vote_count',
};

// for now, not paging, need to figure out how to only get custom coins from the db
async function getLevels(
	order: CategoryUserOrder
): Promise<{ levels: FlatSerializedLevel[]; totalCount: number }> {
	const { error, data, count } = await client
		.rpc('get_published_levels_that_have_ecoins')
		.order(userOrderToOrderColumn[order], { ascending: false });

	if (error) {
		throw error;
	}

	return { levels: data ?? [], totalCount: count ?? 0 };
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
