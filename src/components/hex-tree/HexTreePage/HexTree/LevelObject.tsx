import React from 'react';
import clsx from 'clsx';

import { LevelTreeObject } from '../../types';
import { ObjectIcon } from '../entityIcons';
import { toHexString } from '../util';

type ObjectProps = {
	className?: string;
	levelObject: LevelTreeObject;
};

function LevelObject({ className, levelObject }: ObjectProps) {
	return (
		<div
			className={clsx(
				className,
				'ml-8 bg-gray-600 p-2 m-2 flex flex-row items-center space-x-2'
			)}
		>
			<ObjectIcon />
			<div className="bg-gray-200 text-gray-900 grid grid-cols-5 grid-rows-2 gap-x-2 p-1">
				<div className="text-xs text-gray-400">x</div>
				<div className="text-xs text-gray-400">y</div>
				<div className="text-xs text-gray-400">bank</div>
				<div className="text-xs text-gray-400">id</div>
				<div className="text-xs text-gray-400">raw</div>
				<div className="text-sm">{levelObject.x}</div>
				<div className="text-sm">{levelObject.y}</div>
				<div className="text-sm">{levelObject.bank}</div>
				<div className="text-sm">0x{levelObject.id.toString(16)}</div>
				<div className="text-sm">
					{levelObject.rawBytes.map(toHexString).join(' ')}
				</div>
			</div>
		</div>
	);
}

export { LevelObject };
