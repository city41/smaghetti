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
			title="Smaghetti is shutting down"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl space-y-8">
				<p>
					Smaghetti is no longer being worked on. I really wish it was, but I
					just don&apos;t have the time for it anymore. It has been languishing
					with no real progress for months and months, which is unfair to the
					Mario community. As much as I hate to do this, I think just being
					honest that I can no longer work on it is better.
				</p>
				<p>
					The website will be taken down on February 17, 2024. One year from
					this announcement.
				</p>
			</div>
		</Modal>
	);
}

export { EarlyModal };
