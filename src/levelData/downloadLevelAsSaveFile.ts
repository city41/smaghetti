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

function downloadLevelAsSaveFile(level: Level) {
	const emptySave = getEmptySave();

	if (!emptySave) {
		throw new Error('downloadLevelAsSaveFile: called before empty save is set');
	}

	const levelSaveData = createLevelData(
		level.data.entities,
		level.data.tileLayer
	);
	const fullSaveData = injectLevelIntoSave(emptySave, levelSaveData);

	sendFileToAnchorTag(fullSaveData, getSafeFileName(level.name));
}

export { downloadLevelAsSaveFile };
