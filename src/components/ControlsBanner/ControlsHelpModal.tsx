import React, { ReactElement, ReactNode, useEffect } from 'react';
import { FaGamepad, FaKeyboard } from 'react-icons/fa';

import { Modal } from '../Modal';

type ControlsHelpModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

function Kbd({ children }: { children: ReactNode }) {
	return (
		<kbd className="px-2 py-1 bg-gray-500 text-white font-bold rounded-md">
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

function ControlsHelpModal({
	isOpen,
	onRequestClose,
}: ControlsHelpModalProps): ReactElement {
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
					<FaGamepad className="text-4xl mx-auto mb-4" />
					<div className="space-y-4">
						<p>Press a button on your USB gamepad to register it.</p>
						<p>
							For an Xbox One controller, <GamePadButton>A</GamePadButton> is
							jump and <GamePadButton>X</GamePadButton> is run. Other
							controllers should be similar.
						</p>
					</div>
				</div>
				<div className="bg-gray-600 p-4">
					<FaKeyboard className="text-4xl mx-auto mb-4" />
					<ul className="space-y-2 text-center">
						<li>
							<Kbd>arrow keys</Kbd> - move
						</li>
						<li>
							<Kbd>X</Kbd> - jump
						</li>
						<li>
							<Kbd>Z</Kbd> - run
						</li>
					</ul>
				</div>
				<div className="mt-4 px-4 py-2 bg-green-500 text-white col-span-2 text-center">
					Allowing controls to be configured is on the todo list!
				</div>
			</div>
		</Modal>
	);
}

export { ControlsHelpModal };
