type GBAStatus = 'reset' | 'ready-to-inject' | 'level-ready';

interface _GameBoyAdvance {
	new (): _GameBoyAdvance;
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setBios: (bios: ArrayBuffer) => void;
	setRom: (rom: ArrayBuffer) => void;
	runStable: () => void;
	pause: () => void;
	safeReset: () => void;
	setSavedata: (data: ArrayBuffer) => void;
	downloadSavedata: () => void;
	audio: {
		masterVolume: number;
		context: AudioContext;
	};
	rom: ArrayBuffer | undefined;
	statusCallback: ((status: GBAStatus) => void) | undefined;
	injectSaveFile: (buffer: ArrayBuffer) => void;
	_shouldMute?: boolean;
}

interface Window {
	GameBoyAdvance: _GameBoyAdvance;
	_gba: InstanceType<_GameBoyAdvance>;
}
