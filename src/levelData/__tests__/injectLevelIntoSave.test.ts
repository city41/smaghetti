import * as fs from 'fs';
import { injectLevelIntoSave } from '../injectLevelIntoSave';

describe('injectLevelIntoSave', () => {
	function load(path: string): Uint8Array {
		const buffer = fs.readFileSync(path);
		return new Uint8Array(buffer);
	}

	it('should create the same binary file as sma4savtool', () => {
		const savToolFile = load('./src/levelData/sma4savtool_classic1_2.sav');
		const levelFile = load('./src/levelData/star_02.level');
		const emptySaveFile = load('./public/empty.sav');

		const saveFileWithInjectedLevel = injectLevelIntoSave(
			emptySaveFile,
			levelFile,
			true
		);

		fs.writeFileSync(
			'./src/levelData/smaghetti_classic1_2.sav',
			saveFileWithInjectedLevel
		);

		expect(Array.from(saveFileWithInjectedLevel)).toEqual(
			Array.from(savToolFile)
		);
	});
});
