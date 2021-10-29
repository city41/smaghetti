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

	GBA_KEYCODE_LEFT: number;
	GBA_KEYCODE_RIGHT: number;
	GBA_KEYCODE_UP: number;
	GBA_KEYCODE_DOWN: number;
	GBA_KEYCODE_A: number;
	GBA_KEYCODE_B: number;
	GBA_KEYCODE_START: number;
	GBA_KEYCODE_SELECT: number;
	GBA_KEYCODE_L: number;
	GBA_KEYCODE_R: number;

	GBA_GAMEPAD_LEFT: number;
	GBA_GAMEPAD_RIGHT: number;
	GBA_GAMEPAD_UP: number;
	GBA_GAMEPAD_DOWN: number;
	GBA_GAMEPAD_A: number;
	GBA_GAMEPAD_B: number;
	GBA_GAMEPAD_START: number;
	GBA_GAMEPAD_SELECT: number;
	GBA_GAMEPAD_L: number;
	GBA_GAMEPAD_R: number;
}
