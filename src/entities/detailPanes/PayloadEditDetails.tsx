import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { MdClear } from 'react-icons/md';

import { ResourceType } from '../../resources/resourceMap';

type PayloadEditDetailsProps = {
	payloads: Array<EntityType | ResourceType>;
	width: number;
	height: number;
	canClear?: boolean;
	onPayloadChange: (newPayload: EntityType | ResourceType | undefined) => void;
	children: ReactNode;
};

const PADDING = 1;

function PayloadEditDetails({
	payloads,
	width,
	height,
	canClear,
	onPayloadChange,
	children,
}: PayloadEditDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		width: width + 2 * PADDING,
		minHeight: height + 2 * PADDING,
		padding: PADDING,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div className="grid grid-cols-3 gap-y-0.5 my-0.5 items-center justify-items-center">
				{payloads.map((p) => (
					<div
						key={p}
						className={clsx(`${p}-bg`, 'w-1 h-1 bg-cover hover:bg-gray-500')}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onPayloadChange(p);
						}}
					/>
				))}
				{canClear && (
					<MdClear
						className="hover:bg-gray-500"
						style={{ fontSize: '0.25rem' }}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onPayloadChange(undefined);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export { PayloadEditDetails };
