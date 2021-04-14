import React from 'react';
import clsx from 'clsx';

import { LevelTreeTransport } from '../../types';
import { TransportIcon } from '../entityIcons';

type LevelTransportProps = {
	className?: string;
	levelTransport: LevelTreeTransport;
};

function LevelTransport({ className, levelTransport }: LevelTransportProps) {
	return (
		<div className={clsx(className, 'ml-8 bg-gray-600 p-2 m-2 flex flex-col')}>
			<div className="flex flex-row items-center space-x-2">
				<TransportIcon />
				<div className="bg-gray-200 text-gray-900 grid grid-cols-5 grid-rows-2 gap-x-2 p-1">
					<div className="text-xs text-gray-400">sx</div>
					<div className="text-xs text-gray-400">sy</div>
					<div className="text-xs text-gray-400">dx</div>
					<div className="text-xs text-gray-400">dy</div>
					<div className="text-xs text-gray-400">dRoom</div>
					<div className="text-sm">{levelTransport.sx}</div>
					<div className="text-sm">{levelTransport.sy}</div>
					<div className="text-sm">{levelTransport.dx}</div>
					<div className="text-sm">{levelTransport.dy}</div>
					<div className="text-sm">{levelTransport.destRoom}</div>
				</div>
			</div>
		</div>
	);
}

export { LevelTransport };
