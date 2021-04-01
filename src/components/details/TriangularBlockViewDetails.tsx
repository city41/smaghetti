import React from 'react';
import clsx from 'clsx';

import { DetailsViewProps } from './index';

function TriangularBlockViewDetails({ settings }: DetailsViewProps) {
	console.log('settings.angle', settings.angle);
	return (
		<div
			className={clsx(
				'TriangularBlock-bg',
				'bg-cover absolute top-0 left-0 w-full h-full bg-blue-100 pointer-events-none transform',
				{
					'rotate-90': settings.angle === 90,
					'rotate-180': settings.angle === 180,
					'-rotate-90': settings.angle === 270,
				}
			)}
		/>
	);
}

export { TriangularBlockViewDetails };
