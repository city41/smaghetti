import React, { Fragment } from 'react';
import { RiFocus3Line } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';

import {
	Add,
	ByteSizes,
	ExcludeAfter,
	Exclusion,
	LevelTree,
	Patch,
	RoomIndex,
} from '../../types';
import { Room } from './Room';
import { PlainIconButton } from '../../../PlainIconButton';

type HexTreeProps = {
	tree: LevelTree;
	onExcludeChange: (exclusion: Exclusion) => void;
	onExcludeAfter: (arg: ExcludeAfter) => void;
	onPatch: (patch: Patch) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	focusedEntity: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onEntityFocus: (entity: any) => void;
	onAdd: (add: Add) => void;
	onFourBytes: (arg: { type: 'object'; id: number }) => void;
	onFiveBytes: (arg: { type: 'object'; id: number }) => void;
	byteSizes: ByteSizes;
};

function HexTree({
	tree,
	onExcludeChange,
	onExcludeAfter,
	onPatch,
	onAdd,
	focusedEntity,
	onEntityFocus,
	onFourBytes,
	onFiveBytes,
	byteSizes,
}: HexTreeProps) {
	const roomButtons = [];

	for (let i = 0; i < tree.rooms.length; ++i) {
		roomButtons.push(
			<div key={i} className="text-gray-900 flex flex-row">
				<div className="font-bold mr-2">{i}</div>
				<PlainIconButton
					label="scroll to"
					icon={RiFocus3Line}
					onClick={() => {
						const target = document.getElementById(`room-${i}`);
						if (target) {
							target.scrollIntoView();
						}
					}}
				/>
				<PlainIconButton
					label="toggle exclude"
					icon={tree.rooms[i].exclude ? BiHide : BiShow}
					onClick={() =>
						onExcludeChange({ roomIndex: i as RoomIndex, type: 'room' })
					}
				/>
			</div>
		);
	}

	const rooms = tree.rooms.map((r, i) => {
		if (r.exclude) {
			return null;
		}

		return (
			<Fragment key={i}>
				<div id={`room-${i}`} />
				<Room
					roomIndex={i as RoomIndex}
					room={r}
					focusedEntity={focusedEntity}
					onExcludeChange={onExcludeChange}
					onExcludeAfter={onExcludeAfter}
					onPatch={onPatch}
					onAdd={onAdd}
					onEntityFocus={onEntityFocus}
					onFourBytes={onFourBytes}
					onFiveBytes={onFiveBytes}
					byteSizes={byteSizes}
				/>
			</Fragment>
		);
	});

	return (
		<div className="relative mt-8">
			<div className="h-96 overflow-auto">{rooms}</div>
			<div className="flex flex-row space-x-6 my-2 pl-2 absolute right-8 top-0.5 z-10">
				{roomButtons}
			</div>
		</div>
	);
}

export { HexTree };
