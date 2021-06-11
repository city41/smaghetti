import React, { useState } from 'react';
import clsx from 'clsx';
import { LoadingBar } from '../../../LoadingBar';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../constants';
import { TILE_SIZE } from '../../../../tiles/constants';
import { RoomThumbnail } from '../../../RoomThumbnail';
import { PlainIconButton } from '../../../PlainIconButton';
import { FaTrash } from 'react-icons/fa';

type SavedLevelsProps = {
	className?: string;
	loadingState: 'dormant' | 'loading' | 'error' | 'success';
	levels: Array<Level | BrokenLevel>;
	thumbnailScale: number;
	onLevelChosen: (level: Level) => void;
	onDeleteLevel: (level: Level | BrokenLevel) => void;
};

function isBrokenLevel(level: Level | BrokenLevel): level is BrokenLevel {
	return 'broken' in level;
}

function BrokenThumbnail({ scale }: { scale: number }) {
	return (
		<div
			style={{
				width: PLAY_WINDOW_TILE_WIDTH * 1.5 * TILE_SIZE * scale,
				height: PLAY_WINDOW_TILE_HEIGHT * TILE_SIZE * scale,
			}}
			className="bg-red-200 text-red-700 text-xs border-2 border-red-700 grid place-items-center"
		>
			level no longer compatible
		</div>
	);
}

function DeleteLevel({ onDeleteLevel }: { onDeleteLevel: () => void }) {
	const [showAreYouSure, setShowAreYouSure] = useState(false);

	return (
		<div className="relative justify-self-end">
			<PlainIconButton
				label="delete"
				icon={FaTrash}
				onClick={() => setShowAreYouSure(true)}
			/>
			{showAreYouSure && (
				<div className="flex flex-col items-center absolute -top-4 right-0 w-48 bg-gray-900 p-2">
					<div className="font-bold text-red-500">delete, are you sure?</div>
					<div className="flex flex-row justify-around w-full">
						<a
							className="hover:underline cursor-pointer"
							onClick={onDeleteLevel}
						>
							yes
						</a>
						<a
							className="hover:underline cursor-pointer"
							onClick={() => setShowAreYouSure(false)}
						>
							no
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

type LevelRowProps = {
	level: Level | BrokenLevel;
	scale: number;
	onLevelChosen: () => void;
	onDeleteLevel: () => void;
};

function LevelRow({
	level,
	scale,
	onLevelChosen,
	onDeleteLevel,
}: LevelRowProps) {
	const thumbnail = isBrokenLevel(level) ? (
		<BrokenThumbnail scale={scale} />
	) : (
		<button
			className="relative border-2 border-white group"
			onClick={onLevelChosen}
		>
			<div className="absolute top-0 left-0 w-full h-full block group-hover:hidden bg-white opacity-25" />
			<RoomThumbnail
				upperLeftTile={{
					x: 0,
					y: level.data.rooms[0].roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
				}}
				widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
				heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
				scale={scale}
				room={level.data.rooms[0]}
			/>
		</button>
	);

	return (
		<>
			{thumbnail}
			<div
				className={clsx('w-56', {
					'font-bold': !isBrokenLevel(level),
				})}
			>
				{level.name}
			</div>
			<DeleteLevel onDeleteLevel={onDeleteLevel} />
		</>
	);
}

function SavedLevels({
	className,
	loadingState,
	levels,
	thumbnailScale,
	onLevelChosen,
	onDeleteLevel,
}: SavedLevelsProps) {
	let body = null;

	switch (loadingState) {
		case 'loading':
			body = <LoadingBar percent={100} />;
			break;
		case 'error':
			body = (
				<div className="bg-red-200 text-black p-2">
					Failed to load your saved levels, try refreshing the browser
				</div>
			);
			break;
		case 'success':
			if (levels.length > 0) {
				body = (
					<div
						className="grid overflow-y-auto gap-y-4 gap-x-4 items-center mb-2"
						style={{
							gridTemplateColumns: 'min-content 1fr max-content',
						}}
					>
						{levels.map((l) => {
							return (
								<LevelRow
									key={l.id}
									level={l}
									scale={thumbnailScale}
									onLevelChosen={() => onLevelChosen(l as Level)}
									onDeleteLevel={() => onDeleteLevel(l)}
								/>
							);
						})}
					</div>
				);
			} else {
				body = (
					<div className="grid place-items-center pt-4 pb-8 text-gray-400">
						Once you save a level, it will show up here
					</div>
				);
			}
			break;
	}

	return <div className={clsx(className)}>{body}</div>;
}

export { SavedLevels };
