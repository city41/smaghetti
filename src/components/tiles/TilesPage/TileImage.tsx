import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

type TileImageProps = {
	className?: string;
	index: number | null;
	tile: number[];
};

let palette: number[] = [];

for (let i = 0; i < 16; ++i) {
	palette[i] = 255 * (i / 15);
}

function TileImage({ className, index, tile }: TileImageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d')!;

			const imageData = context.getImageData(0, 0, 8, 8);

			for (let i = 0; i < tile.length; ++i) {
				const lowerPixel = (tile[i] >> 4) & 0xf;
				const upperPixel = tile[i] & 0xf;

				imageData.data[i * 8 + 0] = palette[upperPixel];
				imageData.data[i * 8 + 1] = palette[upperPixel];
				imageData.data[i * 8 + 2] = palette[upperPixel];
				imageData.data[i * 8 + 3] = upperPixel === 0 ? 0 : 255;

				imageData.data[i * 8 + 4] = palette[lowerPixel];
				imageData.data[i * 8 + 5] = palette[lowerPixel];
				imageData.data[i * 8 + 6] = palette[lowerPixel];
				imageData.data[i * 8 + 7] = lowerPixel === 0 ? 0 : 255;
			}

			context.putImageData(imageData, 0, 0);
		}
	}, [tile]);

	return (
		<div
			className={clsx(className, 'grid')}
			style={{ gridTemplateRows: 'max-content min-content' }}
		>
			<canvas ref={canvasRef} width={8} height={8} className="w-full" />
			{typeof index === 'number' && (
				<div className="bg-black text-white text-xs">{index}</div>
			)}
		</div>
	);
}

export { TileImage };
