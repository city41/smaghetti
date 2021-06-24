import React, { ReactElement } from 'react';
import { Modal } from '../Modal';

type EarlyPreviewModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
};

function EarlyModal({
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
			<div className="w-full max-w-2xl space-y-4">
				<p>
					Smaghetti is considered to be &quot;alpha&quot; quality, which means
					there are still lots of bugs and some missing features.
				</p>
				<p>
					Check the{' '}
					<a
						className="text-blue-300"
						href="/roadmap"
						target="_blank"
						rel="noreferer"
					>
						roadmap
					</a>{' '}
					for more info
				</p>
			</div>
		</Modal>
	);
}

export { EarlyModal };
