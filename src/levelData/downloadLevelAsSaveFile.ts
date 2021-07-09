import { getEmptySave } from '../components/FileLoader/files';
import { createLevelData } from './createLevelData';
import { injectLevelIntoSave } from './injectLevelIntoSave';

function sendBlobToAnchorTag(fileBlob: Blob, fileName: string) {
	// stupid browser hack needed to download the file with a usable name
	const a = document.createElement('a');
	a.style.setProperty('display', 'none');

	const fileUrl = window.URL.createObjectURL(fileBlob);

	a.href = fileUrl;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(fileUrl);
}

function getSafeFileName(levelName: string, ext: string): string {
	// TODO: might need some scrubbing here
	return `${levelName}.${ext}`;
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

	const fileBlob = new Blob([fullSaveData.buffer], {
		type: 'application/octet-stream',
	});

	sendBlobToAnchorTag(fileBlob, getSafeFileName(saveFileNameRoot, 'sav'));
}

function downloadLevelAsSaveFile(level: LevelToLoadInGBA) {
	downloadSetOfLevelsAsSaveFile([level], level.name);
}

function downloadLevelAsJson(level: LevelToLoadInGBA | SerializedLevel) {
	const levelString = JSON.stringify(level);
	const fileBlob = new Blob([levelString], { type: 'text/json' });

	sendBlobToAnchorTag(fileBlob, getSafeFileName(level.name, 'json'));
}

export {
	downloadLevelAsSaveFile,
	downloadSetOfLevelsAsSaveFile,
	downloadLevelAsJson,
	sendBlobToAnchorTag,
};
