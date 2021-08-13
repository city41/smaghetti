import React from 'react';
import clsx from 'clsx';
import { ResourceType } from '../../resources/resourceMap';

type PayloadViewDetailsProps = {
	className?: string;
	payload: EntityType | ResourceType | undefined;
	size?: number;
};

function PayloadViewDetails({
	className,
	payload,
	size,
}: PayloadViewDetailsProps) {
	if (!payload) {
		return null;
	}

	const style = { borderRadius: '10%' };
	const sizeStyle = size ? { width: size, height: size } : {};

	return (
		<div
			style={{ ...style, ...sizeStyle }}
			className={clsx(
				className,
				`${payload}-bg`,
				'thumbnail-hide bg-cover absolute bottom-0 right-0 w-2 h-2 bg-black'
			)}
		/>
	);
}

export { PayloadViewDetails };
