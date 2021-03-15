let _bios: Uint8Array | null = null;
let _rom: Uint8Array | null = null;

function setBios(bios: Uint8Array | null) {
	_bios = bios;
}

function setRom(rom: Uint8Array | null) {
	_rom = rom;
}

function getBios(): Uint8Array | null {
	return _bios;
}

function getRom(): Uint8Array | null {
	return _rom;
}

export { setBios, setRom, getBios, getRom };
