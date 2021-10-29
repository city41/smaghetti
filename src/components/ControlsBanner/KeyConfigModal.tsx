import React, { ReactElement, ReactNode, useEffect } from 'react';

import { Modal } from '../Modal';
import { IconGamepad } from '../../icons';
import { KeyboardConfig } from './KeyboardConfig';

type KeyConfigModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

function GamePadButton({ children }: { children: ReactNode }) {
	return (
		<span className="inline-block px-2 py-1 bg-gray-500 text-white font-bold rounded-md">
			{children}
		</span>
	);
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
						<p className="bg-green-600 text-white p-1 text-center text-sm">
							Configuring gamepads is coming!
						</p>
					</div>
				</div>
				<KeyboardConfig />
			</div>
		</Modal>
	);
}

export { KeyConfigModal };
