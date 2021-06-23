import { getEmptySave } from '../components/FileLoader/files';
import { createLevelData } from './createLevelData';
import { injectLevelIntoSave } from './injectLevelIntoSave';

function sendFileToAnchorTag(data: Uint8Array, fileName: string) {
	// stupid browser hack needed to download the file with a usable name
	const a = document.createElement('a');
	a.style.setProperty('display', 'none');

	const fileBlob = new Blob([data.buffer], {
		type: 'application/octet-stream',
	});
	const fileUrl = window.URL.createObjectURL(fileBlob);

	a.href = fileUrl;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(fileUrl);
}

function getSafeFileName(levelName: string): string {
	// TODO: might need some scrubbing here
	return `${levelName}.sav`;
}

function downloadSetOfLevelsAsSaveFile(
	levels: LevelToLoadInGBA[],
	saveFileNameRoot: string
) {
	const emptySave = getEmptySave();

	if (!emptySave) {
		throw new Error(
			'downloadSetOfLevelsAsSaveFile: called before empty save is set'
		);
	}

	let fullSaveData = emptySave;
	const nameMap: Record<string, number> = {};

	levels.forEach((level) => {
		const croppedName = level.name.substr(0, 19);
		const name = `${nameMap[croppedName] ?? ''}${croppedName}`;
		nameMap[croppedName] = (nameMap[croppedName] ?? 1) + 1;

		const levelSaveData = createLevelData({ ...level, name });
		fullSaveData = injectLevelIntoSave(fullSaveData, levelSaveData, false);
	});

	sendFileToAnchorTag(fullSaveData, getSafeFileName(saveFileNameRoot));
}

function downloadLevelAsSaveFile(level: LevelToLoadInGBA) {
	downloadSetOfLevelsAsSaveFile([level], level.name);
}

export {
	downloadLevelAsSaveFile,
	downloadSetOfLevelsAsSaveFile,
	sendFileToAnchorTag,
};
