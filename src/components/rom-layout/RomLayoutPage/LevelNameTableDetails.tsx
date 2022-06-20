import React from 'react';
import { getRom } from '../../FileLoader/files';
import { convertLevelNameToASCII } from '../../../levelData/util';
import { toHexString } from '../../hex-tree/HexTreePage/util';

type LevelNameTableDetailsProps = {
	offset: number;
	size: number;
};

function LevelNameTableDetails({ offset, size }: LevelNameTableDetailsProps) {
	const rom = getRom()!;
	const nameRows = [];

	for (let a = offset; a < offset + size; a += 21) {
		const name = convertLevelNameToASCII(rom.slice(a, a + 21));

		nameRows.push(
			<tr key={name}>
				<td>{toHexString(a)}</td>
				<td>{name || '<blank>'}</td>
			</tr>
		);
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>address</th>
						<th>name value</th>
					</tr>
				</thead>
				<tbody>{nameRows}</tbody>
			</table>
		</div>
	);
}

export { LevelNameTableDetails };
