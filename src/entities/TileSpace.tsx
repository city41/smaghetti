import React, { CSSProperties } from 'react';
import clsx from 'clsx';

type TileSpaceProps = {
	className?: string;
	style?: CSSProperties;
};

function TileSpace({ className, style }: TileSpaceProps) {
	return (
		<div
			style={style}
			className={clsx(
				className,
				'TileSpace cursor-move border border-blue-300 border-dashed w-full h-full pointer-events-none'
			)}
		/>
	);
}

export { TileSpace };
