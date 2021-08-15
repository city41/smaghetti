import React from 'react';
import clsx from 'clsx';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiLoaderFill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { RoomThumbnail } from '../../../RoomThumbnail';
import {
	LEVEL_TAGS,
	PLAY_WINDOW_TILE_HEIGHT,
	PLAY_WINDOW_TILE_WIDTH,
} from '../../../editor/constants';
import { TILE_SIZE } from '../../../../tiles/constants';

import styles from './LevelRow.module.css';

type PublicLevelRowProps = {
	className?: string;
	level: Level;
	areFilesReady: boolean;
	isBuildingSave: boolean;
	isChosen: boolean;
	onChosenChange: (newChosen: boolean) => void;
};

type InternalLevelRowProps = {
	voteCount: number;
	currentUserVoted: boolean;
	isVoting: boolean;
	onVoteClick: () => void;
};

function makeSlug(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, '-').substr(0, 30);
}

function BlankThumbnail({ scale }: { scale: number }) {
	return (
		<div
			style={{
				width: PLAY_WINDOW_TILE_WIDTH * TILE_SIZE * scale,
				height: PLAY_WINDOW_TILE_HEIGHT * TILE_SIZE * scale,
			}}
			className="bg-gray-900"
		/>
	);
}

const SCALE = 1;

const aceCoinSlotStyle = {
	width: TILE_SIZE * 1 * SCALE,
	height: TILE_SIZE * 2 * SCALE,
};

function isValidTag(tag: string | undefined): boolean {
	return tag !== '-' && tag !== undefined && LEVEL_TAGS.includes(tag);
}

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
}: PublicLevelRowProps & InternalLevelRowProps) {
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
			<div key={i} className="AceCoin-bg bg-cover" style={aceCoinSlotStyle} />
		);
	}

	const VoteIcon = isVoting
		? RiLoaderFill
		: currentUserVoted
		? AiFillHeart
		: AiOutlineHeart;

	const tag0Valid = isValidTag(level.data.settings.tag0);
	const tag1Valid = isValidTag(level.data.settings.tag1);

	return (
		<div
			className={clsx(
				className,
				styles.root,
				'relative grid gap-x-4 items-center group shadow-xl bg-gray-300 hover:bg-blue-300 text-gray-900',
				{ 'cursor-pointer': isBuildingSave }
			)}
			onClick={() => {
				if (isBuildingSave) {
					onChosenChange(!isChosen);
				}
			}}
		>
			<div
				className="absolute right-0 top-0 bg-white p-1 flex flex-row gap-x-1 items-center cursor-pointer"
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
			<a
				className={clsx('relative flex flex-row items-center self-start', {
					'space-x-2 ml-0': isBuildingSave,
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
					/>
				) : (
					<BlankThumbnail scale={0.75} />
				)}
			</a>
			<div
				className="grid gap-y-1 h-full p-1"
				style={{ gridTemplateRows: 'max-content 1fr max-content' }}
			>
				<a
					className="inline-block text-2xl font-bold cursor-pointer pt-1"
					href={href}
					onClick={chooseDontNavIfBuilding}
				>
					{level.name}
				</a>
				{(aceCoinCount > 0 || tag0Valid || tag1Valid) && (
					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-x-2 items-center">
							{aceCoinCount > 0 && (
								<div className="flex flex-row gap-x-1">{aceCoinSlots}</div>
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
					<p className="text-xs pb-1">{level.data.settings.description}</p>
					<div className="text-sm self-end">
						by <span className="font-bold">{level.user?.username}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export { LevelRow };
export type { PublicLevelRowProps };
