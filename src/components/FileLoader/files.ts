let _bios: Uint8Array | null = null;
let _rom: Uint8Array | null = null;
let _emptySave: Uint8Array | null = null;
let _saveState: Record<string, unknown> | null = null;
let _exampleLevel: SerializedLevel | null = null;

function setBios(bios: Uint8Array) {
	_bios = bios;
}

function setRom(rom: Uint8Array) {
	_rom = rom;
}

function setEmptySave(emptySave: Uint8Array) {
	_emptySave = emptySave;
}

function setSaveState(saveState: Record<string, unknown>) {
	_saveState = saveState;
}

function setExampleLevel(exampleLevel: SerializedLevel) {
	_exampleLevel = exampleLevel;
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

function getSaveState(): Record<string, unknown> | null {
	return _saveState;
}

function getExampleLevel(): SerializedLevel | null {
	return _exampleLevel;
}

export {
	setBios,
	setRom,
	setEmptySave,
	setSaveState,
	setExampleLevel,
	getBios,
	getRom,
	getEmptySave,
	getSaveState,
	getExampleLevel,
};
