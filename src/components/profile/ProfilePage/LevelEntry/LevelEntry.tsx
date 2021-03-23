import React from 'react';
import clsx from 'clsx';
import { LevelThumbnail } from '../../../LevelThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../make/constants';

type LevelEntryProps = {
	className?: string;
	level: Level;
};

function LevelEntry({ className, level }: LevelEntryProps) {
	return (
		<div className={clsx(className, 'p-2 border border-gray-500')}>
			<h2 className="text-xl font-bold">{level.name}</h2>
			<div className="grid grid-cols-3">
				<div className="col-span-2">
					<LevelThumbnail
						tileX={0}
						tileY={level.data.tileLayer.height - PLAY_WINDOW_TILE_HEIGHT}
						tileWidth={PLAY_WINDOW_TILE_WIDTH}
						tileHeight={PLAY_WINDOW_TILE_HEIGHT}
						scale={0.5}
						tileData={level.data.tileLayer.data}
						entities={level.data.entities}
					/>
				</div>
				<div>
					<ul>
						<li>Edit</li>
						<li>Delete</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export { LevelEntry };
