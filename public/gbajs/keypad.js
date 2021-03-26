GameBoyAdvanceKeypad = function GameBoyAdvanceKeypad() {
	this.KEYCODE_LEFT = 37;
	this.KEYCODE_UP = 38;
	this.KEYCODE_RIGHT = 39;
	this.KEYCODE_DOWN = 40;
	this.KEYCODE_START = 13;
	this.KEYCODE_SELECT = 220;
	this.KEYCODE_A = 88;
	this.KEYCODE_B = 90;
	this.KEYCODE_L = 65;
	this.KEYCODE_R = 83;

	this.GAMEPAD_LEFT = 14;
	this.GAMEPAD_UP = 12;
	this.GAMEPAD_RIGHT = 15;
	this.GAMEPAD_DOWN = 13;
	this.GAMEPAD_START = 9;
	this.GAMEPAD_SELECT = 8;
	this.GAMEPAD_A = 0; // A on an XB1 controller
	this.GAMEPAD_B = 2; // X on an XB1 controller
	this.GAMEPAD_L = 4;
	this.GAMEPAD_R = 5;
	this.GAMEPAD_THRESHOLD = 0.2;

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

	this._currentDown = 0x03ff;
	this.ignoreInput = false;
	this.eatInput = false;

	this._fedInput = 0;

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
				return this._currentDown;
			}
		},
	});
};

GameBoyAdvanceKeypad.prototype.feed = function (inputValue) {
	this._fedInput = 0x03ff & ~(1 << inputValue);
};

GameBoyAdvanceKeypad.prototype.keyboardHandler = function (e) {
	var toggle = 0;
	switch (e.keyCode) {
		// purposely not letting users press start, to help ensure
		// the automation doesn't get off track

		case this.KEYCODE_START:
			toggle = this.START;
			break;
		case this.KEYCODE_SELECT:
			toggle = this.SELECT;
			break;
		case this.KEYCODE_A:
			toggle = this.A;
			break;
		case this.KEYCODE_B:
			toggle = this.B;
			break;
		case this.KEYCODE_L:
			toggle = this.L;
			break;
		case this.KEYCODE_R:
			toggle = this.R;
			break;
		case this.KEYCODE_UP:
			toggle = this.UP;
			break;
		case this.KEYCODE_RIGHT:
			toggle = this.RIGHT;
			break;
		case this.KEYCODE_DOWN:
			toggle = this.DOWN;
			break;
		case this.KEYCODE_LEFT:
			toggle = this.LEFT;
			break;
		default:
			return;
	}

	toggle = 1 << toggle;
	if (e.type == 'keydown') {
		this._currentDown &= ~toggle;
	} else {
		this._currentDown |= toggle;
	}

	if (this.eatInput) {
		e.preventDefault();
	}
};

GameBoyAdvanceKeypad.prototype.gamepadHandler = function (gamepad) {
	let value = 0;

	// purposely not letting users press start, to help ensure
	// the automation doesn't get off track
	// if (gamepad.buttons[this.GAMEPAD_START].pressed) {
	// 	value |= 1 << this.START;
	// }

	if (gamepad.buttons[this.GAMEPAD_LEFT].pressed) {
		value |= 1 << this.LEFT;
	}
	if (gamepad.buttons[this.GAMEPAD_UP].pressed) {
		value |= 1 << this.UP;
	}
	if (gamepad.buttons[this.GAMEPAD_RIGHT].pressed) {
		value |= 1 << this.RIGHT;
	}
	if (gamepad.buttons[this.GAMEPAD_DOWN].pressed) {
		value |= 1 << this.DOWN;
	}
	if (gamepad.buttons[this.GAMEPAD_SELECT].pressed) {
		value |= 1 << this.SELECT;
	}
	if (gamepad.buttons[this.GAMEPAD_A].pressed) {
		value |= 1 << this.A;
	}
	if (gamepad.buttons[this.GAMEPAD_B].pressed) {
		value |= 1 << this.B;
	}
	if (gamepad.buttons[this.GAMEPAD_L].pressed) {
		value |= 1 << this.L;
	}
	if (gamepad.buttons[this.GAMEPAD_R].pressed) {
		value |= 1 << this.R;
	}

	this._currentDown = ~value & 0x3ff;
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
