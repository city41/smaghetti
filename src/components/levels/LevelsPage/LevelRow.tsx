import React from 'react';
import clsx from 'clsx';
import { RoomThumbnail } from '../../RoomThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../make/constants';

type LevelRowProps = {
	className?: string;
	level: Level;
};

function makeSlug(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, '-').substr(0, 30);
}

function LevelRow({ className, level }: LevelRowProps) {
	const href = `/make/${level.id}/${makeSlug(level.name)}`;

	return (
		<div
			className={clsx(
				className,
				'grid gap-x-4 items-center group hover:bg-gray-600 p-2'
			)}
			style={{ gridTemplateColumns: 'max-content 1fr max-content' }}
		>
			<a className="relative border-2 border-white" href={href}>
				<div className="absolute top-0 left-0 w-full h-full block group-hover:hidden bg-white opacity-25" />
				<RoomThumbnail
					upperLeftTile={{
						x: 0,
						y: level.data.rooms[0].roomTileHeight - PLAY_WINDOW_TILE_HEIGHT,
					}}
					widthInTiles={PLAY_WINDOW_TILE_WIDTH * 1.5}
					heightInTiles={PLAY_WINDOW_TILE_HEIGHT}
					scale={0.5}
					room={level.data.rooms[0]}
				/>
			</a>
			<a
				className="text-lg font-bold group-hover:underline cursor-pointer"
				href={href}
			>
				{level.name}
			</a>
			<div className="text-right ml-4">
				by <span className="font-bold">{level.user?.username}</span>
			</div>
		</div>
	);
}

export { LevelRow };
