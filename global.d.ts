type GBAStatus = 'reset' | 'ready-to-inject' | 'level-ready' | 'crashed';

interface _GameBoyAdvance {
	new (): _GameBoyAdvance;
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setBios: (bios: ArrayBuffer) => void;
	setRom: (rom: ArrayBuffer) => void;
	runStable: () => void;
	pause: () => void;
	reset: () => void;
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	freeze: () => any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defrost: (saveState: any) => void;

	video: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		freeze: () => any;
	};
}

interface Window {
	GameBoyAdvance: _GameBoyAdvance;
	_gba: InstanceType<_GameBoyAdvance>;
}
