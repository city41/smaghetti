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
import { Button } from '../../../Button';
import { isBrokenLevel } from './util';

type SavedLevelsProps = {
	className?: string;
	loadingState: 'dormant' | 'loading' | 'error' | 'success';
	levels: Array<Level | BrokenLevel>;
	isAdmin: boolean;
	thumbnailScale: number;
	onLevelChosen: (level: Level) => void;
	onDeleteLevel: (level: Level | BrokenLevel) => void;
	onTogglePublishLevel: (level: Level) => void;
};

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
	isAdmin: boolean;
	scale: number;
	onLevelChosen: () => void;
	onDeleteLevel: () => void;
	onTogglePublishLevel: () => void;
};

function LevelRow({
	level,
	isAdmin,
	scale,
	onLevelChosen,
	onDeleteLevel,
	onTogglePublishLevel,
}: LevelRowProps) {
	const thumbnail = isBrokenLevel(level) ? (
		<BrokenThumbnail scale={scale} />
	) : (
		<button className="relative border-2 border-white" onClick={onLevelChosen}>
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

	const repeatCount = isAdmin ? 3 : 2;
	const gridTemplateColumns = `min-content 1fr repeat(${repeatCount}, max-content)`;

	return (
		<div
			className="grid items-center group hover:bg-blue-500 -mx-4 px-4 gap-x-2"
			style={{
				gridTemplateColumns,
			}}
		>
			{thumbnail}
			<div
				className={clsx('w-56 h-full flex flex-row items-center pl-4', {
					'font-bold hover:underline cursor-pointer': !isBrokenLevel(level),
				})}
				onClick={() => {
					if (!isBrokenLevel(level)) {
						onLevelChosen();
					}
				}}
			>
				{level.name}
			</div>
			{isAdmin && !isBrokenLevel(level) && (
				<div className="text-xs text-gray-400">{level.user?.username}</div>
			)}
			{isBrokenLevel(level) ? (
				<div />
			) : (
				<Button onClick={onTogglePublishLevel}>
					{level.published ? 'unpublish' : 'publish'}
				</Button>
			)}
			<DeleteLevel onDeleteLevel={onDeleteLevel} />
		</div>
	);
}

function SavedLevels({
	className,
	loadingState,
	levels,
	isAdmin,
	thumbnailScale,
	onLevelChosen,
	onDeleteLevel,
	onTogglePublishLevel,
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
					<div className="mb-2 space-y-6">
						{levels.map((l) => {
							return (
								<LevelRow
									key={l.id}
									level={l}
									isAdmin={isAdmin}
									scale={thumbnailScale}
									onLevelChosen={() => onLevelChosen(l as Level)}
									onDeleteLevel={() => onDeleteLevel(l)}
									onTogglePublishLevel={() => onTogglePublishLevel(l as Level)}
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
