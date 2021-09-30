import React, { CSSProperties, useEffect, useRef } from 'react';
import { COIN_SIZE, setCoinData } from './util';

type ECoinViewProps = {
	className?: string;
	style?: CSSProperties;
	data?: number[];
};

function ECoinView({ className, style, data }: ECoinViewProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current && data?.some((b) => b !== 0)) {
			setCoinData(canvasRef.current, data);
		}
	}, [data]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{ ...style, width: COIN_SIZE, height: COIN_SIZE }}
			width={COIN_SIZE}
			height={COIN_SIZE}
		/>
	);
}

export { ECoinView };
