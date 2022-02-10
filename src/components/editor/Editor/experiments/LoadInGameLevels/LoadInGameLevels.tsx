import React from 'react';
import { loadableLevels } from '../../../../../levelData/inGameLevels';

type InternalLoadInGameLevelsProps = {
	onLoad: (levelId: string) => void;
};

function LoadInGameLevels({ onLoad }: InternalLoadInGameLevelsProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Load in game levels</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>Load in game levels into Smaghetti. Very buggy.</p>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<select
					className="text-black"
					onChange={(e) => {
						const levelName = e.target.value;

						if (levelName !== '-') {
							onLoad(levelName);
						}
					}}
				>
					<option value="-">choose a level</option>
					{loadableLevels.map((level) => {
						return (
							<option key={level.name} value={level.name}>
								{level.name}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
}
export { LoadInGameLevels };
