import React from 'react';
import clsx from 'clsx';

import { DetailsViewProps } from './index';

function QuestionBlockViewDetails({ settings }: DetailsViewProps) {
	return (
		<div
			className={clsx(
				`${settings.payload}-bg`,
				'bg-cover absolute bottom-0 right-0 w-2 h-2 bg-black rounded-sm'
			)}
		/>
	);
}

export { QuestionBlockViewDetails };
