import React, { ReactElement } from 'react';
import { Modal } from '../Modal';

type EarlyPreviewModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
};

function EarlyPreviewModal({
	isOpen,
	onRequestClose,
}: EarlyPreviewModalProps): ReactElement {
	return (
		<Modal
			isOpen={isOpen}
			title="Thanks for trying out Smaghetti!"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl">
				<p>
					Smaghetti is brand new and there is still a ton of work to be done.
					You will certainly hit bugs and there&apos;s tons of missing features.
				</p>
			</div>
		</Modal>
	);
}

export { EarlyPreviewModal };
