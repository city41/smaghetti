import React, { useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { convertLevelNameToASCII } from '../../../../levelData/util';
import {
	parseObjectHeader,
	parseObjects,
	parseObjectsFromLevelFile,
} from '../../../../levelData/parseObjectsFromLevelFile';
import {
	parseSprites,
	parseSpritesFromLevelFile,
} from '../../../../levelData/parseSpritesFromLevelFile';
import {
	POINTER_AREA_SIZE_IN_BYTES,
	ROOM_AUTOSCROLL_POINTERS,
	ROOM_BLOCKPATH_POINTERS,
	ROOM_LEVELSETTING_POINTERS,
	ROOM_OBJECT_POINTERS,
	ROOM_SPRITE_POINTERS,
	ROOM_TRANSPORT_POINTERS,
} from '../../../../levelData/constants';
import {
	getLevelName,
	setPointer,
} from '../../../../levelData/createLevelData';
import {
	bank0SpriteIdToSpriteType,
	bank1SpriteIdToSpriteType,
} from '../../../../entities/spriteIdMap';
import clsx from 'clsx';
import { useLocalStorage } from './useLocalStorage';
import useClipboard from 'react-use-clipboard';

type HexTreeProps = {
	data: Uint8Array;
	onDataChange: (newData: Uint8Array) => void;
};

type LevelTreeObject = {
	bank: number;
	id: number;
	x: number;
	y: number;
	// TODO: these really should just be param0, param1
	width: number;
	height: number;
	rawBytes: number[];
	exclude?: boolean;
};

type LevelTreeSprite = {
	bank: number;
	id: number;
	x: number;
	y: number;
	rawBytes: number[];
	exclude?: boolean;
};

type LevelTreeObjectHeader = {
	timeLimit: number;
	roomLength: number;
	rawBytes: number[];
};

type LevelTreeRoom = {
	objects: {
		header: LevelTreeObjectHeader;
		objects: LevelTreeObject[];
		pendingRawBytes: number[];
	};
	levelSettings: {
		rawBytes: number[];
	};
	transports: {
		rawBytes: number[];
	};
	sprites: {
		sprites: LevelTreeSprite[];
		pendingRawBytes: number[];
	};
	blockPaths: {
		rawBytes: number[];
	};
	autoScroll: {
		rawBytes: number[];
	};
};

type LevelHeader = {
	eCoin: boolean;
	aceCoins: number;
	levelClass: number;
	levelNumber: number;
	levelIcon: number;
	levelName: string;
	rawBytes: number[];
};

type LevelTree = {
	header: LevelHeader;
	room0: LevelTreeRoom;
	room1: LevelTreeRoom;
	room2: LevelTreeRoom;
	room3: LevelTreeRoom;
};

function parseHeader(data: Uint8Array): LevelHeader {
	return {
		eCoin: data[0] !== 0,
		aceCoins: data[1],
		levelClass: data[2],
		levelNumber: data[3],
		levelIcon: data[4],
		// TODO: if a level has an eCoin, the name is in a different location
		levelName: convertLevelNameToASCII(data.subarray(0x40, 0x40 + 21)),
		rawBytes: Array.from(data.slice(0, 5)),
	};
}

function getPointer(data: Uint8Array, offset: number): number {
	const view = new DataView(data.buffer);
	return view.getUint16(offset, true);
}

function parseToTree(data: Uint8Array): LevelTree {
	const header = parseHeader(data);

	return {
		header,
		room0: {
			objects: {
				header: parseObjectHeader(data, 0),
				objects: parseObjectsFromLevelFile(data, 0),
				pendingRawBytes: [],
			},
			levelSettings: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_LEVELSETTING_POINTERS[0]),
						getPointer(data, ROOM_TRANSPORT_POINTERS[0])
					)
				),
			},
			transports: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_TRANSPORT_POINTERS[0]),
						getPointer(data, ROOM_SPRITE_POINTERS[0])
					)
				),
			},
			sprites: {
				sprites: parseSpritesFromLevelFile(data, 0),
				pendingRawBytes: [],
			},
			blockPaths: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_BLOCKPATH_POINTERS[0]),
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[0])
					)
				),
			},
			autoScroll: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[0]),
						getPointer(data, ROOM_OBJECT_POINTERS[1])
					)
				),
			},
		},
		room1: {
			objects: {
				header: parseObjectHeader(data, 1),
				objects: parseObjectsFromLevelFile(data, 1),
				pendingRawBytes: [],
			},
			levelSettings: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_LEVELSETTING_POINTERS[1]),
						getPointer(data, ROOM_TRANSPORT_POINTERS[1])
					)
				),
			},
			transports: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_TRANSPORT_POINTERS[1]),
						getPointer(data, ROOM_SPRITE_POINTERS[1])
					)
				),
			},
			sprites: {
				sprites: parseSpritesFromLevelFile(data, 1),
				pendingRawBytes: [],
			},
			blockPaths: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_BLOCKPATH_POINTERS[1]),
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[1])
					)
				),
			},
			autoScroll: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[1]),
						getPointer(data, ROOM_OBJECT_POINTERS[2])
					)
				),
			},
		},
		room2: {
			objects: {
				header: parseObjectHeader(data, 2),
				objects: parseObjectsFromLevelFile(data, 2),
				pendingRawBytes: [],
			},
			levelSettings: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_LEVELSETTING_POINTERS[2]),
						getPointer(data, ROOM_TRANSPORT_POINTERS[2])
					)
				),
			},
			transports: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_TRANSPORT_POINTERS[2]),
						getPointer(data, ROOM_SPRITE_POINTERS[2])
					)
				),
			},
			sprites: {
				sprites: parseSpritesFromLevelFile(data, 2),
				pendingRawBytes: [],
			},
			blockPaths: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_BLOCKPATH_POINTERS[2]),
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[2])
					)
				),
			},
			autoScroll: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[2]),
						getPointer(data, ROOM_OBJECT_POINTERS[3])
					)
				),
			},
		},
		room3: {
			objects: {
				header: parseObjectHeader(data, 3),
				objects: parseObjectsFromLevelFile(data, 3),
				pendingRawBytes: [],
			},
			levelSettings: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_LEVELSETTING_POINTERS[3]),
						getPointer(data, ROOM_TRANSPORT_POINTERS[3])
					)
				),
			},
			transports: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_TRANSPORT_POINTERS[3]),
						getPointer(data, ROOM_SPRITE_POINTERS[3])
					)
				),
			},
			sprites: {
				sprites: parseSpritesFromLevelFile(data, 3),
				pendingRawBytes: [],
			},
			blockPaths: {
				rawBytes: Array.from(
					data.slice(
						getPointer(data, ROOM_BLOCKPATH_POINTERS[3]),
						getPointer(data, ROOM_AUTOSCROLL_POINTERS[3])
					)
				),
			},
			autoScroll: {
				rawBytes: Array.from(
					data.slice(getPointer(data, ROOM_AUTOSCROLL_POINTERS[3]))
				),
			},
		},
	};
}

function Header({ data }: { data: LevelHeader }) {
	return (
		<div className="inline-block ml-8 bg-gray-600 p-2">
			<table>
				<tbody>
					<tr>
						<td colSpan={2}>{data.levelName}</td>
					</tr>
					<tr>
						<td>eCoin</td>
						<td>{data.eCoin}</td>
					</tr>
					<tr>
						<td>aceCoins</td>
						<td>{data.aceCoins}</td>
					</tr>
					<tr>
						<td>levelClass</td>
						<td>{data.levelClass}</td>
					</tr>
					<tr>
						<td>levelNumber</td>
						<td>{data.levelNumber}</td>
					</tr>
					<tr>
						<td>levelIcon</td>
						<td>{data.levelIcon}</td>
					</tr>
					<tr>
						<td colSpan={2}>{data.rawBytes.join(' ')}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

function LevelObject({
	data,
	onExcludeChange,
}: {
	data: LevelTreeObject;
	onExcludeChange: () => void;
}) {
	return (
		<div className="ml-8 bg-gray-600 p-2 m-2 flex flex-col">
			<div className="flex flex-row items-center space-x-2">
				<div className={clsx('bg-blue-400 w-4 h-4')} />
				<div
					className={clsx('w-60 bg-gray-200 text-gray-900 grid', {
						'grid-cols-4': data.bank === 0,
						'grid-cols-6': data.bank > 0,
					})}
				>
					{data.rawBytes.map((b, i) => (
						<div key={i} className="border border-black">
							<div>0x{b.toString(16)}</div>
							<div>
								{objectRawBytesDesc[i as keyof typeof objectRawBytesDesc]}
							</div>
						</div>
					))}
				</div>
				<label>
					exclude
					<input
						type="checkbox"
						checked={data.exclude}
						onChange={onExcludeChange}
					/>
				</label>
				<Copy rawBytes={data.rawBytes} />
			</div>
			<Notes className="m-2 w-80" bank={data.bank} id={data.id} type="object" />
		</div>
	);
}

const spriteRawBytesDesc = {
	0: 'bnk',
	1: 'id',
	2: 'x',
	3: 'y',
	4: '?',
	5: '?',
};

const objectRawBytesDesc = {
	0: 'b/w',
	1: 'y',
	2: 'x',
	3: 'id',
	4: 'h',
};

function InsertBytes({ onInsert }: { onInsert: (b: number[]) => void }) {
	const [byteString, setByteString] = useState('');

	function handleClick() {
		const bytes = byteString.split(' ').map((bs) => parseInt(bs.trim(), 16));
		onInsert(bytes);
	}

	return (
		<div className="flex flex-row space-x-2 p-2">
			<input
				className="text-black"
				type="text"
				value={byteString}
				onChange={(e) => setByteString(e.target.value)}
			/>
			<button onClick={handleClick}>insert</button>
		</div>
	);
}

function Copy({ rawBytes }: { rawBytes: number[] }) {
	const [, copy] = useClipboard(rawBytes.map((b) => b.toString(16)).join(' '));

	return <button onClick={copy}>copy</button>;
}

function Notes({
	className,
	bank,
	id,
	type,
}: {
	className?: string;
	bank: number;
	id: number;
	type: 'sprite' | 'object';
}) {
	const [value, setValue, refreshValue] = useLocalStorage(
		`${type}-${bank}-${id}`,
		''
	);

	return (
		<div className="flex flex-row space-x-2 p-1">
			<input
				className={clsx(className, 'text-black')}
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button onClick={refreshValue}>r</button>
		</div>
	);
}

function Sprite({
	data,
	onExcludeChange,
}: {
	data: LevelTreeSprite;
	onExcludeChange: () => void;
}) {
	const spriteType =
		data.bank === 0
			? bank0SpriteIdToSpriteType[data.id]
			: bank1SpriteIdToSpriteType[data.id];

	return (
		<div className="ml-8 bg-gray-600 p-2 m-2 flex flex-col">
			<div className="flex flex-row items-center space-x-2">
				<div className={clsx(`${spriteType}-bg`, 'w-4 h-4')} />
				<div
					className={clsx('w-60 bg-gray-200 text-gray-900 grid', {
						'grid-cols-4': data.bank === 0,
						'grid-cols-6': data.bank > 0,
					})}
				>
					{data.rawBytes.map((b, i) => (
						<div key={i} className="border border-black">
							<div>0x{b.toString(16)}</div>
							<div>
								{spriteRawBytesDesc[i as keyof typeof spriteRawBytesDesc]}
							</div>
						</div>
					))}
				</div>
				<label>
					exclude
					<input
						type="checkbox"
						checked={data.exclude}
						onChange={onExcludeChange}
					/>
				</label>
				<Copy rawBytes={data.rawBytes} />
			</div>
			<Notes className="m-2 w-80" bank={data.bank} id={data.id} type="sprite" />
		</div>
	);
}

function Room({
	room,
	data,
	onSpriteExcludeChange,
	onObjectExcludeChange,
	onInsertSpriteBytes,
	onInsertObjectBytes,
}: {
	room: 0 | 1 | 2 | 3;
	data: LevelTreeRoom;
	onSpriteExcludeChange: (index: number) => void;
	onObjectExcludeChange: (index: number) => void;
	onInsertSpriteBytes: (b: number[]) => void;
	onInsertObjectBytes: (b: number[]) => void;
}) {
	return (
		<>
			<TreeItem nodeId={`room${room}-objects`} label="Objects">
				<div className="ml-16 flex flex-col w-96">
					<InsertBytes onInsert={(b) => onInsertObjectBytes(b)} />
					{data.objects.objects.map((o, i) => (
						<LevelObject
							key={`${i}-${o.rawBytes.join('-')}`}
							data={o}
							onExcludeChange={() => onObjectExcludeChange(i)}
						/>
					))}
				</div>
			</TreeItem>
			<TreeItem nodeId={`room${room}-sprites`} label="Sprites">
				<div className="ml-16 flex flex-col w-96">
					<InsertBytes onInsert={(b) => onInsertSpriteBytes(b)} />
					{data.sprites.sprites.map((s, i) => (
						<Sprite
							key={`${i}-${s.rawBytes.join('-')}`}
							data={s}
							onExcludeChange={() => onSpriteExcludeChange(i)}
						/>
					))}
				</div>
			</TreeItem>
		</>
	);
}

type BinaryRoom = {
	objectData: number[];
	levelSettingsData: number[];
	transportData: number[];
	spriteData: number[];
	blockPathData: number[];
	autoScrollData: number[];
};

function parsedRoomToBinary(room: LevelTreeRoom): BinaryRoom {
	const objects = room.objects.objects.reduce<number[]>((building, obj) => {
		if (obj.exclude) {
			return building;
		} else {
			return building.concat(obj.rawBytes);
		}
	}, []);

	const sprites = room.sprites.sprites.reduce<number[]>((building, obj) => {
		if (obj.exclude) {
			return building;
		} else {
			return building.concat(obj.rawBytes);
		}
	}, []);

	return {
		objectData: room.objects.header.rawBytes.concat([0], objects, [0xff]),
		levelSettingsData: room.levelSettings.rawBytes,
		transportData: room.transports.rawBytes,
		spriteData: [0].concat(sprites, [0xff]),
		blockPathData: room.blockPaths.rawBytes,
		autoScrollData: room.autoScroll.rawBytes,
	};
}

function concatRoomData(room: BinaryRoom): number[] {
	return room.objectData.concat(
		room.levelSettingsData,
		room.transportData,
		room.spriteData,
		room.blockPathData,
		room.autoScrollData
	);
}

function parsedToBinary(parsed: LevelTree): Uint8Array {
	// header
	const header = parsed.header.rawBytes;

	// pointers
	const pointers: number[] = new Array(POINTER_AREA_SIZE_IN_BYTES);

	// empty bytes between pointers and name
	const nullBytes = new Array(11).fill(0);

	// todo, actually bring the real name back in
	const name = getLevelName('SMAGHETTI');

	const room0Data = parsedRoomToBinary(parsed.room0);
	const room1Data = parsedRoomToBinary(parsed.room1);
	const room2Data = parsedRoomToBinary(parsed.room2);
	const room3Data = parsedRoomToBinary(parsed.room3);

	const pointerOffset =
		header.length + pointers.length + nullBytes.length + name.length;

	//////////// POINTERS ////////////////

	///// ROOM0 //////////
	// objects
	let pointer = setPointer(pointers, 0, pointerOffset);
	// level settings
	pointer = setPointer(pointers, 1, pointer + room0Data.objectData.length);
	// transport data
	pointer = setPointer(
		pointers,
		2,
		pointer + room0Data.levelSettingsData.length
	);
	// sprite data
	pointer = setPointer(pointers, 3, pointer + room0Data.transportData.length);
	// block path movement data
	pointer = setPointer(pointers, 4, pointer + room0Data.spriteData.length);
	// auto scroll movement data
	pointer = setPointer(pointers, 5, pointer + room0Data.blockPathData.length);

	///// ROOM1 //////////
	// objects
	pointer = setPointer(pointers, 6, pointer + room0Data.autoScrollData.length);
	// level settings
	pointer = setPointer(pointers, 7, pointer + room1Data.objectData.length);
	// transport data
	pointer = setPointer(
		pointers,
		8,
		pointer + room1Data.levelSettingsData.length
	);
	// sprite data
	pointer = setPointer(pointers, 9, pointer + room1Data.transportData.length);
	// block path movement data
	pointer = setPointer(pointers, 10, pointer + room1Data.spriteData.length);
	// auto scroll movement data
	pointer = setPointer(pointers, 11, pointer + room1Data.blockPathData.length);

	///// ROOM2 //////////
	// objects
	pointer = setPointer(pointers, 12, pointer + room1Data.autoScrollData.length);
	// level settings
	pointer = setPointer(pointers, 13, pointer + room2Data.objectData.length);
	// transport data
	pointer = setPointer(
		pointers,
		14,
		pointer + room2Data.levelSettingsData.length
	);
	// sprite data
	pointer = setPointer(pointers, 15, pointer + room2Data.transportData.length);
	// block path movement data
	pointer = setPointer(pointers, 16, pointer + room2Data.spriteData.length);
	// auto scroll movement data
	pointer = setPointer(pointers, 17, pointer + room2Data.blockPathData.length);

	///// ROOM2 //////////
	// objects
	pointer = setPointer(pointers, 18, pointer + room2Data.autoScrollData.length);
	// level settings
	pointer = setPointer(pointers, 19, pointer + room3Data.objectData.length);
	// transport data
	pointer = setPointer(
		pointers,
		20,
		pointer + room3Data.levelSettingsData.length
	);
	// sprite data
	pointer = setPointer(pointers, 21, pointer + room3Data.transportData.length);
	// block path movement data
	pointer = setPointer(pointers, 22, pointer + room3Data.spriteData.length);
	// auto scroll movement data
	pointer = setPointer(pointers, 23, pointer + room3Data.blockPathData.length);

	const fullData = header.concat(
		pointers,
		nullBytes,
		name,
		concatRoomData(room0Data),
		concatRoomData(room1Data),
		concatRoomData(room2Data),
		concatRoomData(room3Data)
	);

	return new Uint8Array(fullData);
}

function injestPendingBytes(tree: LevelTree): LevelTree {
	const keys = Object.keys(tree) as Array<keyof LevelTree>;

	return keys.reduce<Partial<LevelTree>>((building, key) => {
		if (key.startsWith('room')) {
			const room = tree[key] as LevelTreeRoom;
			const roomIndex = parseInt(key.replace('room', '')) as 0 | 1 | 2 | 3;
			const newRoom = {
				...room,
				objects: {
					...room.objects,
					objects: room.objects.objects.concat(
						parseObjects(room.objects.pendingRawBytes, roomIndex)
					),
					pendingRawBytes: [],
				},
				sprites: {
					...room.sprites,
					sprites: parseSprites(room.sprites.pendingRawBytes, roomIndex).concat(
						room.sprites.sprites
					),
					pendingRawBytes: [],
				},
			};

			// @ts-ignore
			building[key] = newRoom;
		} else {
			// @ts-ignore
			building[key] = tree[key];
		}

		return building;
	}, {}) as LevelTree;
}

function HexTree({ data, onDataChange }: HexTreeProps) {
	const [parsed, _setParsed] = useState(parseToTree(data));

	function setParsed(callback: (oldTree: LevelTree) => LevelTree) {
		const newParsed = injestPendingBytes(callback(parsed));

		const newData = parsedToBinary(newParsed);
		onDataChange(newData);
		_setParsed(newParsed);
	}

	function handleExcludeChange(
		roomIndex: 0 | 1 | 2 | 3,
		type: 'sprites' | 'objects',
		index: number
	) {
		setParsed((p) => {
			const room = p[`room${roomIndex}` as keyof LevelTree] as LevelTreeRoom;
			// @ts-ignore
			const elements = room[type][type];
			// @ts-ignore
			const patchedElements = elements.map((e, i) => {
				if (i === index) {
					return {
						...e,
						exclude: !e.exclude,
					};
				} else {
					return e;
				}
			});

			const patchedRoom =
				type === 'sprites'
					? {
							...room,
							sprites: {
								...room.sprites,
								sprites: patchedElements,
							},
					  }
					: {
							...room,
							objects: {
								...room.objects,
								objects: patchedElements,
							},
					  };

			return {
				...p,
				[`room${roomIndex}`]: patchedRoom,
			};
		});
	}

	const rooms = [];
	for (let i = 0; i < 4; ++i) {
		const ii = i as 0 | 1 | 2 | 3;

		const data = parsed[`room${i}` as keyof LevelTree] as LevelTreeRoom;

		if (
			i === 0 ||
			data.objects.objects.length > 0 ||
			data.sprites.sprites.length > 0
		) {
			rooms.push(
				<TreeItem key={ii} nodeId={`room${ii}`} label={`Room ${ii}`}>
					<Room
						key={`${ii}-${data.sprites.sprites.length}-${data.objects.objects.length}`}
						room={ii}
						data={data}
						onSpriteExcludeChange={(spriteIndex) =>
							handleExcludeChange(ii, 'sprites', spriteIndex)
						}
						onObjectExcludeChange={(objectIndex) =>
							handleExcludeChange(ii, 'objects', objectIndex)
						}
						onInsertSpriteBytes={(b) =>
							setParsed((p) => {
								return {
									...p,
									[`room${ii}`]: {
										...p[`room${ii}` as keyof LevelTree],
										sprites: {
											// @ts-ignore sprites is not in header, only in rooms
											...p[`room${ii}` as keyof LevelTree].sprites,
											pendingRawBytes: b,
										},
									},
								};
							})
						}
						onInsertObjectBytes={(b) =>
							setParsed((p) => {
								return {
									...p,
									[`room${ii}`]: {
										...p[`room${ii}` as keyof LevelTree],
										objects: {
											// @ts-ignore sprites is not in header, only in rooms
											...p[`room${ii}` as keyof LevelTree].objects,
											pendingRawBytes: b,
										},
									},
								};
							})
						}
					/>
				</TreeItem>
			);
		}
	}

	return (
		<TreeView>
			<TreeItem nodeId="header" label="Header">
				<Header data={parsed.header} />
			</TreeItem>
			{rooms}
		</TreeView>
	);
}

export { HexTree };
