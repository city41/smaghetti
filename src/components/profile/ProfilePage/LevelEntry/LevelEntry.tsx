import React from 'react';
import clsx from 'clsx';
import { MdDelete, MdEdit, MdFileDownload, MdShare } from 'react-icons/md';
import { LevelThumbnail } from '../../../LevelThumbnail';
import {
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../make/constants';
import { IconButton } from '../../../IconButton';
import { IconButtonGroup } from '../../../IconButton/IconButtonGroup';

type LevelEntryProps = {
	className?: string;
	level: Level;
};

const THUMBNAIL_HEIGHT = PLAY_WINDOW_TILE_HEIGHT * 1.5 + 1;

function LevelEntry({ className, level }: LevelEntryProps) {
	return (
		<div className={clsx(className, 'flex flex-row group')}>
			<div>
				<h3 className="text-xl font-bold pl-2 pb-0.5">{level.name}</h3>
				<LevelThumbnail
					className="border-4 border-white rounded-l-xl bg-blue-100 group-hover:bg-blue-500"
					tileX={0}
					tileY={level.data.tileLayer.height - THUMBNAIL_HEIGHT}
					tileWidth={Math.min(
						level.data.tileLayer.width,
						PLAY_WINDOW_TILE_WIDTH * 2
					)}
					tileHeight={THUMBNAIL_HEIGHT}
					scale={0.75}
					tileData={level.data.tileLayer.data}
					entities={level.data.entities}
				/>
			</div>
			<IconButtonGroup className="self-end" anchor="left">
				<IconButton anchor="left" icon={MdEdit} label="Edit level" alternate />
				<IconButton
					anchor="left"
					icon={MdShare}
					label="Share level (not yet ready)"
					alternate
					disabled
				/>
				<IconButton
					anchor="left"
					icon={MdFileDownload}
					label="Download level (not yet ready)"
					alternate
					disabled
				/>
				<IconButton
					anchor="left"
					icon={MdDelete}
					label="Delete level"
					alternate
				/>
			</IconButtonGroup>
		</div>
	);
}

export { LevelEntry };
