import React, { ReactNode } from 'react';
import { TILE_SIZE } from '../../tiles/constants';

type UnknownDetailsProps = {
	rawBytes: number[];
	children: ReactNode;
};

const PADDING = 1;

function toHexString(byte: number): string {
	const hex = byte.toString(16);

	if (hex.length === 1) {
		return '0' + hex;
	} else {
		return hex;
	}
}

function UnknownDetails({ rawBytes, children }: UnknownDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		padding: PADDING,
		width: TILE_SIZE + 2 * PADDING,
		fontSize: 2,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div className="my-0.5 flex flex-col space-y-0.5">
				<div className="flex flex-row justify-between">
					{rawBytes.map((b, i) => (
						<div key={i}>{toHexString(b)}</div>
					))}
				</div>
			</div>
		</div>
	);
}

export { UnknownDetails };
