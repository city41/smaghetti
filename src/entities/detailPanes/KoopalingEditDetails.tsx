import React, { ReactNode } from 'react';
import { NumberPicker } from './NumberPicker';

type KoopalingEditDetailsProps = {
	currentStompCount: number;
	currentFireballCount: number;
	onSettingsChange: (
		param: { fireballCount: number } | { stompCount: number }
	) => void;
	children: ReactNode;
};

const PADDING = 1;

function KoopalingEditDetails({
	currentStompCount,
	currentFireballCount,
	onSettingsChange,
	children,
}: KoopalingEditDetailsProps) {
	const style = {
		top: -PADDING,
		left: -PADDING,
		padding: PADDING,
		fontSize: 2,
	};

	return (
		<div className="absolute bg-gray-700 z-10" style={style}>
			{children}
			<div className="my-0.5 flex flex-col space-y-0.5">
				<div className="flex flex-col items-center">
					<div>fireball hits</div>
					<NumberPicker
						value={currentFireballCount}
						min={0}
						max={255}
						onValueChange={(nfb) => onSettingsChange({ fireballCount: nfb })}
					/>
					{currentFireballCount === 0 && (
						<div className="bg-red-200 text-gray-900" style={{ padding: 0.5 }}>
							0 causes instant death
						</div>
					)}
				</div>
				<div className="flex flex-col items-center">
					<div>stomp hits</div>
					<NumberPicker
						value={currentStompCount}
						min={1}
						max={15}
						onValueChange={(ns) => onSettingsChange({ stompCount: ns })}
					/>
				</div>
			</div>
		</div>
	);
}

export { KoopalingEditDetails };
