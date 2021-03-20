import React, { FunctionComponent, useEffect, useRef, memo } from 'react';

// import { Entity } from '../entities/components/entity';
// import { getEntityOffset } from '../entities/util';
// import { TILE_TYPE_COUNT } from '../tiles/constants';

type LevelThumbnailProps = {
	className?: string;
	tileX: number;
	tileY: number;
	tileWidth: number;
	tileHeight: number;
	tileSize: number;
	scale: number;
	tileData: TileMatrix;
	entities: Entity[];
};

function renderLevelThumbnail(
	canvas: HTMLCanvasElement,
	tileImg: HTMLImageElement,
	tileImageSize: number,
	tileThumbnailSize: number,
	tileData: TileMatrix,
	previousTileData: TileMatrix | null,
	tileX: number,
	tileY: number
) {
	// const tileWidthCount = Math.floor(canvas.width / tileThumbnailSize);
	// const tileHeightCount = Math.floor(canvas.height / tileThumbnailSize);
	//
	// const context = canvas.getContext('2d') as CanvasRenderingContext2D;
	//
	// if (!tileData.length) {
	//   context.clearRect(0, 0, canvas.width, canvas.height);
	//   return;
	// }
	//
	// for (let y = tileY; y < tileY + tileHeightCount; ++y) {
	//   for (let x = tileX; x < tileX + tileWidthCount; ++x) {
	//     const tileIndex = tileData[y]?.[x]?.tileIndex ?? 0;
	//     const previousTileIndex = previousTileData?.[y]?.[x]?.tileIndex ?? 0;
	//
	//     if (tileIndex !== previousTileIndex) {
	//       if (tileIndex) {
	//         const sourceX =
	//           ((tileIndex % TILE_TYPE_COUNT || TILE_TYPE_COUNT) - 1) *
	//           tileImageSize;
	//         const sourceY =
	//           Math.floor((tileIndex - 1) / TILE_TYPE_COUNT) * tileImageSize;
	//
	//         context.drawImage(
	//           tileImg,
	//           sourceX,
	//           sourceY,
	//           tileImageSize,
	//           tileImageSize,
	//           (x - tileX) * tileThumbnailSize,
	//           (y - tileY) * tileThumbnailSize,
	//           tileThumbnailSize,
	//           tileThumbnailSize
	//         );
	//       } else {
	//         context.clearRect(
	//           (x - tileX) * tileThumbnailSize,
	//           (y - tileY) * tileThumbnailSize,
	//           tileThumbnailSize,
	//           tileThumbnailSize
	//         );
	//       }
	//     }
	//   }
	// }
}

// const Root = styled.div`
// 	position: relative;
// 	overflow: hidden;
// `;
//
// const Canvas = styled.canvas`
// 	background-color: #bed0f7;
// `;

function LevelThumbnail({
	className,
	tileX,
	tileY,
	tileWidth,
	tileHeight,
	tileSize,
	scale,
	tileData,
}: // entities,
LevelThumbnailProps) {
	const width = tileWidth * tileSize * scale;
	const height = tileHeight * tileSize * scale;

	const imageRef = useRef<HTMLImageElement | null>(
		typeof Image !== 'undefined' ? new Image() : null
	);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const tileDataRef = useRef<{
		width: number;
		height: number;
		data: TileMatrix | null;
	}>({
		width,
		height,
		data: null,
	});

	useEffect(() => {
		// imageRef.current!.src = getResourceUrl('tiles');
	}, []);

	useEffect(() => {
		const renderCanvas = () => {
			if (canvasRef.current) {
				const previous = tileDataRef.current;

				const previousTileData =
					previous.width !== width || previous.height !== height
						? null
						: previous.data;

				renderLevelThumbnail(
					canvasRef.current,
					imageRef.current!,
					tileSize,
					tileSize * scale,
					tileData,
					previousTileData,
					tileX,
					tileY
				);
				tileDataRef.current.data = tileData;
				tileDataRef.current.width = width;
				tileDataRef.current.width = height;
			}
		};

		if (!imageRef.current!.src || !imageRef.current!.complete) {
			imageRef.current!.onload = renderCanvas;
		} else {
			renderCanvas();
		}
	}, [tileSize, scale, tileData, tileX, tileY, tileSize, width, height]);

	return (
		<div className={className} style={{ width, height }}>
			<canvas ref={canvasRef} width={width} height={height} />
			{/*{entities.map((e) => {*/}
			{/*	// thumbnail never shows the player*/}
			{/*	if (e.type === 'Player') {*/}
			{/*		return null;*/}
			{/*	}*/}

			{/*	const offset = 0;// getEntityOffset(e.type);*/}

			{/*	const top = (e.y + offset.y - tileY * tileSize) * scale;*/}
			{/*	const left = (e.x + offset.x - tileX * tileSize) * scale;*/}

			{/*	// don't bother to render the entity if it won't be seen*/}
			{/*	if (top >= height || left >= width) {*/}
			{/*		return null;*/}
			{/*	}*/}

			{/*	return (*/}
			{/*		<Entity*/}
			{/*			key={e.id}*/}
			{/*			style={{*/}
			{/*				position: 'absolute',*/}
			{/*				top,*/}
			{/*				left,*/}
			{/*			}}*/}
			{/*			type={e.type}*/}
			{/*			disableDrag*/}
			{/*			scale={scale}*/}
			{/*		/>*/}
			{/*	);*/}
			{/*})}*/}
		</div>
	);
}

export { LevelThumbnail };
