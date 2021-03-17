interface _GameBoyAdvance {
	new (): _GameBoyAdvance;
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setBios: (bios: ArrayBuffer) => void;
	setRom: (rom: ArrayBuffer) => void;
	runStable: () => void;
	pause: () => void;
	setSavedata: (data: ArrayBuffer) => void;
	downloadSavedata: () => void;
	audio: {
		masterVolume: number;
		context: AudioContext;
	};
}

interface Window {
	GameBoyAdvance: _GameBoyAdvance;
	_gba: InstanceType<_GameBoyAdvance>;
}
