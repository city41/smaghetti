import React, { useEffect, useRef } from 'react';
import { gba16ToRgb } from '../../../tiles/extractResourcesToStylesheet';
import { getRom } from '../../FileLoader/files';

type PalettePreviewProps = {
	offset: number;
	size: number;
};

function drawPalette(canvas: HTMLCanvasElement, palette: number[]) {
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;
	const rect = canvas.getBoundingClientRect();

	context.clearRect(0, 0, rect.width, rect.height);

	const colorPercent = 1 / (palette.length / 2);
	for (let p = 0; p < palette.length; p += 2) {
		const color = gba16ToRgb((palette[p + 1] << 8) | palette[p]);
		const css = `rgb(${color[0]}, ${color[1]}, ${color[2]}`;

		context.fillStyle = css;

		const width = Math.round(rect.width * colorPercent);
		const x = width * (p / 2);

		context.fillRect(x, 0, width, rect.height);
	}
}

function PalettePreview({ offset, size }: PalettePreviewProps) {
	const ref = useRef<HTMLCanvasElement | null>(null);

	const palette = Array.from(getRom()!.slice(offset, offset + size));

	useEffect(() => {
		if (ref && ref.current) {
			drawPalette(ref.current, palette);
		}
	}, [offset, size]);

	return <canvas ref={ref} className="h-full w-full" />;
}

export { PalettePreview };
