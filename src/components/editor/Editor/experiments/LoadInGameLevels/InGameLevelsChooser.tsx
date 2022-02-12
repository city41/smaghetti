import React from 'react';
import { IconClose } from '../../../../../icons';
import {
	loadableLevels,
	potentialSpriteStarts,
} from '../../../../../levelData/inGameLevels';
import { dispatch } from '../../../../../store';
import { PlainIconButton } from '../../../../PlainIconButton';
import {
	loadBinaryInGameLevel,
	applyPotentialSpriteStart,
} from '../../../editorSlice';
import { disableInGameBinaryLevelChooser } from '../experimentsSlice';

function InGameLevelsChooser() {
	return (
		<div className="relative mt-2 flex flex-col gap-y-4 items-center justify-center">
			<div>objects and sprites</div>
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
				{loadableLevels
					.filter((l) => !!(l.root && l.sprites))
					.map((level) => {
						return (
							<option key={level.name} value={level.name}>
								{level.name}
							</option>
						);
					})}
			</select>
			<div>objects only</div>
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
				{loadableLevels
					.filter((l) => !l.sprites)
					.map((level) => {
						return (
							<option key={level.name} value={level.name}>
								{level.name}
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
			<PlainIconButton
				className="absolute right-0 top-0"
				label="close"
				icon={IconClose}
				onClick={() => {
					dispatch(disableInGameBinaryLevelChooser());
				}}
			/>
		</div>
	);
}

export { InGameLevelsChooser };
