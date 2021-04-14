import React from 'react';
import { useSelector } from 'react-redux';

import { HexTreePage } from './HexTreePage';
import { AppState, dispatch } from '../../../store';
import { bindActionCreators } from 'redux';
import { loadLevel, loadEmptyLevel, toggleExclude } from '../hexTreeSlice';
import { BinaryRoom, LevelTree, LevelTreeRoom } from '../types';
import { POINTER_AREA_SIZE_IN_BYTES } from '../../../levelData/constants';
import { getLevelName, setPointer } from '../../../levelData/createLevelData';

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

function parseTreeToData(parsed: LevelTree): Uint8Array {
	// header
	const header = parsed.header.rawBytes;

	// pointers
	const pointers: number[] = new Array(POINTER_AREA_SIZE_IN_BYTES);

	// empty bytes between pointers and name
	const nullBytes = new Array(11).fill(0);

	// todo, actually bring the real name back in
	const name = getLevelName('SMAGHETTI');

	const room0Data = parsedRoomToBinary(parsed.rooms[0]);
	const room1Data = parsedRoomToBinary(parsed.rooms[1]);
	const room2Data = parsedRoomToBinary(parsed.rooms[2]);
	const room3Data = parsedRoomToBinary(parsed.rooms[3]);

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
	setPointer(pointers, 23, pointer + room3Data.blockPathData.length);

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

const actions = bindActionCreators(
	{
		onLevelChosen: loadLevel,
		onStartEmpty: loadEmptyLevel,
		onExcludeChange: toggleExclude,
	},
	dispatch
);

function ConnectedHexTreePage() {
	const { allFilesReady } = useSelector((state: AppState) => state.fileLoader);
	const { tree } = useSelector((state: AppState) => state.hexTree);

	const data = tree ? parseTreeToData(tree) : new Uint8Array();

	return (
		<HexTreePage
			allFilesReady={allFilesReady}
			tree={tree}
			data={data}
			{...actions}
		/>
	);
}

export { ConnectedHexTreePage };
