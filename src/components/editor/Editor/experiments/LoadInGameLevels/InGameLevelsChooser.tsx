import React from 'react';
import {
	loadableLevels,
	potentialSpriteStarts,
} from '../../../../../levelData/inGameLevels';
import { dispatch } from '../../../../../store';
import {
	loadBinaryInGameLevel,
	applyPotentialSpriteStart,
} from '../../../editorSlice';

function InGameLevelsChooser() {
	return (
		<div className="mt-2 flex flex-col gap-y-4 items-center justify-center">
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
			<div>potential sprite starts</div>
			<select
				className="text-black"
				onChange={(e) => {
					const spriteStart = parseInt(e.target.value);

					if (!isNaN(spriteStart)) {
						dispatch(applyPotentialSpriteStart(spriteStart));
					}
				}}
			>
				<option value="-">-</option>
				{potentialSpriteStarts.map((ss) => {
					return (
						<option key={ss.offset} value={ss.offset}>
							0x{ss.offset.toString(16)} {ss.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export { InGameLevelsChooser };
