import React, { CSSProperties, memo } from 'react';
import clsx from 'clsx';
import { createLevelData } from '../../../../levelData/createLevelData';
import { compress } from '../../../../levelData/compress';
import { LevelSizeMeter } from './LevelSizeMeter';
import memoize from 'lodash/memoize';
import { EntityAndProblemCount } from './EntityAndProblemCount';
import { PlainIconButton } from '../../../PlainIconButton';
import { IconExperiment } from '../../../../icons';
import { MarioLuigiToggle } from './MarioLuigiToggle';

type PublicFooterProps = {
	className?: string;
	style?: CSSProperties;
	tileMouseIsOver: null | Point;
	onProblemClick: () => void;
};

type InternalFooterProps = {
	level: LevelToLoadInGBA;
	playAsCharacter: PlayAsCharacter;
	onExperimentsClick: () => void;
	onPlayAsCharacterToggle: () => void;
};

const memoCompress = memoize(compress);

const Footer = memo(function Footer({
	className,
	style,
	tileMouseIsOver,
	level,
	playAsCharacter,
	onPlayAsCharacterToggle,
	onProblemClick,
	onExperimentsClick,
}: PublicFooterProps & InternalFooterProps) {
	const levelData = createLevelData(level);
	const compressedA = memoCompress(levelData, 0);
	const compressedB = memoCompress(levelData, 0x80);
	const byteSize = Math.min(compressedA.byteLength, compressedB.byteLength);

	return (
		<div
			className={clsx(
				className,
				'bg-gray-700 px-4 py-1 flex flex-row gap-x-2 justify-end items-center'
			)}
			style={style}
		>
			<MarioLuigiToggle
				className="mr-2"
				currentValue={playAsCharacter}
				onClick={onPlayAsCharacterToggle}
			/>
			<EntityAndProblemCount
				rooms={level.data.rooms}
				onProblemClick={onProblemClick}
			/>
			<div className="flex-1" />
			<LevelSizeMeter
				className="w-1/3"
				byteSize={byteSize}
				ranges={[2024, 2070, 2110]}
			/>
			<div className="text-xs text-gray-400 w-16 text-center">
				({tileMouseIsOver?.x ?? '-'}, {tileMouseIsOver?.y ?? '-'})
			</div>
			<PlainIconButton
				size="small"
				icon={IconExperiment}
				label="show experiments"
				onClick={onExperimentsClick}
			/>
		</div>
	);
});

export { Footer };
export type { PublicFooterProps };
