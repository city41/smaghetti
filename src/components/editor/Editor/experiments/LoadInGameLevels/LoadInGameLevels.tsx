import React from 'react';
import { Button } from '../../../../Button';

type InternalLoadInGameLevelsProps = {
	onEnable: () => void;
};

function LoadInGameLevels({ onEnable }: InternalLoadInGameLevelsProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Load in game levels</h1>
			<div className="text-gray-400 flex flex-col items-center gap-y-4">
				<p>Load in game levels into Smaghetti. Very buggy.</p>
				<Button onClick={onEnable}>enable</Button>
			</div>
		</div>
	);
}
export { LoadInGameLevels };
