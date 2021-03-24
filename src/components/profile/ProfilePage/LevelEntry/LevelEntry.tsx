import React, { useState } from 'react';
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
	onDelete: () => void;
};

const THUMBNAIL_HEIGHT = PLAY_WINDOW_TILE_HEIGHT * 1.5 + 1;

function LevelEntry({ className, level, onDelete }: LevelEntryProps) {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	return (
		<div
			className={clsx(className, 'flex flex-row group rounded-xl', {
				relative: showDeleteConfirmation,
			})}
		>
			<div>
				<h3 className="text-xl font-bold pl-2 pb-0.5">{level.name}</h3>
				<LevelThumbnail
					className={clsx('border-4 border-white rounded-l-xl', {
						'bg-blue-100 group-hover:bg-blue-500': !showDeleteConfirmation,
						'bg-red-100 group-hover:bg-red-100': showDeleteConfirmation,
					})}
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
					disabled={showDeleteConfirmation}
					onClick={() => setShowDeleteConfirmation(true)}
				/>
			</IconButtonGroup>
			{showDeleteConfirmation && (
				<div className="absolute bottom-1 left-0 w-full grid place-items-center">
					<div className="w-2/3  py-2 text-center bg-red-900 text-red-200 space-x-4">
						<span>really delete?</span>
						<a className="hover:underline cursor-pointer" onClick={onDelete}>
							yes
						</a>
						<a
							className="hover:underline cursor-pointer"
							onClick={() => setShowDeleteConfirmation(false)}
						>
							no
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export { LevelEntry };
