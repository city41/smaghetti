import React, { ReactNode, useState } from 'react';
import { useGamepads } from '../../hooks/useGamepads';
import { IconGamepad } from '../../icons';
import { Button } from '../Button';

function GamepadButton({ children }: { children: ReactNode }) {
	return (
		<span className="inline-block px-2 py-1 bg-gray-500 text-white font-bold rounded-md">
			{children}
		</span>
	);
}

/**
 * The GamePad API does not tell you what a button is (ie is it a dpad
 * direction? a start button? trigger?). So the only way to determine buttonn
 * names is to look at the gamepad's name and loading a predefined layout. So far
 * haven't done that yet, but this function is a hook to enable that to happen in the future
 * TODO
 */
function gameCodeToString(value: number): string {
	return `B${value}`;
}

const buttonCodeToName = {
	GBA_GAMEPAD_LEFT: 'left',
	GBA_GAMEPAD_RIGHT: 'right',
	GBA_GAMEPAD_UP: 'up',
	GBA_GAMEPAD_DOWN: 'down',
	GBA_GAMEPAD_A: 'A (jump)',
	GBA_GAMEPAD_B: 'B (run)',
};

const buttonSteps = Object.keys(buttonCodeToName) as Array<
	keyof typeof buttonCodeToName
>;

function GamepadConfig() {
	const [buttonConfigStep, setButtonConfigStep] = useState<null | number>(null);
	const [hasGamepad, setHasGamepad] = useState(
		Array.from(navigator.getGamepads()).some((g) => g !== null)
	);

	useGamepads(
		(gamepads) => {
			const gamepad = gamepads[0];
			setHasGamepad(!!gamepad);

			if (buttonConfigStep !== null && hasGamepad && gamepad) {
				const buttonValue = gamepad.buttons.findIndex((b) => b.pressed);

				if (buttonValue > -1) {
					const buttonCode = buttonSteps[buttonConfigStep!];
					window[buttonCode] = buttonValue;

					localStorage[buttonCode] = buttonValue;

					setButtonConfigStep((s) => {
						if (s === buttonSteps.length - 1) {
							return null;
						} else {
							return (s ?? 0) + 1;
						}
					});
				}
			}
		},
		[hasGamepad, setHasGamepad]
	);

	let body;

	if (!hasGamepad) {
		body = (
			<div className="grid place-items-center h-full w-full text-center">
				Press a button on your gamepad to activate it
			</div>
		);
	} else if (buttonConfigStep === null) {
		body = (
			<>
				<div
					className="grid gap-x-2 gap-y-2 items-center mx-auto"
					style={{ gridTemplateColumns: 'repeat(3, min-content)' }}
				>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_LEFT)}
					</GamepadButton>
					<div>-</div>
					<div>left</div>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_RIGHT)}
					</GamepadButton>
					<div>-</div>
					<div>right</div>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_UP)}
					</GamepadButton>
					<div>-</div>
					<div>up</div>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_DOWN)}
					</GamepadButton>
					<div>-</div>
					<div>down</div>
				</div>
				<div
					className="grid gap-x-2 gap-y-2 items-center mx-auto"
					style={{ gridTemplateColumns: 'repeat(3, min-content)' }}
				>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_A)}
					</GamepadButton>
					<div>-</div>
					<div>jump</div>
					<GamepadButton>
						{gameCodeToString(window.GBA_GAMEPAD_B)}
					</GamepadButton>
					<div>-</div>
					<div>run</div>
				</div>
			</>
		);
	} else {
		body = (
			<div>
				Press a key for {buttonCodeToName[buttonSteps[buttonConfigStep]]}
			</div>
		);
	}

	return (
		<div className="bg-gray-600 p-4 flex flex-col gap-y-4 items-center">
			<IconGamepad className="text-4xl mx-auto" />
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-row gap-x-4 items-center justify-center">
					{body}
				</div>
				{hasGamepad && (
					<p className="text-xs italic text-gray-400 text-center px-2">
						browsers don&apos;t tell what the button names are :( eventually I
						will fix this
					</p>
				)}
			</div>
			{hasGamepad && buttonConfigStep === null && (
				<Button onClick={() => setButtonConfigStep(0)}>reassign</Button>
			)}
		</div>
	);
}

export { GamepadConfig };
