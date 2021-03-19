import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
	ExtractedEntityTileData,
	renderTiles,
} from '../../../tiles/extractResource';

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
	renderTiles(canvas, entity, palette, { firstColorOpaque: true });
}

function PalettedEntity({ className, palette, entity }: PalettedEntityProps) {
	const ref = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (ref.current) {
			drawEntity(ref.current, entity, palette);
		}
	}, [palette, entity]);

	return (
		<canvas
			ref={ref}
			className={clsx(className, 'bg-red-100 w-full h-full')}
			width={entity[0].length * 8}
			height={entity.length * 8}
		>
			{palette[0]}, {entity[0][0].romOffset}
		</canvas>
	);
}

export { PalettedEntity };
