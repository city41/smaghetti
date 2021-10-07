import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { createLevelData } from '../../../../levelData/createLevelData';
import { compress } from '../../../../levelData/compress';
import { LevelSizeMeter } from './LevelSizeMeter';
import memoize from 'lodash/memoize';
import { Warnings } from './Warnings';

type PublicFooterProps = {
	className?: string;
	style?: CSSProperties;
	onWarningClick: () => void;
};

type InternalFooterProps = {
	level: LevelToLoadInGBA;
};

const memoCompress = memoize(compress);

function Footer({
	className,
	style,
	level,
	onWarningClick,
}: PublicFooterProps & InternalFooterProps) {
	const levelData = createLevelData(level);
	const compressedA = memoCompress(levelData, 0);
	const compressedB = memoCompress(levelData, 0x80);
	const byteSize = Math.min(compressedA.byteLength, compressedB.byteLength);

	return (
		<div
			className={clsx(
				className,
				'bg-gray-700 px-4 py-1 flex flex-row justify-end items-center'
			)}
			style={style}
		>
			<Warnings rooms={level.data.rooms} onWarningClick={onWarningClick} />
			<div className="flex-1" />
			<LevelSizeMeter
				className="w-1/3"
				byteSize={byteSize}
				ranges={[2024, 2070, 2110]}
			/>
		</div>
	);
}

export { Footer };
export type { PublicFooterProps };
