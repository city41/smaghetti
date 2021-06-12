import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import useClipboard from 'react-use-clipboard';
import {
	ExtractedEntityTileData,
	renderTiles,
} from '../../../tiles/extractResourcesToStylesheet';

type PalettedEntityProps = {
	className?: string;
	palette: Tuple<number, 16>;
	entity: ExtractedEntityTileData;
};

function drawEntity(
	canvas: HTMLCanvasElement,
	entity: ExtractedEntityTileData,
	palette: Tuple<number, 16>
) {
	renderTiles(canvas, entity, [palette], { firstColorOpaque: true });
}

function PalettedEntity({ className, palette, entity }: PalettedEntityProps) {
	const ref = useRef<HTMLCanvasElement | null>(null);
	const [hasCopied, setHasCopied] = useClipboard(
		`[${palette.map((c) => `0x${c.toString(16)}`).join(', ')}]`
	);

	useEffect(() => {
		if (ref.current) {
			drawEntity(ref.current, entity, palette);
		}
	}, [palette, entity]);

	return (
		<div className={clsx(className, { relative: hasCopied })}>
			<canvas
				ref={ref}
				className="bg-red-100 w-full h-full"
				width={entity[0].length * 8}
				height={entity.length * 8}
				onClick={() => setHasCopied()}
			/>
			{hasCopied && (
				<div className="absolute bottom-0 left-0 z-10 w-full text-center bg-black text-white">
					copied!
				</div>
			)}
		</div>
	);
}

export { PalettedEntity };
