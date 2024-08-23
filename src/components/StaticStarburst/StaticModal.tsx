import React, { ReactElement } from 'react';
import { Modal } from '../Modal';

type StaticModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
};

function StaticModal({
	isOpen,
	onRequestClose,
}: StaticModalProps): ReactElement {
	return (
		<Modal
			isOpen={isOpen}
			title="Smaghetti has moved"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl space-y-8">
				<p className="p-4 bg-yellow-100 text-green-600">
					Smaghetti has moved to <b>smaghetti.mattgreer.dev</b>.
				</p>
				<p>
					Smaghetti is no longer being worked on. I really wish it was, but I
					just don&apos;t have the time for it anymore. So now Smaghetti is a
					static website. This means:
				</p>
				<ul className="ml-4 list-disc">
					<li>No new features will be added</li>
					<li>Smaghetti no longer has accounts</li>
					<li>You can no longer publish levels</li>
					<li>All levels you save are saved to your own computer</li>
					<li>
						The levels page is an archive of all the levels that were published
						while Smaghetti was active
					</li>
				</ul>
			</div>
		</Modal>
	);
}

export { StaticModal };
