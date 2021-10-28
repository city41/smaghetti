import React, { ReactElement, ReactNode, useEffect } from 'react';

import { Modal } from '../Modal';
import {
	IconArrowDown,
	IconArrowLeft,
	IconArrowRight,
	IconArrowUp,
	IconGamepad,
	IconKeyboard,
} from '../../icons';
import { Button } from '../Button';

type KeyConfigModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

function Kbd({ children }: { children: ReactNode }) {
	return (
		<kbd className="inline-block text-center px-2 py-1 bg-gray-500 text-white font-bold rounded-md">
			{children}
		</kbd>
	);
}

function GamePadButton({ children }: { children: ReactNode }) {
	return (
		<span className="inline-block px-2 py-1 bg-gray-500 text-white font-bold rounded-md">
			{children}
		</span>
	);
}

function keyCodeToString(keyCode: number): ReactNode {
	switch (keyCode) {
		case 37:
			return <IconArrowLeft />;
		case 38:
			return <IconArrowUp />;
		case 39:
			return <IconArrowRight />;
		case 40:
			return <IconArrowDown />;
		default:
			return String.fromCharCode(keyCode);
	}
}

function KeyConfigModal({
	isOpen,
	onRequestClose,
}: KeyConfigModalProps): ReactElement {
	useEffect(() => {
		if (isOpen) {
			window._gba?.pause();
		} else {
			window._gba?.runStable();
		}

		return () => {
			window._gba?.runStable();
		};
	}, [isOpen]);

	return (
		<Modal
			isOpen={isOpen}
			onOkClick={onRequestClose}
			onRequestClose={onRequestClose}
			title="Controls"
		>
			<div className="grid grid-cols-2 gap-x-4">
				<div className="bg-gray-600 p-4">
					<IconGamepad className="text-4xl mx-auto mb-4" />
					<div className="space-y-4">
						<p>Press a button on your USB gamepad to register it.</p>
						<p>
							For an Xbox One controller, <GamePadButton>A</GamePadButton> is
							jump and <GamePadButton>X</GamePadButton> is run. Other
							controllers should be similar.
						</p>
					</div>
				</div>
				<div className="bg-gray-600 p-4 flex flex-col gap-y-4 items-center">
					<IconKeyboard className="text-4xl mx-auto mb-4" />
					<div className="flex flex-row gap-x-4 items-center justify-center">
						<div
							className="grid gap-x-2 gap-y-2 items-center mx-auto"
							style={{ gridTemplateColumns: 'repeat(3, min-content)' }}
						>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_LEFT)}</Kbd>
							<div>-</div>
							<div>left</div>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_RIGHT)}</Kbd>
							<div>-</div>
							<div>right</div>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_UP)}</Kbd>
							<div>-</div>
							<div>up</div>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_DOWN)}</Kbd>
							<div>-</div>
							<div>down</div>
						</div>
						<div
							className="grid gap-x-2 gap-y-2 items-center mx-auto"
							style={{ gridTemplateColumns: 'repeat(3, min-content)' }}
						>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_A)}</Kbd>
							<div>-</div>
							<div>jump</div>
							<Kbd>{keyCodeToString(window.GBA_KEYCODE_B)}</Kbd>
							<div>-</div>
							<div>run</div>
						</div>
					</div>
					<Button>reassign</Button>
				</div>
			</div>
		</Modal>
	);
}

export { KeyConfigModal };
