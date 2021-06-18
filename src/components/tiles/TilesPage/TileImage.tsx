import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
	documentCanvasGenerator,
	drawTile,
} from '../../../tiles/extractResourcesToStylesheet';

type TileImageProps = {
	className?: string;
	index: number | null;
	tile: number[];
	focused?: boolean;
};

function TileImage({ className, index, tile, focused }: TileImageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const tileCanvas = drawTile(tile, documentCanvasGenerator);

			canvasRef.current?.getContext('2d')!.clearRect(0, 0, 8, 8);
			canvasRef.current.getContext('2d')!.drawImage(tileCanvas, 0, 0);
		}
	}, [tile, focused]);

	return (
		<div
			className={clsx(className, 'grid')}
			style={{ gridTemplateRows: 'max-content min-content' }}
		>
			<canvas ref={canvasRef} width={8} height={8} className="w-full" />
			{typeof index === 'number' && (
				<div
					className={clsx('text-white text-xs', {
						'bg-black': !focused,
						'bg-yellow-600': focused,
					})}
				>
					{index}
				</div>
			)}
		</div>
	);
}

export { TileImage };
