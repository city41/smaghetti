import React from 'react';
import clsx from 'clsx';
import { ECoinView } from '../../../entities/ECoin/ECoinView';
import { isEqual } from 'lodash';
import { ECoinTileData } from '../../../entities/ECoin/ECoinData';
import { COIN_SIZE } from '../../../entities/ECoin/util';
import { makeSlug } from '../../util';

const SCALE = 4;

type ECoinEntryProps = {
	className?: string;
	level: Level;
};

function isCustomECoin(data: number[] | undefined): boolean {
	if (!data) {
		return false;
	}

	return !isEqual(data, ECoinTileData);
}

function findECoin(level: Level): EditorEntity | null {
	for (let i = 0; i < level.data.rooms.length; ++i) {
		const eCoin = level.data.rooms[i].stage.entities.find(
			(e) => e.type === 'ECoin'
		);

		if (
			eCoin &&
			isCustomECoin(eCoin.settings?.coinData as number[] | undefined)
		) {
			return eCoin;
		}
	}

	return null;
}

function ECoinEntry({ className, level }: ECoinEntryProps) {
	const eCoinEntity = findECoin(level);

	if (!eCoinEntity) {
		// this can happen if either we dont find an e-coin (which shouldn't happen)
		// or if the e-coin is not custom
		return null;
	}

	const href = `/editor/${level.id}/${makeSlug(level.name)}`;

	return (
		<a href={href}>
			<div
				className={clsx(className, 'flex flex-col gap-y-2')}
				style={{ width: COIN_SIZE * SCALE, minHeight: COIN_SIZE * SCALE }}
			>
				<div style={{ width: COIN_SIZE * SCALE, height: COIN_SIZE * SCALE }}>
					<ECoinView
						style={{
							transformOrigin: 'top left',
							transform: `scale(${SCALE * 100}%)`,
						}}
						data={eCoinEntity.settings!.coinData}
					/>
				</div>
				<div className="text-sm text-center">
					<div>
						<span className="font-bold">{level.name}</span>
					</div>
					<div className="text-gray-400">{level.user?.username}</div>
				</div>
			</div>
		</a>
	);
}

export { ECoinEntry };
