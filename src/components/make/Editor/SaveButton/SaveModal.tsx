import React, { useEffect } from 'react';
import clsx from 'clsx';

import { Modal } from '../../../Modal';
import { LevelThumbnail } from '../../../LevelThumbnail';
import { TILE_SIZE } from '../../../../tiles/constants';
import {
	INITIAL_LEVEL_TILE_WIDTH,
	INITIAL_LEVEL_TILE_HEIGHT,
} from '../../constants';
import {
	ShareLevelViaFacebook,
	ShareLevelViaTwitter,
	CopyLevelToClipboardLink,
} from './ShareLevelViaSocialMediaLinks';

type SaveModalProps = {
	className?: string;
	isOpen?: boolean;
	onClose: () => void;
	levelTileWidth: number;
	levelTileHeight: number;
	tileData: TileMatrix;
	entities: Entity[];
	saveLevel: () => void;
	savingLevel?: boolean;
	saveLevelError?: string | null;
	levelUrl?: string;
};

// const Content = styled.div`
// 	display: flex;
// 	flex-direction: column;
//
// 	align-items: center;
//
// 	overflow: hidden;
//
// 	& p {
// 		margin: 0;
// 		padding: 24px 0;
// 		align-self: stretch;
// 	}
//
// 	& p + p {
// 		padding-top: 0px;
// 	}
//
// 	& .thumbnail {
// 		box-sizing: content-box !important;
// 		border-bottom: 1px solid white;
// 	}
//
// 	& .levelTooWide::after {
// 		content: '';
//
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		width: 100%;
// 		height: 100%;
//
// 		background-image: linear-gradient(
// 			to right,
// 			transparent 0,
// 			transparent 60%,
// 			#000d28 100%
// 		);
// 	}
// `;
//
// const Body = styled.div`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	// justify-content: space-around;
//
// 	padding: 0 32px;
//
// 	text-align: center;
//
// 	& p {
// 		margin: 0;
// 		padding: 32px 0 8px 0;
// 	}
// `;
//
// const URLContainer = styled.div`
// 	padding: 32px;
// 	padding-top: 0;
// 	color: white;
// 	user-select: text;
// `;
//
// const URL = styled.a`
// 	font-weight: bold;
// 	font-size: 24px;
// 	color: white;
//
// 	text-decoration: none;
//
// 	&:hover {
// 		text-decoration: underline;
// 	}
// `;
//
// const SharingContainer = styled.div`
// 	width: 100%;
// 	display: grid;
// 	grid-template-columns: repeat(3, 1fr);
// 	column-gap: 16px;
// `;
//
// const Error = styled.p`
// 	text-align: center;
// 	margin-top: 8px !important;
// 	padding: 4px !important;
// 	background-color: red;
// 	color: white;
// 	align-self: center !important;
// `;

const SCALE = 0.75;

const MAX_AMOUNT_OF_LEVEL_TO_SHOW = (INITIAL_LEVEL_TILE_WIDTH * 2) / 3;

function SaveModal({
	isOpen,
	onClose,
	levelTileWidth,
	levelTileHeight,
	tileData,
	entities,
	saveLevel,
	savingLevel,
	saveLevelError,
	levelUrl,
}: SaveModalProps) {
	useEffect(() => {
		saveLevel();
	}, []);

	const levelUrlForDisplay = levelUrl
		?.replace('http://', '')
		.replace('https://', '')
		.replace('www.', '');

	const thumbnailClassName = clsx('thumbnail', {
		levelTooWide: levelTileWidth > MAX_AMOUNT_OF_LEVEL_TO_SHOW,
	});

	return (
		<Modal
			isOpen={!!isOpen}
			onRequestClose={!savingLevel ? onClose : undefined}
			onOkClick={onClose}
			okDisabled={savingLevel}
			title="Level Published!"
		>
			<div>
				<LevelThumbnail
					className={thumbnailClassName}
					tileData={tileData}
					entities={entities}
					tileX={0}
					tileY={0}
					tileHeight={Math.min(INITIAL_LEVEL_TILE_HEIGHT, levelTileHeight)}
					tileWidth={Math.min(levelTileWidth, MAX_AMOUNT_OF_LEVEL_TO_SHOW)}
					tileSize={TILE_SIZE}
					scale={SCALE}
				/>
				{savingLevel && <p>Just a moment...</p>}
				{levelUrl && !saveLevelError && (
					<div>
						<p>Your level has been published, and is now playable at</p>
						<div>
							<a href={levelUrl} target="_blank">
								{levelUrlForDisplay}
							</a>
						</div>
						<div>
							<CopyLevelToClipboardLink levelUrl={levelUrl} />
							<ShareLevelViaTwitter levelUrl={levelUrl} />
							<ShareLevelViaFacebook levelUrl={levelUrl} />
						</div>
					</div>
				)}
				{saveLevelError && <p>{saveLevelError}</p>}
			</div>
		</Modal>
	);
}

export { SaveModal };
export type { SaveModalProps };
