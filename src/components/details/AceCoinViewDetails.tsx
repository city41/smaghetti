import React from 'react';
import clsx from 'clsx';

import { DetailsViewProps } from './index';

function AceCoinViewDetails({ settings }: DetailsViewProps) {
	return (
		<div
			className={clsx(
				'absolute bottom-1 right-0 bg-black text-white rounded-sm grid place-items-center font-bold'
			)}
			style={{ fontSize: 4, width: 5, height: 5 }}
		>
			{settings.aceCoinIndex + 1}
		</div>
	);
}

export { AceCoinViewDetails };
