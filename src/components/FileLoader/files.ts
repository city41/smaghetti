let _bios: Uint8Array | null = null;
let _rom: Uint8Array | null = null;
let _emptySave: Uint8Array | null = null;
let _saveState: object | null = null;

function setBios(bios: Uint8Array) {
	_bios = bios;
}

function setRom(rom: Uint8Array) {
	_rom = rom;
}

function setEmptySave(emptySave: Uint8Array) {
	_emptySave = emptySave;
}

function setSaveState(saveState: object) {
	_saveState = saveState;
}

function getBios(): Uint8Array | null {
	return _bios;
}

function getRom(): Uint8Array | null {
	return _rom;
}

function getEmptySave(): Uint8Array | null {
	return _emptySave;
}

function getSaveState(): object | null {
	return _saveState;
}

export {
	setBios,
	setRom,
	setEmptySave,
	setSaveState,
	getBios,
	getRom,
	getEmptySave,
	getSaveState,
};
