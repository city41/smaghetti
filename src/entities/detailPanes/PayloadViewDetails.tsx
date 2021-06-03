import React from 'react';
import clsx from 'clsx';
import { EntityType } from '../../entities/entityMap';
import { ResourceType } from '../../resources/resourceMap';

type PayloadViewDetailsProps = {
	className?: string;
	payload: EntityType | ResourceType | undefined;
};

function PayloadViewDetails({ className, payload }: PayloadViewDetailsProps) {
	if (!payload) {
		return null;
	}

	return (
		<div
			className={clsx(
				className,
				`${payload}-bg`,
				'bg-cover absolute bottom-0 right-0 w-2 h-2 bg-black rounded-sm'
			)}
		/>
	);
}

export { PayloadViewDetails };
