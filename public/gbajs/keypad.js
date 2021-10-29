GameBoyAdvanceKeypad = function GameBoyAdvanceKeypad() {
	window.GBA_KEYCODE_LEFT =
		typeof localStorage.GBA_KEYCODE_LEFT === 'string'
			? Number(localStorage.GBA_KEYCODE_LEFT)
			: 37;
	window.GBA_KEYCODE_UP =
		typeof localStorage.GBA_KEYCODE_UP === 'string'
			? Number(localStorage.GBA_KEYCODE_UP)
			: 38;
	window.GBA_KEYCODE_RIGHT =
		typeof localStorage.GBA_KEYCODE_RIGHT === 'string'
			? Number(localStorage.GBA_KEYCODE_RIGHT)
			: 39;
	window.GBA_KEYCODE_DOWN =
		typeof localStorage.GBA_KEYCODE_DOWN === 'string'
			? Number(localStorage.GBA_KEYCODE_DOWN)
			: 40;
	window.GBA_KEYCODE_START =
		typeof localStorage.GBA_KEYCODE_START === 'string'
			? Number(localStorage.GBA_KEYCODE_START)
			: 13;
	window.GBA_KEYCODE_SELECT =
		typeof localStorage.GBA_KEYCODE_SELECT === 'string'
			? Number(localStorage.GBA_KEYCODE_SELECT)
			: 220;
	window.GBA_KEYCODE_A =
		typeof localStorage.GBA_KEYCODE_A === 'string'
			? Number(localStorage.GBA_KEYCODE_A)
			: 88;
	window.GBA_KEYCODE_B =
		typeof localStorage.GBA_KEYCODE_B === 'string'
			? Number(localStorage.GBA_KEYCODE_B)
			: 90;
	window.GBA_KEYCODE_L =
		typeof localStorage.GBA_KEYCODE_L === 'string'
			? Number(localStorage.GBA_KEYCODE_L)
			: 65;
	window.GBA_KEYCODE_R =
		typeof localStorage.GBA_KEYCODE_R === 'string'
			? Number(localStorage.GBA_KEYCODE_R)
			: 83;

	window.GBA_GAMEPAD_LEFT =
		typeof localStorage.GBA_GAMEPAD_LEFT === 'string'
			? Number(localStorage.GBA_GAMEPAD_LEFT)
			: 14;
	window.GBA_GAMEPAD_UP =
		typeof localStorage.GBA_GAMEPAD_UP === 'string'
			? Number(localStorage.GBA_GAMEPAD_UP)
			: 12;
	window.GBA_GAMEPAD_RIGHT =
		typeof localStorage.GBA_GAMEPAD_RIGHT === 'string'
			? Number(localStorage.GBA_GAMEPAD_RIGHT)
			: 15;
	window.GBA_GAMEPAD_DOWN =
		typeof localStorage.GBA_GAMEPAD_DOWN === 'string'
			? Number(localStorage.GBA_GAMEPAD_DOWN)
			: 13;
	window.GBA_GAMEPAD_START =
		typeof localStorage.GBA_GAMEPAD_START === 'string'
			? Number(localStorage.GBA_GAMEPAD_START)
			: 9;
	window.GBA_GAMEPAD_SELECT =
		typeof localStorage.GBA_GAMEPAD_SELECT === 'string'
			? Number(localStorage.GBA_GAMEPAD_SELECT)
			: 8;
	window.GBA_GAMEPAD_A =
		typeof localStorage.GBA_GAMEPAD_A === 'string'
			? Number(localStorage.GBA_GAMEPAD_A)
			: 0; // A on an XB1 controller
	window.GBA_GAMEPAD_B =
		typeof localStorage.GBA_GAMEPAD_B === 'string'
			? Number(localStorage.GBA_GAMEPAD_B)
			: 2; // X on an XB1 controller
	window.GBA_GAMEPAD_L =
		typeof localStorage.GBA_GAMEPAD_L === 'string'
			? Number(localStorage.GBA_GAMEPAD_L)
			: 4;
	window.GBA_GAMEPAD_R =
		typeof localStorage.GBA_GAMEPAD_R === 'string'
			? Number(localStorage.GBA_GAMEPAD_R)
			: 5;
	window.GBA_GAMEPAD_THRESHOLD = 0.2;

	this.A = 0;
	this.B = 1;
	this.SELECT = 2;
	this.START = 3;
	this.RIGHT = 4;
	this.LEFT = 5;
	this.UP = 6;
	this.DOWN = 7;
	this.R = 8;
	this.L = 9;

	this._currentKeyDown = 0x03ff;
	this._currentGamePadDown = 0x03ff;
	this.ignoreInput = false;
	this.eatInput = false;

	this._fedInput = 0x3ff;

	this.gamepadConnected = false;

	Object.defineProperty(this, 'currentDown', {
		get() {
			if (this._fedInput !== 0x03ff) {
				const toReturn = this._fedInput;
				this._fedInput = 0x03ff;
				return toReturn;
			} else if (this.ignoreInput) {
				return 0x03ff;
			} else {
				return this._currentKeyDown & this._currentGamePadDown;
			}
		},
	});
};

GameBoyAdvanceKeypad.prototype.reset = function () {
	this._currentKeyDown = 0x03ff;
	this._currentGamePadDown = 0x03ff;
};

GameBoyAdvanceKeypad.prototype.feed = function (inputValue) {
	this._fedInput = 0x03ff & ~(1 << inputValue);
};

GameBoyAdvanceKeypad.prototype.keyboardHandler = function (e) {
	var toggle = 0;
	switch (e.keyCode) {
		// purposely not letting users press start, to help ensure
		// the automation doesn't get off track

		case window.GBA_KEYCODE_START:
			toggle = this.START;
			break;
		case window.GBA_KEYCODE_SELECT:
			toggle = this.SELECT;
			break;
		case window.GBA_KEYCODE_A:
			toggle = this.A;
			break;
		case window.GBA_KEYCODE_B:
			toggle = this.B;
			break;
		case window.GBA_KEYCODE_L:
			toggle = this.L;
			break;
		case window.GBA_KEYCODE_R:
			toggle = this.R;
			break;
		case window.GBA_KEYCODE_UP:
			toggle = this.UP;
			break;
		case window.GBA_KEYCODE_RIGHT:
			toggle = this.RIGHT;
			break;
		case window.GBA_KEYCODE_DOWN:
			toggle = this.DOWN;
			break;
		case window.GBA_KEYCODE_LEFT:
			toggle = this.LEFT;
			break;
		default:
			return;
	}

	toggle = 1 << toggle;
	if (e.type == 'keydown') {
		this._currentKeyDown &= ~toggle;
	} else {
		this._currentKeyDown |= toggle;
	}

	if (this.eatInput) {
		e.preventDefault();
	}
};

GameBoyAdvanceKeypad.prototype.gamepadHandler = function (gamepad) {
	let value = 0;

	// purposely not letting users press start, to help ensure
	// the automation doesn't get off track
	// if (gamepad.buttons[window.GBA_GAMEPAD_START].pressed) {
	// 	value |= 1 << this.START;
	// }

	if (gamepad.buttons[window.GBA_GAMEPAD_LEFT].pressed) {
		value |= 1 << this.LEFT;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_UP].pressed) {
		value |= 1 << this.UP;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_RIGHT].pressed) {
		value |= 1 << this.RIGHT;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_DOWN].pressed) {
		value |= 1 << this.DOWN;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_SELECT].pressed) {
		value |= 1 << this.SELECT;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_A].pressed) {
		value |= 1 << this.A;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_B].pressed) {
		value |= 1 << this.B;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_L].pressed) {
		value |= 1 << this.L;
	}
	if (gamepad.buttons[window.GBA_GAMEPAD_R].pressed) {
		value |= 1 << this.R;
	}

	this._currentGamePadDown = ~value & 0x3ff;
};

GameBoyAdvanceKeypad.prototype.gamepadConnectHandler = function () {
	this.gamepadConnected = true;
};

GameBoyAdvanceKeypad.prototype.gamepadDisconnectHandler = function () {
	this.gamepadConnected = false;
};

GameBoyAdvanceKeypad.prototype.pollGamepads = function () {
	// const navigatorList = navigator.getGamepads();
	//
	// // Let's all give a shout out to Chrome for making us get the gamepads EVERY FRAME
	// if (navigatorList.length && this.gamepads.length === 0) {
	// 	for (let i = 0; i < navigatorList.length; ++i) {
	// 		if (navigatorList[i]) {
	// 			this.gamepads.push(navigatorList[i]);
	// 		}
	// 	}
	// }

	if (this.gamepadConnected) {
		this.gamepadHandler(navigator.getGamepads()[0]);
	}
};

GameBoyAdvanceKeypad.prototype.registerHandlers = function () {
	window.addEventListener('keydown', this.keyboardHandler.bind(this), true);
	window.addEventListener('keyup', this.keyboardHandler.bind(this), true);

	window.addEventListener(
		'gamepadconnected',
		this.gamepadConnectHandler.bind(this),
		true
	);

	window.addEventListener(
		'gamepaddisconnected',
		this.gamepadDisconnectHandler.bind(this),
		true
	);
};
