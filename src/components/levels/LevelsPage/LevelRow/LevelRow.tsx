import React from 'react';
import clsx from 'clsx';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { RoomThumbnail } from '../../../RoomThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../editor/constants';
import { TILE_SIZE } from '../../../../tiles/constants';

import styles from './LevelRow.module.css';

type LevelRowProps = {
	className?: string;
	level: Level;
	areFilesReady: boolean;
	isBuildingSave: boolean;
	isChosen: boolean;
	onChosenChange: (newChosen: boolean) => void;
};

function makeSlug(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, '-').substr(0, 30);
}

function BlankThumbnail({ scale }: { scale: number }) {
	return (
		<div
			style={{
				width: PLAY_WINDOW_TILE_WIDTH * 1.5 * TILE_SIZE * scale,
				height: PLAY_WINDOW_TILE_HEIGHT * TILE_SIZE * scale,
			}}
			className="bg-gray-900"
		/>
	);
}

const SCALE = 1;

const aceCoinSlotStyle = {
	width: TILE_SIZE * 2 * SCALE,
	height: TILE_SIZE * 3 * SCALE,
};

function LevelRow({
	className,
	level,
	areFilesReady,
	isBuildingSave,
	isChosen,
	onChosenChange,
}: LevelRowProps) {
	const href = `/editor/${level.id}/${makeSlug(level.name)}`;

	function chooseDontNavIfBuilding(e: React.MouseEvent<HTMLAnchorElement>) {
		if (isBuildingSave) {
			e.preventDefault();
			e.stopPropagation();
			onChosenChange(!isChosen);
		}
	}

	const CheckIcon = isChosen ? FaCheck : ImCheckboxUnchecked;

	const aceCoinCount = level.data.rooms.reduce<number>((building, room) => {
		const aceCoins = room.stage.entities.filter((e) => {
			return e.type === 'AceCoin';
		});

		const bubblesWithAceCoins = room.actors.entities.filter((e) => {
			return e.type === 'Bubble' && e.settings?.payload === 'AceCoin';
		});

		return building + aceCoins.length + bubblesWithAceCoins.length;
	}, 0);

	const aceCoinSlots = [];

	for (let i = 0; i < aceCoinCount; ++i) {
		aceCoinSlots.push(
			<div
				key={i}
				className="AceCoinSlot-bg bg-cover"
				style={aceCoinSlotStyle}
			/>
		);
	}

	if (aceCoinSlots.length === 0) {
		aceCoinSlots.push(<div style={aceCoinSlotStyle} />);
	}

	return (
		<div
			className={clsx(
				className,
				styles.root,
				'grid gap-x-4 items-center group p-4 border-2 border-black rounded-lg text-black'
			)}
		>
			<a
				className={clsx('relative flex flex-row items-center -ml-4 -my-4', {
					'space-x-2': isBuildingSave,
				})}
				href={href}
				onClick={chooseDontNavIfBuilding}
			>
				<div className="absolute top-0 left-0 w-full h-full block group-hover:hidden bg-white opacity-30 z-10" />
				{isBuildingSave && (
					<CheckIcon
						className={clsx('w-5 h-5', {
							'bg-green-500 p-1 rounded-sm': isChosen,
						})}
					/>
				)}
				{areFilesReady ? (
					<RoomThumbnail
						upperLeftTile={{
							x: 0,
							y: level.data.rooms[0].roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
						}}
						widthInTiles={PLAY_WINDOW_TILE_WIDTH}
						heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
						scale={0.75}
						room={level.data.rooms[0]}
					/>
				) : (
					<BlankThumbnail scale={0.75} />
				)}
			</a>
			<div className="flex flex-col gap-y-1">
				<a
					className="text-xl font-bold cursor-pointer"
					href={href}
					onClick={chooseDontNavIfBuilding}
				>
					{level.name}
				</a>
				<div className="w-full border" style={{ borderColor: '#297bde' }} />
				<div className="flex flex-row justify-between">
					<div className="flex flex-row gap-x-1">{aceCoinSlots}</div>
					<div className="text-sm">
						by <span className="font-bold">{level.user?.username}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export { LevelRow };
