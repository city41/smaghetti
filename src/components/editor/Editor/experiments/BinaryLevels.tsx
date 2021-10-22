import React from 'react';
import { useSelector } from 'react-redux';
import { downloadLevelAsLevelFile } from '../../../../levelData/downloadLevelAsSaveFile';
import { AppState } from '../../../../store';
import { Button } from '../../../Button';

function BinaryLevels() {
	const { rooms, settings, name } = useSelector(
		(state: AppState) => state.editor.present
	);

	function handleDownload() {
		const level: LevelToLoadInGBA = {
			name,
			data: {
				settings,
				rooms,
			},
		};

		downloadLevelAsLevelFile(level);
	}

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Binary Levels</h1>
			<p className="text-gray-400">
				I am working on storing Smaghetti levels in the same binary format the
				game uses. It&apos;s a really big change, but will bring many benefits.
			</p>
			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={handleDownload}>Download level as binary</Button>
				{/* <ButtonMimickLabel>
					Load binary level
					<input
						type="file"
						style={{ width: 0.1, height: 0.1 }}
						accept=".level"
					/>
				</ButtonMimickLabel> */}
			</div>
		</div>
	);
}

export { BinaryLevels };
