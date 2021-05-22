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
			<div className="w-full max-w-2xl space-y-4">
				<p>
					Smaghetti is brand new and there is still a ton of work to be done.
					You will certainly hit bugs and there&apos;s tons of missing features.
				</p>
				<p className="bg-red-500 text-white p-1 -m-1 font-bold">
					If you make a level now, it will probably break in the future as
					things are still in flux. Wait until at least we are in beta before
					building an awesome level!
				</p>
				<p>
					Check the{' '}
					<a
						className="text-blue-500"
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

export { EarlyPreviewModal };
