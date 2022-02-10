import React from 'react';
import { loadableLevels } from '../../../../../levelData/inGameLevels';
import { dispatch } from '../../../../../store';
import { loadBinaryInGameLevel } from '../../../editorSlice';

function InGameLevelsChooser() {
	return (
		<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
			<select
				className="text-black"
				onChange={(e) => {
					const levelName = e.target.value;

					if (levelName !== '-') {
						dispatch(loadBinaryInGameLevel(levelName));
					}
				}}
			>
				<option value="-">choose a level</option>
				{loadableLevels.map((level) => {
					return (
						<option key={level.name} value={level.name}>
							{level.name} (objects{level.sprites && ' & sprites'})
						</option>
					);
				})}
			</select>
		</div>
	);
}

export { InGameLevelsChooser };
