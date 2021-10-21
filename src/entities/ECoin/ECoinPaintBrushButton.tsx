import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { ECoinEditor } from './ECoinEditor';
import { IconPaintBrush } from '../../icons';

type ECoinPaintBrushButtonProps = {
	className?: string;
	style?: CSSProperties;
	coinData?: number[];
	onCoinData: (coinData: number[]) => void;
};

function ECoinPaintBrushButton({
	className,
	style,
	coinData,
	onCoinData,
}: ECoinPaintBrushButtonProps) {
	const [showEditor, setShowEditor] = useState(false);

	return (
		<>
			<div style={style} className={clsx(className, 'grid place-items-center')}>
				<button
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();

						setShowEditor(true);
					}}
				>
					<IconPaintBrush
						style={{ borderRadius: '10%' }}
						className="w-1.5 h-1.5 bg-gray-700 hover:bg-gray-600 text-white"
					/>
				</button>
			</div>
			{showEditor && (
				<ECoinEditor
					className="absolute"
					style={{ zIndex: 20 }}
					coinData={coinData}
					onCoinData={(coinData) => {
						onCoinData(coinData);
						setShowEditor(false);
					}}
				/>
			)}
		</>
	);
}

export { ECoinPaintBrushButton };
