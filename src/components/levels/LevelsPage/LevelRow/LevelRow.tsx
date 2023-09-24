import React from 'react';
import clsx from 'clsx';
import TimeAgo from 'javascript-time-ago';
import TimeAgoEn from 'javascript-time-ago/locale/en';
import { RoomThumbnail } from '../../../RoomThumbnail';
import {
	LEVEL_TAGS,
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../editor/constants';
import { TILE_SIZE } from '../../../../tiles/constants';

import styles from './LevelRow.module.css';
import { entityMap } from '../../../../entities/entityMap';
import {
	IconUnchecked,
	IconHeart,
	IconHeartOutline,
	IconLoading,
	IconCheck,
} from '../../../../icons';
import { makeSlug } from '../../../util';

TimeAgo.addDefaultLocale(TimeAgoEn);
const timeAgo = new TimeAgo('en-US');

type PublicLevelRowProps = {
	className?: string;
	level: Level;
	areFilesReady: boolean;
	isBuildingSave: boolean;
	isChosen: boolean;
	hideVotes?: boolean;
	onChosenChange: (newChosen: boolean) => void;
	onLoadRomClick: () => void;
};

type InternalLevelRowProps = {
	voteCount: number;
	currentUserVoted: boolean;
	isVoting: boolean;
	onVoteClick: () => void;
};

function BlankThumbnail({
	scale,
	onLoadRomClick,
}: {
	scale: number;
	onLoadRomClick: () => void;
}) {
	return (
		<div
			style={{
				width: PLAY_WINDOW_TILE_WIDTH * TILE_SIZE * scale,
				height: PLAY_WINDOW_TILE_HEIGHT * TILE_SIZE * scale,
			}}
			className="bg-gray-900 text-white grid place-items-center text-center text-sm"
		>
			<div>
				<a
					className="text-blue-500 hover:underline cursor-pointer"
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						onLoadRomClick();
					}}
				>
					Load ROM
				</a>{' '}
				to see thumbnails
			</div>
		</div>
	);
}

const SCALE = 1;

const aceCoinSlotStyle = {
	width: TILE_SIZE * 1 * SCALE,
	height: TILE_SIZE * 2 * SCALE,
};

const eCoinStyle = {
	width: TILE_SIZE * 1.5 * SCALE,
	height: TILE_SIZE * 1.5 * SCALE,
};

function isValidTag(tag: string | undefined): boolean {
	return tag !== '-' && tag !== undefined && LEVEL_TAGS.includes(tag);
}

const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

function LevelRow({
	className,
	level,
	areFilesReady,
	isBuildingSave,
	isChosen,
	onChosenChange,
	voteCount,
	currentUserVoted,
	isVoting,
	onVoteClick,
	onLoadRomClick,
	hideVotes,
}: PublicLevelRowProps & InternalLevelRowProps) {
	const href = `/editor/${level.id}/${makeSlug(level.name)}`;

	function chooseDontNavIfBuilding(e: React.MouseEvent<HTMLAnchorElement>) {
		if (isBuildingSave) {
			e.preventDefault();
			e.stopPropagation();
			onChosenChange(!isChosen);
		}
	}

	const CheckIcon = isChosen ? IconCheck : IconUnchecked;

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
			<div key={i} className="AceCoin-bg bg-cover" style={aceCoinSlotStyle} />
		);
	}

	const hasECoin = level.data.rooms.some(
		(r) =>
			r.stage.entities.some((e) => entityMap[e.type].getECoinTileData?.(e)) ||
			r.stage.matrix.some((r) =>
				r?.some((c) => c && entityMap[c.type].getECoinTileData?.(c))
			)
	);

	const VoteIcon = isVoting
		? IconLoading
		: currentUserVoted
		? IconHeart
		: IconHeartOutline;

	const tag0Valid = isValidTag(level.data.settings.tag0);
	const tag1Valid = isValidTag(level.data.settings.tag1);

	const timestamp = level.updated_at ?? level.created_at;
	const date = new Date(timestamp);
	const diff = Math.max(0, Date.now() - date.getTime());

	let titleProp;
	let timestampContents;

	if (diff === 0) {
		titleProp = {};
		timestampContents = 'just now';
	} else {
		timestampContents = timeAgo.format(date);
		if (diff < ONE_DAY_MILLIS) {
			titleProp = { title: date.toLocaleTimeString() };
		} else {
			titleProp = { title: date.toLocaleDateString() };
		}
	}

	const timestampEl = (
		<div className="text-xs text-gray-700" {...titleProp}>
			{timestampContents}
		</div>
	);

	return (
		<div
			className={clsx(
				className,
				styles.root,
				'relative grid gap-x-4 items-center group shadow-xl bg-gray-300 hover:bg-blue-300 text-gray-900 -mx-4 sm:mx-0',
				{ 'cursor-pointer': isBuildingSave }
			)}
			onClick={() => {
				if (isBuildingSave) {
					onChosenChange(!isChosen);
				}
			}}
		>
			{!hideVotes && (
				<div
					className="absolute z-10 sm:right-0 top-0 bg-white p-1 flex flex-row gap-x-1 items-center cursor-pointer"
					style={{
						width: `calc(${
							PLAY_WINDOW_TILE_WIDTH * TILE_SIZE * 0.75 * 0.5
						}px - 1rem)`,
					}}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();

						if (!isVoting) {
							onVoteClick();
						}
					}}
				>
					<VoteIcon
						className={clsx('w-6 h-6', {
							'text-red-600': currentUserVoted && !isVoting,
						})}
					/>
					<div className="text-lg">{voteCount}</div>
				</div>
			)}
			<a
				className={clsx('relative flex flex-row items-center self-start', {
					'space-x-2 ml-2': isBuildingSave,
				})}
				href={href}
				onClick={chooseDontNavIfBuilding}
			>
				{isBuildingSave && (
					<CheckIcon
						className={clsx('w-5 h-5', {
							'bg-blue-700 text-white p-1 rounded-sm': isChosen,
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
						showPlayer
					/>
				) : (
					<BlankThumbnail scale={0.75} onLoadRomClick={onLoadRomClick} />
				)}
			</a>
			<div
				className="grid gap-y-1 h-full p-1"
				style={{ gridTemplateRows: 'max-content 1fr max-content' }}
			>
				<a
					className="inline-block text-2xl font-bold cursor-pointer pt-1 truncate hover:underline"
					href={href}
					onClick={chooseDontNavIfBuilding}
				>
					{level.name}
				</a>
				{(aceCoinCount > 0 || tag0Valid || tag1Valid || hasECoin) && (
					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-x-2 items-center">
							{aceCoinCount > 0 && (
								<>
									<div className="hidden sm:flex flex-row gap-x-1">
										{aceCoinSlots}
									</div>
									<div className="flex sm:hidden flex-row items-center gap-x-1">
										<div
											className="AceCoin-bg bg-cover"
											style={aceCoinSlotStyle}
										/>
										<div className="text-xs">{aceCoinCount}</div>
									</div>
								</>
							)}
							{hasECoin && (
								<div className="ECoin-bg bg-cover" style={eCoinStyle} />
							)}
							{tag0Valid && (
								<div className="bg-yellow-700 text-white p-1 text-xs">
									{level.data.settings.tag0}
								</div>
							)}
							{tag1Valid &&
								level.data.settings.tag0 !== level.data.settings.tag1 && (
									<div className="bg-yellow-700 text-white p-1 text-xs">
										{level.data.settings.tag1}
									</div>
								)}
						</div>
					</div>
				)}
				<div
					className="grid gap-x-4"
					style={{ gridTemplateColumns: '1fr max-content' }}
				>
					<p className="text-xs pb-2">{level.data.settings.description}</p>
					<div className="text-sm self-end flex flex-col items-end">
						<div>
							by{' '}
							<a href={`/creator/${level.user?.username}`}>
								<span className="font-bold hover:underline">
									{level.user?.username}
								</span>
							</a>
						</div>
						{timestampEl}
					</div>
				</div>
			</div>
		</div>
	);
}

export { LevelRow };
export type { PublicLevelRowProps };
