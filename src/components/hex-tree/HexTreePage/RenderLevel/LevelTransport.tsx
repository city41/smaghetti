import React from 'react';
import { TILE_SIZE } from '../../../../tiles/constants';
import { LevelTreeTransport } from '../../types';
import { TransportIcon } from '../entityIcons';

type LevelTransportProps = {
	transport: LevelTreeTransport;
	scale: number;
};

function LevelTransport({ scale }: LevelTransportProps) {
	const width = TILE_SIZE * scale;
	const height = TILE_SIZE * scale;

	const style = {
		width,
		height,
		backgroundSize: TILE_SIZE,
	};

	return <TransportIcon style={style} />;
}

export { LevelTransport };
