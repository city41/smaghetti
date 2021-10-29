import React, { ReactElement, useEffect } from 'react';

import { Modal } from '../Modal';
import { KeyboardConfig } from './KeyboardConfig';
import { GamepadConfig } from './GamepadConfig';

import styles from './KeyConfigModal.module.css';

type KeyConfigModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

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
			className={styles.modal}
		>
			<div className="grid grid-cols-2 gap-x-4">
				<GamepadConfig />
				<KeyboardConfig />
			</div>
		</Modal>
	);
}

export { KeyConfigModal };
