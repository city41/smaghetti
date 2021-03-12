import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

export type JumpClubGamepadData = {
  id: string;

  player: number;
  upPressed: boolean;
  downPressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  jumpPressed: boolean;
  runPressed: boolean;
  pausePressed: boolean;

  upJustPressed: boolean;
  downJustPressed: boolean;
  leftJustPressed: boolean;
  rightJustPressed: boolean;
  jumpJustPressed: boolean;
  runJustPressed: boolean;
  pauseJustPressed: boolean;
};

const UP_BUTTONS_INDEX = 12;
const DOWN_BUTTONS_INDEX = 13;
const LEFT_BUTTONS_INDEX = 14;
const RIGHT_BUTTONS_INDEX = 15;
const JUMP_BUTTONS_INDEX = 0;
const RUN_BUTTONS_INDEX = 2;
const PAUSE_BUTTONS_INDEX = 9;

const ENTER_KEYCODE = 13;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;
const Z_KEYCODE = 90;
const X_KEYCODE = 88;
const S_KEYCODE = 83;

const RUN_KEYCODE = Z_KEYCODE;
const JUMP_KEYCODE = X_KEYCODE;
const PAUSE_KEYCODE = S_KEYCODE;

const keycodeMap: Record<number, string> = {
  [UP_ARROW_KEYCODE]: 'up',
  [DOWN_ARROW_KEYCODE]: 'down',
  [LEFT_ARROW_KEYCODE]: 'left',
  [RIGHT_ARROW_KEYCODE]: 'right',
  [RUN_KEYCODE]: 'run',
  [JUMP_KEYCODE]: 'jump',
  [ENTER_KEYCODE]: 'jump',
  [PAUSE_KEYCODE]: 'pause',
};

const NO_KEYS_DOWN: JumpClubGamepadData = {
  id: 'keyboard',
  player: 0,

  upPressed: false,
  downPressed: false,
  leftPressed: false,
  rightPressed: false,
  jumpPressed: false,
  runPressed: false,
  pausePressed: false,

  upJustPressed: false,
  downJustPressed: false,
  leftJustPressed: false,
  rightJustPressed: false,
  jumpJustPressed: false,
  runJustPressed: false,
  pauseJustPressed: false,
};

function toJumpClubGamepadData(
  previousGamepad: Gamepad | null | undefined,
  gamepad: Gamepad
): JumpClubGamepadData {
  const upPressed = gamepad.buttons[UP_BUTTONS_INDEX].pressed;
  const downPressed = gamepad.buttons[DOWN_BUTTONS_INDEX].pressed;
  const leftPressed = gamepad.buttons[LEFT_BUTTONS_INDEX].pressed;
  const rightPressed = gamepad.buttons[RIGHT_BUTTONS_INDEX].pressed;
  const jumpPressed = gamepad.buttons[JUMP_BUTTONS_INDEX].pressed;
  const runPressed = gamepad.buttons[RUN_BUTTONS_INDEX].pressed;
  const pausePressed = gamepad.buttons[PAUSE_BUTTONS_INDEX].pressed;

  const prevUpPressed = !!previousGamepad?.buttons[UP_BUTTONS_INDEX].pressed;
  const prevDownPressed = !!previousGamepad?.buttons[DOWN_BUTTONS_INDEX]
    .pressed;
  const prevLeftPressed = !!previousGamepad?.buttons[LEFT_BUTTONS_INDEX]
    .pressed;
  const prevRightPressed = !!previousGamepad?.buttons[RIGHT_BUTTONS_INDEX]
    .pressed;
  const prevJumpPressed = !!previousGamepad?.buttons[JUMP_BUTTONS_INDEX]
    .pressed;
  const prevRunPressed = !!previousGamepad?.buttons[RUN_BUTTONS_INDEX].pressed;
  const prevPausePressed = !!previousGamepad?.buttons[PAUSE_BUTTONS_INDEX]
    .pressed;

  const upJustPressed = upPressed && !prevUpPressed;
  const downJustPressed = downPressed && !prevDownPressed;
  const leftJustPressed = leftPressed && !prevLeftPressed;
  const rightJustPressed = rightPressed && !prevRightPressed;
  const jumpJustPressed = jumpPressed && !prevJumpPressed;
  const runJustPressed = runPressed && !prevRunPressed;
  const pauseJustPressed = pausePressed && !prevPausePressed;

  return {
    id: gamepad.id,

    player: gamepad.index,

    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    jumpPressed,
    runPressed,
    pausePressed,

    upJustPressed,
    downJustPressed,
    leftJustPressed,
    rightJustPressed,
    jumpJustPressed,
    runJustPressed,
    pauseJustPressed,
  };
}

type OnPressCallback = (padData: JumpClubGamepadData[]) => void;
type UseGamepadOptions = {
  ignoreKeyboard: boolean;
};

function useGamepads(
  onPressCallback: OnPressCallback,
  options?: UseGamepadOptions
) {
  const previousGamepadsData = useRef<Array<Gamepad | null>>([]);
  const previousKeyboardData = useRef<JumpClubGamepadData>(NO_KEYS_DOWN);

  useEffect(() => {
    let disconnected = false;

    const onKeyDown = (e: KeyboardEvent) => {
      const prefix = keycodeMap[e.keyCode];

      const nextKeyboardData = {
        ...previousKeyboardData.current,
        [prefix + 'Pressed']: true,
      };

      onPressCallback([
        {
          ...nextKeyboardData,
          [prefix + 'JustPressed']: true,
        },
      ]);

      previousKeyboardData.current = nextKeyboardData;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const prefix = keycodeMap[e.keyCode];

      const nextKeyboardData = {
        ...previousKeyboardData.current,
        [prefix + 'Pressed']: false,
      };

      onPressCallback([nextKeyboardData]);
      previousKeyboardData.current = nextKeyboardData;
    };

    const onPoll = () => {
      const nextData = Array.from(navigator.getGamepads());

      if (!isEqual(previousGamepadsData.current, nextData)) {
        const jumpClubGamepadData = Array.from(nextData).reduce<
          JumpClubGamepadData[]
        >((building, gamepad) => {
          if (gamepad === null) {
            return building;
          }

          const previousGamepad = previousGamepadsData.current.find(
            candidate => candidate?.id === gamepad.id
          );
          return building.concat(
            toJumpClubGamepadData(previousGamepad, gamepad)
          );
        }, []);

        previousGamepadsData.current = nextData;
        onPressCallback(jumpClubGamepadData);
      }

      if (!disconnected) {
        requestAnimationFrame(onPoll);
      }
    };

    if (!options || !options.ignoreKeyboard) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
    }
    window.addEventListener('gamepadconnected', onPoll);
    window.addEventListener('gamepaddisconnected', onPoll);
    requestAnimationFrame(onPoll);

    return () => {
      disconnected = true;

      if (!options || !options.ignoreKeyboard) {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
      }

      window.removeEventListener('gamepadconnected', onPoll);
      window.removeEventListener('gamepaddisconnected', onPoll);
    };
  }, [onPressCallback]);
}

export { useGamepads };
