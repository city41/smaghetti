import React from 'react';
import { Button } from '../../../../Button';

type InternalLoadInGameLevelsProps = {
	onLoad: (levelId: '1-1' | '2-1') => void;
};

const levels = ['1-1', '2-1'] as const;

function LoadInGameLevels({ onLoad }: InternalLoadInGameLevelsProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Load in game levels</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>Load in game levels into Smaghetti. Very buggy.</p>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				{levels.map((level) => {
					return (
						<Button
							key={level}
							onClick={() => {
								onLoad(level);
							}}
						>
							Load {level}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
export { LoadInGameLevels };
