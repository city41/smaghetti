import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { gba16ToRgb } from '../../../tiles/extractResourcesToStylesheet';

import eCoinTemplatePng from './eCoinTemplate.png';
import eCoinTemplateBorderPng from './eCoinTemplateBorder.png';
import smaghettiECoinPng from './smaghettiECoin.png';
import smaghettiLogoPng from '../../../images/logo.png';
import { canvasToCoinData } from './canvasToCoinData';
import { COIN_SIZE, setCoinData } from '../util';
import { PlainIconButton } from '../../../components/PlainIconButton';

import { IconBomb, IconCheck, IconEraser, IconPhoto } from '../../../icons';

type ECoinEditorProps = {
	className?: string;
	style?: CSSProperties;
	coinData?: number[];
	onCoinData: (data: number[]) => void;
};

// The standard e-coin palette in gba16 form,
// except it has been sorted from dark to light manually.
// The order of this array is the order they show up
// in the palette on screen.
const palette = [
	// zero index is the eraser
	0x17df, // base coin yellow
	0,
	0x8d,
	0x553,
	0x5d5,
	0xa57,
	0xeda,
	0x1219,
	0x1eff,
	0x277f,
	0x137d,
	0x5fff,
	0x7fff,
].map((gba16) => {
	const rgb = gba16ToRgb(gba16);
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
});

type PaletteProps = {
	curIndex: number;
	onIndexChange: (newIndex: number) => void;
};

function Palette({ curIndex, onIndexChange }: PaletteProps) {
	const entries = palette.map((rgb, i) => {
		if (i === 0) {
			return (
				<div
					style={{
						gridColumn: '7 / span 2',
						gridRow: '1 / span 2',
					}}
					key="eraser"
					className={clsx('grid place-items-center', {
						'bg-gray-600': curIndex !== 0,
						'bg-blue-600': curIndex === 0,
					})}
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();

						if (curIndex !== i) {
							onIndexChange(i);
						}
					}}
				>
					<IconEraser className="w-1 h-1" />
				</div>
			);
		} else {
			return (
				<div
					key={rgb}
					className="h-1 flex flex-col justify-end items-center"
					style={{
						backgroundColor: rgb,
						gridColumn: `${((i - 1) % 6) + 1}`,
						gridRow: i > 6 ? '2' : '1',
					}}
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();

						if (curIndex !== i) {
							onIndexChange(i);
						}
					}}
				>
					{i === curIndex && (
						<div
							style={{ height: 1 }}
							className="w-full bg-blue-600 cursor-pointer"
						/>
					)}
				</div>
			);
		}
	});

	return (
		<div
			className="grid grid-cols-8 grid-rows-2 mb-0.5"
			style={{ width: COIN_SIZE }}
		>
			{entries}
		</div>
	);
}

function paintCanvasPixel(
	canvas: HTMLCanvasElement,
	point: Point,
	rgbColor: string
) {
	const context = canvas.getContext('2d')!;

	const data = context.getImageData(point.x, point.y, 1, 1).data;

	// don't allow drawing beyond the coin
	// TODO: really want to prevent drawing over the coin's border too
	if (data[3] === 255) {
		context.fillStyle = rgbColor;
		context.fillRect(point.x, point.y, 1, 1);
	}
}

function DBP(x1: number, y1: number, x2: number, y2: number) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getAngle(x: number, y: number) {
	return Math.atan(y / (x == 0 ? 0.01 : x)) + (x < 0 ? Math.PI : 0);
}

function paintCanvasLine(
	canvas: HTMLCanvasElement,
	start: Point,
	end: Point,
	rgbColor: string
) {
	const dist = DBP(start.x, start.y, end.x, end.y); // length of line
	const ang = getAngle(end.x - start.x, end.y - start.y); // angle of line

	for (let i = 0; i < dist; i++) {
		const p = {
			x: Math.round(start.x + Math.cos(ang) * i), // round for perfect pixels
			y: Math.round(start.y + Math.sin(ang) * i), // thus no aliasing
		};
		paintCanvasPixel(canvas, p, rgbColor);
	}
}

async function placeImage(
	canvas: HTMLCanvasElement,
	imgSrc: string,
	options?: { dontClear: boolean }
): Promise<void> {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => {
			const context = canvas.getContext('2d')!;

			if (!options || !options.dontClear) {
				context.clearRect(0, 0, COIN_SIZE, COIN_SIZE);
			}
			context.drawImage(image, 0, 0, COIN_SIZE, COIN_SIZE);

			resolve();
		};

		image.src = imgSrc;
	});
}

function getCanvasPoint(canvas: HTMLCanvasElement, e: React.MouseEvent): Point {
	const bounds = canvas.getBoundingClientRect();
	const scale = bounds.width / COIN_SIZE;

	return {
		x: Math.floor((e.clientX - bounds.left) / scale),
		y: Math.floor((e.clientY - bounds.top) / scale),
	};
}

function deleteTransparentAreas(
	target: HTMLCanvasElement,
	template: HTMLCanvasElement
) {
	const targetCtx = target.getContext('2d')!;
	const templateCtx = template.getContext('2d')!;

	const targetData = targetCtx.getImageData(0, 0, COIN_SIZE, COIN_SIZE);
	const templateData = templateCtx.getImageData(0, 0, COIN_SIZE, COIN_SIZE);

	for (let a = 3; a < templateData.data.length; a += 4) {
		targetData.data[a] = templateData.data[a];
	}

	targetCtx.putImageData(targetData, 0, 0);
}

function importImage(destCanvas: HTMLCanvasElement, file: File) {
	const fileReader = new FileReader();

	fileReader.onload = async () => {
		await placeImage(destCanvas, eCoinTemplatePng);

		const imgCanvas = document.createElement('canvas') as HTMLCanvasElement;
		imgCanvas.width = COIN_SIZE;
		imgCanvas.height = COIN_SIZE;

		await placeImage(imgCanvas, fileReader.result as string);

		deleteTransparentAreas(imgCanvas, destCanvas);

		const imgAsCoinData = canvasToCoinData(imgCanvas);
		setCoinData(destCanvas, imgAsCoinData);
		placeImage(destCanvas, eCoinTemplateBorderPng, { dontClear: true });
	};

	fileReader.readAsDataURL(file);
}

function ECoinEditor({
	className,
	style,
	coinData,
	onCoinData,
}: ECoinEditorProps) {
	const [loading, setLoading] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const lastPoint = useRef<Point | null>(null);

	const [curPalIndex, setCurPalIndex] = useState(1);

	useEffect(() => {
		if (canvasRef.current) {
			if (coinData && coinData.some((b) => b !== 0)) {
				setCoinData(canvasRef.current, coinData);
			} else {
				setLoading(true);
				placeImage(canvasRef.current, eCoinTemplatePng).finally(() => {
					setLoading(false);
				});
			}
		}
	}, [coinData]);

	function handleMouseDown(e: React.MouseEvent) {
		if (e.button !== 0) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		if (canvasRef.current) {
			const point = getCanvasPoint(canvasRef.current, e);
			lastPoint.current = point;

			paintCanvasPixel(canvasRef.current, point, palette[curPalIndex]);
		}
	}

	function handleMouseMove(e: React.MouseEvent) {
		if (lastPoint.current && canvasRef.current) {
			const nextPoint = getCanvasPoint(canvasRef.current, e);
			paintCanvasLine(
				canvasRef.current,
				lastPoint.current,
				nextPoint,
				palette[curPalIndex]
			);
			lastPoint.current = nextPoint;
		}
	}

	function handleMouseUp(e: React.MouseEvent) {
		if (e.button !== 0) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		lastPoint.current = null;
	}

	return (
		<div
			style={style}
			className={clsx(
				className,
				'absolute px-0.5 pb-0.5 pt-0.5 bg-gray-700 flex flex-col'
			)}
			onMouseDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<Palette
				curIndex={curPalIndex}
				onIndexChange={(newIndex) => {
					setCurPalIndex(newIndex);
				}}
			/>
			<canvas
				className="cursor-crosshair mx-auto"
				ref={canvasRef}
				width={COIN_SIZE}
				height={COIN_SIZE}
				style={{ width: COIN_SIZE, height: COIN_SIZE }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			/>
			<button
				className="absolute"
				style={{ left: 1, bottom: 10 }}
				title="default"
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();

					if (canvasRef.current) {
						setLoading(true);
						placeImage(canvasRef.current, smaghettiECoinPng).finally(() => {
							setLoading(false);
						});
					}
				}}
			>
				<div
					style={{
						backgroundImage: `url(${smaghettiLogoPng})`,
						width: 5,
						height: 5,
					}}
					className="bg-cover bg-gray-700 hover:bg-gray-600"
				/>
			</button>
			<div className="flex flex-row justify-around items-center mt-0.5">
				<button
					title="clear"
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (canvasRef.current) {
							setLoading(true);
							placeImage(canvasRef.current, eCoinTemplatePng).finally(() => {
								setLoading(false);
							});
						}
					}}
				>
					<IconBomb
						style={{ borderRadius: '10%' }}
						className="w-1 h-1 bg-gray-700 hover:bg-gray-600 text-white"
					/>
				</button>
				<label
					title="use image"
					className="cursor-pointer w-1 h-1 bg-gray-700 hover:bg-gray-600 text-white"
				>
					<IconPhoto
						style={{ borderRadius: '10%' }}
						className="w-1 h-1 bg-gray-700 hover:bg-gray-600 text-white"
					/>
					<input
						style={{ width: 0.01, height: 0.01 }}
						type="file"
						accept="image/*"
						onChange={(e) => {
							e.preventDefault();
							e.stopPropagation();
							const file = e.target.files?.[0];

							if (file && canvasRef.current) {
								e.target.value = '';
								importImage(canvasRef.current, file);
							}
						}}
					/>
				</label>
				<PlainIconButton
					loading={loading}
					icon={IconCheck}
					label="ok"
					size="editor"
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();

						if (canvasRef.current && !loading) {
							onCoinData(canvasToCoinData(canvasRef.current));
						}
					}}
				/>
			</div>
			<a
				style={{ fontSize: 2, marginTop: 1 }}
				className="text-blue-400 text-center cursor-pointer"
				href="/tips#e-coin-photos"
				target="_blank"
			>
				photo tips
			</a>
		</div>
	);
}

export { ECoinEditor };
