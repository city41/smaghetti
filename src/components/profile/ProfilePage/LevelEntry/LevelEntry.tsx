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
import { HowToUseDownloadModal } from './HowToUseDownloadModal';

type LevelEntryProps = {
	className?: string;
	level: Level | BrokenLevel;
	onEdit: () => void;
	onDelete: () => void;
	onDownload: () => void;
};

const THUMBNAIL_HEIGHT = PLAY_WINDOW_TILE_HEIGHT * 1.5 + 1;

function isBrokenLevel(level: Level | BrokenLevel): level is BrokenLevel {
	return 'broken' in level;
}

function NoLongerCompatible({ className }: { className?: string }) {
	return (
		<div
			style={{ width: 360, height: 192 }}
			className={clsx(
				className,
				'bg-red-300 text-black text-sm flex flex-col items-center justify-center space-y-4 px-4 text-center'
			)}
		>
			<p className="font-bold">No longer compatible. Sorry :(</p>
			<p>
				Levels will stop breaking like this once Smaghetti reaches beta quality
			</p>
		</div>
	);
}

function LevelEntry({
	className,
	level,
	onEdit,
	onDelete,
	onDownload,
}: LevelEntryProps) {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showDownloadMessage, setShowDownloadMessage] = useState(false);
	const [showHowToUseDownloadModal, setShowHowToUseDownloadModal] = useState(
		false
	);

	return (
		<>
			<HowToUseDownloadModal
				isOpen={showHowToUseDownloadModal}
				onRequestClose={() => setShowHowToUseDownloadModal(false)}
			/>
			<div
				className={clsx(className, 'flex flex-row group rounded-xl', {
					relative: showDeleteConfirmation || showDownloadMessage,
				})}
			>
				<div>
					<h3 className="text-xl font-bold pl-2 pb-0.5">{level.name}</h3>
					{isBrokenLevel(level) ? (
						<NoLongerCompatible
							className={clsx('border-4 border-white rounded-l-xl', {
								'bg-red-100 group-hover:bg-red-100': showDeleteConfirmation,
							})}
						/>
					) : (
						<LevelThumbnail
							className={clsx('border-4 border-white rounded-l-xl', {
								'bg-blue-100 group-hover:bg-blue-500': !showDeleteConfirmation,
								'bg-red-100 group-hover:bg-red-100': showDeleteConfirmation,
							})}
							tileX={0}
							tileY={level.data.rooms[0].matrixLayer.height - THUMBNAIL_HEIGHT}
							tileWidth={Math.min(
								level.data.rooms[0].matrixLayer.width,
								PLAY_WINDOW_TILE_WIDTH * 2
							)}
							tileHeight={THUMBNAIL_HEIGHT}
							scale={0.75}
							matrix={level.data.rooms[0].matrixLayer.data}
							entities={level.data.rooms[0].entities}
						/>
					)}
				</div>
				<IconButtonGroup className="self-end" anchor="left">
					<IconButton
						anchor="left"
						icon={MdEdit}
						label="Edit level"
						alternate
						onClick={onEdit}
						disabled={isBrokenLevel(level)}
					/>
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
						label="Download level"
						alternate
						onClick={() => {
							onDownload();
							setShowDownloadMessage(true);
						}}
						disabled={isBrokenLevel(level)}
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
				{showDownloadMessage && (
					<div className="absolute bottom-1 left-0 w-full grid place-items-center">
						<div className="w-2/3  py-2 text-center bg-gray-700 text-white space-x-4">
							<span>downloaded!</span>
							<a
								className="hover:underline cursor-pointer text-blue-100"
								onClick={() => setShowHowToUseDownloadModal(true)}
							>
								how to use it
							</a>
							<a
								className="hover:underline cursor-pointer text-blue-100"
								onClick={() => setShowDownloadMessage(false)}
							>
								ok
							</a>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export { LevelEntry };
