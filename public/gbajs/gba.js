const A_BUTTON = 0;
const START = 3;
const RIGHT = 4;
const DOWN = 7;

const prepScript = [
	{
		// GameBoy Player screen
		frameDelay: 30,
		input: START,
		description: 'Press start to move past GB Player screen',
		predicate: {
			// upper left corner of the 'G'
			address: 0x60085c0,
			value: [0x37, 0x1a, 0x01, 0x01, 0x01],
		},
	},
	{
		// opening cinema
		input: START,
		description: 'press start to move past opening cinema',
		predicate: {
			// the checkerboard pattern in upper left
			address: 0x6003a00,
			value: [0x33, 0x33, 0x33, 0x44],
		},
	},
	{
		// title screen
		frameDelay: 45,
		input: START,
		description: 'press start to choose 1p at title screen',
		predicate: {
			// the top of the "S" in "Super Mario Advance 4" on title screen
			// tile starts at 40, but looking at second row as values are more distinct
			address: 0x06004450,
			value: [0xfa, 0xfa, 0x8b, 0xf8, 0xf8, 0xf8],
		},
	},
	{
		// choose SMB3 or Mario Bros
		frameDelay: 45,
		input: START,
		description: 'press start to choose SMB3',
		predicate: {
			// the checkerboard pattern in upper left
			address: 0x6003a00,
			value: [0x33, 0x33, 0x33, 0x44],
		},
	},
	{
		// opening curtain animation for SMB3 title screen
		frameDelay: 50,
		input: START,
		description: 'Press start to move past curtain',
		predicate: {
			// upper left corner of curtain
			address: 0x06003e00,
			value: [0x46, 0x65, 0x77, 0x66],
		},
	},
	{
		// title screen, koopas walk across
		// just wait a bit and press start again
		description: 'Press start to get into title screen menu',
		frameDelay: 20,
		input: START,
	},
	{
		// file load screen
		// just wait a bit and press down
		description: 'first press down on file screen',
		frameDelay: 10,
		input: DOWN,
	},
	{
		// file load screen
		// just wait a bit and press down
		description: 'second press down on file screen',
		frameDelay: 10,
		input: DOWN,
	},
	{
		// file load screen
		// just wait a bit and press down
		description: 'third press down on file screen',
		frameDelay: 10,
		input: DOWN,
	},
	{
		// file load screen
		// just wait a bit and press start to choose e-reader world
		description: 'press start to enter e-reader world',
		frameDelay: 10,
		input: START,
	},
	{
		callbackWithStatus: 'ready-to-inject',
		ignoreInput: true,
		pause: true,
		proceedIfInjected: true,
	},
];

const goIntoLevelScript = [
	{
		// e-reader world
		// move right
		description: 'First right in e-reader world',
		frameDelay: 100,
		input: RIGHT,
	},
	{
		// e-reader world
		// move right
		description: 'Second right in e-reader world',
		frameDelay: 20,
		input: RIGHT,
	},
	{
		// e-reader world
		// choose to go into level menu
		description: 'A to go into level menu',
		frameDelay: 20,
		input: A_BUTTON,
	},
	{
		// e-reader world
		// choose to play first level
		description: 'A to choose first level',
		frameDelay: 50,
		input: A_BUTTON,
	},
	{
		// e-reader world
		// confirm play first level
		description: 'A to confirm first level',
		frameDelay: 70,
		input: A_BUTTON,
	},
	{
		callbackWithStatus: 'level-ready',
		ignoreInput: false,
		pause: false,
	},
];

GameBoyAdvance = function GameBoyAdvance() {
	this.statusCallback = null;

	this.LOG_ERROR = 1;
	this.LOG_WARN = 2;
	this.LOG_STUB = 4;
	this.LOG_INFO = 8;
	this.LOG_DEBUG = 16;

	this.SYS_ID = 'com.endrift.gbajs';

	this.logLevel = this.LOG_ERROR | this.LOG_WARN;

	this.rom = null;

	this.cpu = new ARMCore();
	this.mmu = new GameBoyAdvanceMMU();
	this.irq = new GameBoyAdvanceInterruptHandler();
	this.io = new GameBoyAdvanceIO();
	this.audio = new GameBoyAdvanceAudio();
	this.video = new GameBoyAdvanceVideo();
	this.keypad = new GameBoyAdvanceKeypad();
	this.sio = new GameBoyAdvanceSIO();

	// TODO: simplify this graph
	this.cpu.mmu = this.mmu;
	this.cpu.irq = this.irq;

	this.mmu.cpu = this.cpu;
	this.mmu.core = this;

	this.irq.cpu = this.cpu;
	this.irq.io = this.io;
	this.irq.audio = this.audio;
	this.irq.video = this.video;
	this.irq.core = this;

	this.io.cpu = this.cpu;
	this.io.audio = this.audio;
	this.io.video = this.video;
	this.io.keypad = this.keypad;
	this.io.sio = this.sio;
	this.io.core = this;

	this.audio.cpu = this.cpu;
	this.audio.core = this;

	this.video.cpu = this.cpu;
	this.video.core = this;

	this.keypad.core = this;

	this.sio.core = this;

	this.keypad.registerHandlers();
	this.doStep = this.waitFrame;
	this.paused = false;

	this.seenFrame = false;
	this.seenSave = false;
	this.lastVblank = 0;

	this.queue = null;
	this.reportFPS = null;
	this.throttle = 16; // This is rough, but the 2/3ms difference gives us a good overhead

	var self = this;
	window.queueFrame = function (f) {
		self.queue = window.setTimeout(f, self.throttle);
	};

	window.URL = window.URL || window.webkitURL;

	this.video.vblankCallback = function () {
		self.seenFrame = true;
	};

	this.scriptIndex = 0;
	this.script = null;
};

GameBoyAdvance.prototype.setCanvas = function (canvas) {
	var self = this;
	if (canvas.offsetWidth != 240 || canvas.offsetHeight != 160) {
		this.indirectCanvas = document.createElement('canvas');
		this.indirectCanvas.setAttribute('height', '160');
		this.indirectCanvas.setAttribute('width', '240');
		this.targetCanvas = canvas;
		this.setCanvasDirect(this.indirectCanvas);
		var targetContext = canvas.getContext('2d');
		this.video.drawCallback = function () {
			targetContext.drawImage(
				self.indirectCanvas,
				0,
				0,
				canvas.offsetWidth,
				canvas.offsetHeight
			);
		};
	} else {
		this.setCanvasDirect(canvas);
		var self = this;
	}
};

GameBoyAdvance.prototype.setCanvasDirect = function (canvas) {
	this.context = canvas.getContext('2d');
	this.video.setBacking(this.context);
};

GameBoyAdvance.prototype.setBios = function (bios, real) {
	this.mmu.loadBios(bios, real);
};

GameBoyAdvance.prototype.setRom = function (rom) {
	this.reset();

	this.rom = this.mmu.loadRom(rom, true);
	if (!this.rom) {
		return false;
	}
	this.retrieveSavedata();
	return true;
};

GameBoyAdvance.prototype.hasRom = function () {
	return !!this.rom;
};

GameBoyAdvance.prototype.loadRomFromFile = function (romFile, callback) {
	var reader = new FileReader();
	var self = this;
	reader.onload = function (e) {
		var result = self.setRom(e.target.result);
		if (callback) {
			callback(result);
		}
	};
	reader.readAsArrayBuffer(romFile);
};

GameBoyAdvance.prototype.reset = function () {
	this.audio.pause(true);

	this.mmu.clear();
	this.io.clear();
	this.audio.clear();
	this.video.clear();
	this.sio.clear();

	this.mmu.mmap(this.mmu.REGION_IO, this.io);
	this.mmu.mmap(this.mmu.REGION_PALETTE_RAM, this.video.renderPath.palette);
	this.mmu.mmap(this.mmu.REGION_VRAM, this.video.renderPath.vram);
	this.mmu.mmap(this.mmu.REGION_OAM, this.video.renderPath.oam);

	this.cpu.resetCPU(0);
	this.keypad.ignoreInput = true;
	this.audio.masterVolume = 0;

	this.scriptIndex = 0;
	this.script = prepScript;

	if (this.statusCallback) {
		this.statusCallback('reset');
		this.runStable();
	}
};

GameBoyAdvance.prototype.step = function () {
	while (this.doStep()) {
		this.cpu.step();
	}

	if (this.script && this.scriptIndex < this.script.length) {
		const entry = this.script[this.scriptIndex];

		if (entry.callbackWithStatus && this.statusCallback) {
			this.statusCallback(entry.callbackWithStatus);
			this.keypad.ignoreInput = entry.ignoreInput;

			if (!this.keypad.ignoreInput) {
				this.audio.masterVolume = this._shouldMute ? 0 : 1;
			}

			if (entry.proceedIfInjected && this._saveToInject) {
				this.setSavedata(this._saveToInject);
				this._saveToInject = null;
				this.script = goIntoLevelScript;
				this.scriptIndex = -1;
				this.scriptFrameDelay = 0;
			} else if (entry.pause) {
				this.pause();
			}
			this.scriptIndex += 1;
		} else if (this.scriptFrameDelay) {
			this.scriptFrameDelay -= 1;

			if (this.scriptFrameDelay === 0) {
				this.keypad.feed(entry.input);
				this.scriptIndex += 1;
			}
		} else {
			if (
				!entry.predicate ||
				this.mmu.memoryMatches(entry.predicate.address, entry.predicate.value)
			) {
				this.scriptFrameDelay = entry.frameDelay || 1;
			}
		}
	}
};

GameBoyAdvance.prototype.waitFrame = function () {
	var seen = this.seenFrame;
	this.seenFrame = false;
	return !seen;
};

GameBoyAdvance.prototype.pause = function () {
	this.paused = true;
	this.audio.pause(true);
	if (this.queue) {
		clearTimeout(this.queue);
		this.queue = null;
	}
};

GameBoyAdvance.prototype.advanceFrame = function () {
	this.step();
	if (this.seenSave) {
		if (!this.mmu.saveNeedsFlush()) {
			this.storeSavedata();
			this.seenSave = false;
		} else {
			this.mmu.flushSave();
		}
	} else if (this.mmu.saveNeedsFlush()) {
		this.seenSave = true;
		this.mmu.flushSave();
	}
};

GameBoyAdvance.prototype.injectSaveFile = function (saveFileBuffer) {
	if (this.script === prepScript && this.scriptIndex < this.script.length) {
		this._saveToInject = saveFileBuffer;
	} else {
		this.setSavedata(saveFileBuffer);
		this.script = goIntoLevelScript;
		this.scriptIndex = 0;
		this.runStable();
	}
};

GameBoyAdvance.prototype.runStable = function () {
	if (this.interval) {
		return; // Already running
	}
	var self = this;
	var timer = 0;
	var frames = 0;
	var runFunc;
	var start = Date.now();
	this.paused = false;
	this.audio.pause(false);

	if (this.reportFPS) {
		runFunc = function () {
			try {
				timer += Date.now() - start;
				if (self.paused) {
					return;
				} else {
					queueFrame(runFunc);
				}
				start = Date.now();
				self.advanceFrame();
				++frames;
				if (frames == 60) {
					self.reportFPS((frames * 1000) / timer);
					frames = 0;
					timer = 0;
				}
			} catch (exception) {
				self.ERROR(exception);
				if (exception.stack) {
					self.logStackTrace(exception.stack.split('\n'));
				}
				throw exception;
			}
		};
	} else {
		runFunc = function () {
			try {
				if (self.paused) {
					return;
				} else {
					queueFrame(runFunc);
				}
				self.advanceFrame();
			} catch (exception) {
				self.ERROR(exception);
				if (exception.stack) {
					self.logStackTrace(exception.stack.split('\n'));
				}
				throw exception;
			}
		};
	}
	queueFrame(runFunc);
};

GameBoyAdvance.prototype.setSavedata = function (data) {
	this.mmu.loadSavedata(data);
};

GameBoyAdvance.prototype.loadSavedataFromFile = function (saveFile) {
	var reader = new FileReader();
	var self = this;
	reader.onload = function (e) {
		self.setSavedata(e.target.result);
	};
	reader.readAsArrayBuffer(saveFile);
};

GameBoyAdvance.prototype.decodeSavedata = function (string) {
	this.setSavedata(this.decodeBase64(string));
};

GameBoyAdvance.prototype.decodeBase64 = function (string) {
	var length = (string.length * 3) / 4;
	if (string[string.length - 2] == '=') {
		length -= 2;
	} else if (string[string.length - 1] == '=') {
		length -= 1;
	}
	var buffer = new ArrayBuffer(length);
	var view = new Uint8Array(buffer);
	var bits = string.match(/..../g);
	for (var i = 0; i + 2 < length; i += 3) {
		var s = atob(bits.shift());
		view[i] = s.charCodeAt(0);
		view[i + 1] = s.charCodeAt(1);
		view[i + 2] = s.charCodeAt(2);
	}
	if (i < length) {
		var s = atob(bits.shift());
		view[i++] = s.charCodeAt(0);
		if (s.length > 1) {
			view[i++] = s.charCodeAt(1);
		}
	}

	return buffer;
};

GameBoyAdvance.prototype.encodeBase64 = function (view) {
	var data = [];
	var b;
	var wordstring = [];
	var triplet;
	for (var i = 0; i < view.byteLength; ++i) {
		b = view.getUint8(i, true);
		wordstring.push(String.fromCharCode(b));
		while (wordstring.length >= 3) {
			triplet = wordstring.splice(0, 3);
			data.push(btoa(triplet.join('')));
		}
	}
	if (wordstring.length) {
		data.push(btoa(wordstring.join('')));
	}
	return data.join('');
};

GameBoyAdvance.prototype.downloadSavedata = function () {
	var sram = this.mmu.save;
	if (!sram) {
		this.WARN('No save data available');
		return null;
	}
	if (window.URL) {
		var url = window.URL.createObjectURL(
			new Blob([sram.buffer], { type: 'application/octet-stream' })
		);
		window.open(url);
	} else {
		var data = this.encodeBase64(sram.view);
		window.open(
			'data:application/octet-stream;base64,' + data,
			this.rom.code + '.sav'
		);
	}
};

GameBoyAdvance.prototype.storeSavedata = function () {
	var sram = this.mmu.save;
	try {
		var storage = window.localStorage;
		storage[this.SYS_ID + '.' + this.mmu.cart.code] = this.encodeBase64(
			sram.view
		);
	} catch (e) {
		this.WARN('Could not store savedata! ' + e);
	}
};

GameBoyAdvance.prototype.retrieveSavedata = function () {
	try {
		var storage = window.localStorage;
		var data = storage[this.SYS_ID + '.' + this.mmu.cart.code];
		if (data) {
			this.decodeSavedata(data);
			return true;
		}
	} catch (e) {
		this.WARN('Could not retrieve savedata! ' + e);
	}
	return false;
};

GameBoyAdvance.prototype.freeze = function () {
	return {
		cpu: this.cpu.freeze(),
		mmu: this.mmu.freeze(),
		irq: this.irq.freeze(),
		io: this.io.freeze(),
		audio: this.audio.freeze(),
		video: this.video.freeze(),
	};
};

GameBoyAdvance.prototype.defrost = function (frost) {
	this.cpu.defrost(frost.cpu);
	this.mmu.defrost(frost.mmu);
	this.audio.defrost(frost.audio);
	this.video.defrost(frost.video);
	this.irq.defrost(frost.irq);
	this.io.defrost(frost.io);
};

GameBoyAdvance.prototype.log = function (level, message) {};

GameBoyAdvance.prototype.setLogger = function (logger) {
	this.log = logger;
};

GameBoyAdvance.prototype.logStackTrace = function (stack) {
	var overflow = stack.length - 32;
	this.ERROR('Stack trace follows:');
	if (overflow > 0) {
		this.log(-1, '> (Too many frames)');
	}
	for (var i = Math.max(overflow, 0); i < stack.length; ++i) {
		this.log(-1, '> ' + stack[i]);
	}
};

GameBoyAdvance.prototype.ERROR = function (error) {
	if (this.logLevel & this.LOG_ERROR) {
		this.log(this.LOG_ERROR, error);
	}
};

GameBoyAdvance.prototype.WARN = function (warn) {
	if (this.logLevel & this.LOG_WARN) {
		this.log(this.LOG_WARN, warn);
	}
};

GameBoyAdvance.prototype.STUB = function (func) {
	if (this.logLevel & this.LOG_STUB) {
		this.log(this.LOG_STUB, func);
	}
};

GameBoyAdvance.prototype.INFO = function (info) {
	if (this.logLevel & this.LOG_INFO) {
		this.log(this.LOG_INFO, info);
	}
};

GameBoyAdvance.prototype.DEBUG = function (info) {
	if (this.logLevel & this.LOG_DEBUG) {
		this.log(this.LOG_DEBUG, info);
	}
};

GameBoyAdvance.prototype.ASSERT_UNREACHED = function (err) {
	throw new Error('Should be unreached: ' + err);
};

GameBoyAdvance.prototype.ASSERT = function (test, err) {
	if (!test) {
		throw new Error('Assertion failed: ' + err);
	}
};
