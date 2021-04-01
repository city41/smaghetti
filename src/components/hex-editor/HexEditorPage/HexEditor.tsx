import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './HexEditor.module.css';
import { convertCharacterToASCII } from '../../../levelData/util';

type HexEditorProps = {
	className?: string;
	data: Uint8Array | null;
};

function toHexString(b: number): string {
	const asHex = b.toString(16);

	if (asHex.length === 1) {
		return `0${asHex}`;
	} else {
		return asHex;
	}
}

type CellMetaData = {
	category: string;
	label: string;
};

const categoryClasses = {
	constant: 'bg-black text-white',
	'object-ptr': 'bg-blue-500 text-white',
	'level-settings-ptr': 'bg-red-500 text-white',
	'transport-data-ptr': 'bg-green-500 text-white',
	'sprite-data-ptr': 'bg-purple-500 text-white',
	'blockpath-movement-ptr': 'bg-pink-700 text-white',
	'autoscroll-data-ptr': 'bg-indigo-800 text-white',
};

function getPointerAddress(data: Uint8Array, leastSigIndex: number): number {
	const leastSig = data[leastSigIndex];
	const mostSig = data[leastSigIndex + 1];

	return (mostSig << 8) | leastSig;
}

function getObjectSize(data: Uint8Array, index: number): 4 | 5 {
	const byte = data[index];
	const bank = byte >> 6;

	// objects in bank zero are always 4 bytes, else 5 bytes
	return bank === 0 ? 4 : 5;
}

function setObjXY(obj: Uint8Array, x: number, y: number): Uint8Array {
	obj[1] = y;
	obj[2] = x;
	return obj;
}

function setAsCoinBank(obj: Uint8Array): Uint8Array {
	if (obj.length !== 5) {
		throw new Error('setAsCoinBank: can only turn 5 byte objs into coin banks');
	}

	obj[0] = 0x40; // bank 1, length 0
	obj[3] = 0x10; // coin bank id
	obj[4] = 0x40; // "second length", suspect it means something else for coin banks

	return obj;
}

function changeObject(
	data: Uint8Array,
	mapFn: (objData: Uint8Array, index: number) => ArrayLike<number> | null
): void {
	const headerLength = 11;
	const headerAddress = getPointerAddress(data, 5);
	const endAddress = getPointerAddress(data, 7);

	function implantQuestionMushroom(implantIndex: number) {
		data[implantIndex] = 0;
		// data[implantIndex + 1] is y, leave it alone
		// data[implantIndex + 2] is x, leave it alone
		data[implantIndex + 3] = 0x10;
	}

	function implantCoinBlockRun(implantIndex: number) {
		data[implantIndex] = 0x43;
		data[implantIndex + 3] = 0x10;
		data[implantIndex + 4] = 0x40;
	}

	const firstObjectAddress = headerAddress + headerLength;
	let curObjIndex = 0;
	for (let i = firstObjectAddress; i < endAddress; ) {
		const objSize = getObjectSize(data, i);

		const objData = data.slice(i, i + objSize);
		const newData = mapFn(objData, i);
		if (newData) {
			data.set(newData, i);
		}

		i += objSize;
		curObjIndex += 1;
	}
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

	5: {
		category: 'object-ptr',
		label: 'ptr object data for room0',
	},
	7: {
		category: 'level-settings-ptr',
		label: 'ptr levelsettings for room0',
	},
	9: {
		category: 'transport-data-ptr',
		label: 'ptr transport data for room0',
	},
	0xb: {
		category: 'sprite-data-ptr',
		label: 'ptr sprite data for room0',
	},
	0xd: {
		category: 'blockpath-movement-ptr',
		label: 'ptr blockpath movement data for room0',
	},
	0xf: {
		category: 'autoscroll-data-ptr',
		label: 'ptr autoscroll data for room0',
	},

	0x11: {
		category: 'object-ptr',
		label: 'ptr object data for room1',
	},
	0x13: {
		category: 'level-settings-ptr',
		label: 'ptr levelsettings for room1',
	},
	0x15: {
		category: 'transport-data-ptr',
		label: 'ptr transport data for room1',
	},
	0x17: {
		category: 'sprite-data-ptr',
		label: 'ptr sprite data for room1',
	},
	0x19: {
		category: 'blockpath-movement-ptr',
		label: 'ptr blockpath movement data for room1',
	},
	0x1b: {
		category: 'autoscroll-data-ptr',
		label: 'ptr autoscroll data for room1',
	},

	0x1d: {
		category: 'object-ptr',
		label: 'ptr object data for room2',
	},
	0x1f: {
		category: 'level-settings-ptr',
		label: 'ptr levelsettings for room2',
	},
	0x21: {
		category: 'transport-data-ptr',
		label: 'ptr transport data for room2',
	},
	0x23: {
		category: 'sprite-data-ptr',
		label: 'ptr sprite data for room2',
	},
	0x25: {
		category: 'blockpath-movement-ptr',
		label: 'ptr blockpath movement data for room2',
	},
	0x27: {
		category: 'autoscroll-data-ptr',
		label: 'ptr autoscroll data for room2',
	},

	0x29: {
		category: 'object-ptr',
		label: 'ptr object data for room3',
	},
	0x2b: {
		category: 'level-settings-ptr',
		label: 'ptr levelsettings for room3',
	},
	0x2d: {
		category: 'transport-data-ptr',
		label: 'ptr transport data for room3',
	},
	0x2f: {
		category: 'sprite-data-ptr',
		label: 'ptr sprite data for room3',
	},
	0x31: {
		category: 'blockpath-movement-ptr',
		label: 'ptr blockpath movement data for room3',
	},
	0x33: {
		category: 'autoscroll-data-ptr',
		label: 'ptr autoscroll data for room3',
	},

	0x35: {
		category: 'constant',
		label: 'always zero',
	},
};

function getDynamicCells(data: Uint8Array): Record<number, CellMetaData> {
	const cells = Object.keys(ConstantCells).reduce<Record<number, CellMetaData>>(
		(building, key) => {
			const index = Number(key);
			const title = ConstantCells[index];

			if (title.category.includes('ptr')) {
				const address = getPointerAddress(data, index);

				building[address] = {
					category: title.category,
					label: title.label.replace('ptr ', ''),
				};
			}

			return building;
		},
		{}
	);

	return cells;
}

function getTitleCells(data: Uint8Array): Record<number, CellMetaData> {
	const start = data[0] === 0 ? 0x40 : 0x180;

	const titleCells: Record<number, CellMetaData> = {};

	let address = start;
	while (data[address] !== 0xff && address < start + 21) {
		titleCells[address] = {
			category: 'title',
			label: convertCharacterToASCII(data[address]),
		};
		address += 1;
	}

	return titleCells;
}

function getPointers(data: Uint8Array): Record<number, number> {
	return Object.keys(ConstantCells).reduce<Record<number, number>>(
		(building, key) => {
			const index = Number(key);
			const title = ConstantCells[index];

			if (title.category.includes('ptr')) {
				const leastSigByte = data[index];
				const mostSigByte = data[index + 1];
				const address = (mostSigByte << 8) | leastSigByte;

				building[index] = address;
			}

			return building;
		},
		{}
	);
}

type CellProps = {
	className?: string;
	data: Uint8Array;
	index: number;
	pointer?: number;
	label?: string;
};

function handlePointer(address: number | string) {
	const target = document.querySelector(
		`[data-address="${address}"]`
	) as HTMLInputElement;

	if (target) {
		target.focus();
		target.scrollIntoView();
		window.scrollBy(0, -20);
	}
}

function Cell({ className, data, index, pointer, label = '' }: CellProps) {
	const initialValue = useRef(data[index]);
	const curValue = useRef(data[index]);
	const [textValue, setTextValue] = useState(toHexString(data[index]));

	return (
		<>
			<input
				data-address={index}
				data-pointer={pointer}
				title={label.length > 2 ? label : undefined}
				className={clsx(className, 'w-full border-2 text-black', {
					'bg-yellow-300': initialValue.current !== curValue.current,
					'border-blue-200': label && label.length > 2,
					'border-transparent': !label || label.length < 3,
				})}
				type="text"
				value={textValue}
				onChange={(e) => {
					setTextValue(e.target.value);
					curValue.current = parseInt(e.target.value, 16);
				}}
				onBlur={() => {
					const newByte = parseInt(textValue, 16);

					if (isNaN(newByte)) {
						data[index] = 0;
					} else {
						data[index] = newByte;
					}
					curValue.current = newByte;
				}}
			/>
			<div
				className={clsx('text-xs cursor-pointer', {
					hidden: initialValue.current === curValue.current,
				})}
				onClick={() => {
					setTextValue(toHexString(initialValue.current));
					curValue.current = initialValue.current;
				}}
			>
				{toHexString(initialValue.current)}
			</div>
			{pointer && (
				<button className="text-xs" onClick={() => handlePointer(pointer)}>
					&gt;
				</button>
			)}
			{label && label.length < 3 && <div className="text-xs">{label}</div>}
		</>
	);
}

function HexEditor({ className, data }: HexEditorProps) {
	const [addressToFocusText, setAddressToFocusText] = useState('');
	const [_, forceRender] = useState(0);
	if (!data) {
		return null;
	}

	const bytes = [];
	const dynamicCells = getDynamicCells(data);
	const titleCells = getTitleCells(data);
	const cellMetaData = { ...ConstantCells, ...dynamicCells, ...titleCells };
	const pointers = getPointers(data);

	for (let i = 0; i < data.length; ++i) {
		const meta = cellMetaData[i];
		bytes.push(
			<div key={i} className={clsx('p-2 focus-within:bg-blue-500')}>
				<div className="text-xs text-white">{i.toString(16)}</div>
				<Cell
					className={
						categoryClasses[meta?.category as keyof typeof categoryClasses]
					}
					data={data}
					index={i}
					pointer={pointers[i]}
					label={meta?.label}
				/>
			</div>
		);
	}

	return (
		<div className={className}>
			<button
				onClick={() => {
					changeObject(data, (objData, index: number) => {
						if (index === 0xf2) {
							console.log('objData[4]', objData[4].toString(16));
							objData[4] = 0x18;
							return setObjXY(objData, 5, 0x0);
							// return [0x40, objData[1], objData[2], 0x10, 0x40];
						} else {
							return null;
						}
					});
					forceRender((r) => r + 1);
				}}
			>
				all ?
			</button>
			<input
				className="w-16 mx-4 border border-gray-500"
				type="text"
				value={addressToFocusText}
				onChange={(e) => setAddressToFocusText(e.target.value)}
			/>
			<button
				disabled={!addressToFocusText}
				onClick={() => {
					const address = parseInt(addressToFocusText, 16);
					handlePointer(address);
				}}
			>
				go to
			</button>
			<div className={clsx('grid', styles.grid)}>{bytes}</div>
		</div>
	);
}

export { HexEditor };
