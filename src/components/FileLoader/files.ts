let _bios: Uint8Array | null = null;
let _rom: Uint8Array | null = null;
let _emptySave: Uint8Array | null = null;

function setBios(bios: Uint8Array | null) {
	_bios = bios;
}

function setRom(rom: Uint8Array | null) {
	_rom = rom;
}

function setEmptySave(emptySave: Uint8Array | null) {
	_emptySave = emptySave;
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

export { setBios, setRom, setEmptySave, getBios, getRom, getEmptySave };
