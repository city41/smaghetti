import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
	drawTile,
	rgbToGBA16,
} from '../../../tiles/extractResourcesToStylesheet';

type TileImageProps = {
	className?: string;
	index: number | null;
	tile: number[];
	focused?: boolean;
};

const FOCUSED_PALETTE: number[] = (function () {
	let p = [];
	for (let i = 0; i < 16; ++i) {
		const red = Math.floor((i / 15) * 255);
		const green = Math.floor((i / 15) * 100);
		const blue = Math.floor((i / 15) * 20);

		p[i] = rgbToGBA16(red, green, blue);
	}

	return p;
})();

function TileImage({ className, index, tile, focused }: TileImageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const palette = focused ? FOCUSED_PALETTE : undefined;
			const tileCanvas = drawTile(tile, palette);

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
				<div className="bg-black text-white text-xs">{index}</div>
			)}
		</div>
	);
}

export { TileImage };
