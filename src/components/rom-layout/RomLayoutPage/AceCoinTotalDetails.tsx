import React from 'react';
import { getRom } from '../../FileLoader/files';
import { toHexString } from '../../hex-tree/HexTreePage/util';

type AceCoinTotalDetailsProps = {
	offset: number;
	size: number;
};

function AceCoinTotalDetails({ offset, size }: AceCoinTotalDetailsProps) {
	const rom = getRom()!;
	const aceCoinTotalRows = [];

	for (let a = offset; a < offset + size; a += 1) {
		const byte = rom[a];
		const total = byte >> 5;

		aceCoinTotalRows.push(
			<tr key={a}>
				<td>{toHexString(a)}</td>
				<td>Level {a - offset + 1}</td>
				<td>{total}</td>
				<td>{toHexString(byte)}</td>
			</tr>
		);
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>address</th>
						<th>level</th>
						<th>ace coins</th>
						<th>raw byte</th>
					</tr>
				</thead>
				<tbody>{aceCoinTotalRows}</tbody>
			</table>
		</div>
	);
}

export { AceCoinTotalDetails };
