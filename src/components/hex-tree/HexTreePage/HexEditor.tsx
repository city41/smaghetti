import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';

import { convertCharacterToASCII } from '../../../levelData/util';
import {
	ROOM_OBJECT_HEADER_SIZE_IN_BYTES,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
} from '../../../levelData/constants';
import { toHexString } from './util';

type HexEditorProps = {
	className?: string;
	data: Uint8Array;
};

type CellMetaData = {
	category: string;
	label: string;
	cellLabel?: ReactNode;
};

const categoryClasses = {
	constant: 'bg-black text-white',
	'object-ptr': 'bg-red-300 text-red-900',
	'object-header': 'bg-red-100 text-gray-900',
	'object-data': 'bg-red-300 text-red-900',
	'level-settings-ptr': 'bg-blue-500 text-white',
	'transport-data-ptr': 'bg-yellow-600 text-white',
	'sprite-ptr': 'bg-green-300 text-green-900',
	'sprite-data': 'bg-green-300 text-green-900',
	'blockpath-movement-ptr': 'bg-pink-700 text-white',
	'autoscroll-data-ptr': 'bg-indigo-800 text-white',
};

function getPointerAddress(data: Uint8Array, leastSigIndex: number): number {
	const leastSig = data[leastSigIndex];
	const mostSig = data[leastSigIndex + 1];

	return (mostSig << 8) | leastSig;
}

const ConstantCells: Record<number, CellMetaData> = {
	0: {
		category: 'constant',
		label: 'eCoin',
	},
	1: {
		category: 'constant',
		label: 'number of ace coins',
	},
	2: {
		category: 'constant',
		label: 'eLevel class',
	},
	3: {
		category: 'constant',
		label: 'eLevel number',
	},
	4: {
		category: 'constant',
		label: 'eLevel icon',
	},

	0x35: {
		category: 'constant',
		label: 'always zero',
	},
};

const OBJECT_HEADER_LABELS: Record<number, string> = {
	0: 'Timer most significant digit',
	1: 'Timer least significant digits',
	4: 'length of level',
	5: 'background color',
	6: 'scroll settings',
	7: 'level entry, graphics set',
	8: 'graphics set',
	9: 'extra color',
	10: 'background graphics',
};

function getObjectCellMetaData(data: Uint8Array): Record<number, CellMetaData> {
	const objectCells = ROOM_OBJECT_POINTERS.reduce<Record<number, CellMetaData>>(
		(building, value, roomIndex) => {
			building[value] = {
				category: 'object-ptr',
				label: `Room ${roomIndex} object data pointer`,
			};

			building[value + 1] = {
				category: 'object-ptr',
				label: `Room ${roomIndex} object data pointer`,
			};

			const destAddr = getPointerAddress(data, value);

			for (let i = 0; i < ROOM_OBJECT_HEADER_SIZE_IN_BYTES; ++i) {
				building[destAddr + i] = {
					category: 'object-header',
					label: OBJECT_HEADER_LABELS[i] ?? `Room ${roomIndex} object header`,
				};
			}

			building[destAddr + ROOM_OBJECT_HEADER_SIZE_IN_BYTES] = {
				category: 'object-data',
				label: `Room ${roomIndex} first object`,
			};

			return building;
		},
		{}
	);

	return objectCells;
}

function getSpriteCellMetaData(data: Uint8Array): Record<number, CellMetaData> {
	const spriteCells = ROOM_SPRITE_POINTERS.reduce<Record<number, CellMetaData>>(
		(building, value, roomIndex) => {
			building[value] = {
				category: 'sprite-ptr',
				label: `Room ${roomIndex} sprite data pointer`,
			};

			building[value + 1] = {
				category: 'sprite-ptr',
				label: `Room ${roomIndex} sprite data pointer`,
			};
			const destAddr = getPointerAddress(data, value);

			building[destAddr] = {
				category: 'sprite-data',
				label: `Room ${roomIndex} first sprite`,
			};
			return building;
		},
		{}
	);

	return spriteCells;
}

function getDynamicCells(data: Uint8Array): Record<number, CellMetaData> {
	return { ...getObjectCellMetaData(data), ...getSpriteCellMetaData(data) };
}

function getTitleCells(data: Uint8Array): Record<number, CellMetaData> {
	const start = data[0] === 0 ? 0x40 : 0x180;

	const titleCells: Record<number, CellMetaData> = {};

	let address = start;
	while (data[address] !== 0xff && address < start + 21) {
		const char = convertCharacterToASCII(data[address]);

		titleCells[address] = {
			category: 'title',
			label: `Level title character (${address - start}): ${char}`,
			// force spaces to take up space
			cellLabel: char === ' ' ? <>&nbsp;</> : char,
		};
		address += 1;
	}

	return titleCells;
}

const COLUMN_COUNT = 0x20;
const HEADER_CLASSES = 'bg-gray-400 text-gray-500 border-gray-600';

type RowProps = {
	data: Uint8Array;
	offset: number;
	metadata: Record<number, CellMetaData>;
	onHover: (index: number) => void;
};

function Row({ data, offset, metadata, onHover }: RowProps) {
	const cells = [];

	let sawMetadata = false;

	for (let i = offset; i < offset + COLUMN_COUNT && i < data.length; ++i) {
		const cellLabelSrc = metadata[i]?.cellLabel;
		sawMetadata = sawMetadata || !!cellLabelSrc;

		// if any cell had metadata, force all metadata in this row to take up
		// space so that the hex values stay aligned
		const cellLabel = cellLabelSrc || (sawMetadata ? <>&nbsp;</> : null);

		cells.push(
			<td
				key={i}
				className={clsx(
					categoryClasses[
						metadata[i]?.category as keyof typeof categoryClasses
					],
					'p-1 border border-gray-600 hover:bg-gray-400'
				)}
				onMouseEnter={() => onHover(i)}
				onMouseLeave={() => onHover(-1)}
			>
				<div className="font-bold text-right">{toHexString(data[i])}</div>
				<div className="text-sm text-gray-500 text-center">{cellLabel}</div>
			</td>
		);
	}

	return (
		<tr>
			<td className={clsx(HEADER_CLASSES, 'text-right pr-2 border-b')}>
				{offset.toString(16)}
			</td>
			{cells}
		</tr>
	);
}

function HexEditor({ className, data }: HexEditorProps) {
	const [hoveredIndex, setHoveredIndex] = useState(-1);

	const dynamicCells = getDynamicCells(data);
	const titleCells = getTitleCells(data);
	const cellMetaData = { ...ConstantCells, ...dynamicCells, ...titleCells };

	const headers = [<th key="blank-corner" />];

	for (let i = 0; i < COLUMN_COUNT; ++i) {
		headers.push(
			<th
				key={i}
				className={clsx(
					HEADER_CLASSES,
					'text-right pr-1 border-r font-normal sticky top-16'
				)}
			>
				{i.toString(16)}
			</th>
		);
	}

	const rows = [];

	for (let i = 0; i < data.length; i += COLUMN_COUNT) {
		rows.push(
			<Row
				key={i}
				data={data}
				offset={i}
				metadata={cellMetaData}
				onHover={(i) => setHoveredIndex(i)}
			/>
		);
	}

	return (
		<div className={className}>
			<div className="h-16 sticky top-0 bg-gray-900 grid place-items-center">
				{hoveredIndex > -1 ? (
					<>
						{hoveredIndex.toString(16)}: {cellMetaData[hoveredIndex]?.label}
					</>
				) : (
					<div className="text-gray-400">hover over a cell to see details</div>
				)}
			</div>
			<table className="w-full">
				<thead>
					<tr>{headers}</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
}

export { HexEditor };
