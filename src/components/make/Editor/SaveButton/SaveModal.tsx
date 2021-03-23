import React, { useEffect } from 'react';
import clsx from 'clsx';

import { Modal } from '../../../Modal';

type SaveModalProps = {
	onRequestClose: () => void;
};

function SaveModal({ onRequestClose }: SaveModalProps) {
	return (
		<Modal
			isOpen={true}
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
			title="Please join to save"
		>
			<div></div>
		</Modal>
	);
}

export { SaveModal };
export type { SaveModalProps };
