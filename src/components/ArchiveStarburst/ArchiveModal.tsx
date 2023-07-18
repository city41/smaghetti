import React, { ReactElement } from 'react';
import { Modal } from '../Modal';

type ArchivePreviewModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
};

function ArchiveModal({
	isOpen,
	onRequestClose,
}: ArchivePreviewModalProps): ReactElement {
	return (
		<Modal
			isOpen={isOpen}
			title="Smaghetti will be archived"
			onRequestClose={onRequestClose}
			onOkClick={onRequestClose}
		>
			<div className="w-full max-w-2xl space-y-8">
				<p>
					Smaghetti is no longer being worked on. I really wish it was, but I
					just don&apos;t have the time for it anymore. It has been languishing
					with no real progress for months and months, which is unfair to the
					Mario community.
				</p>
				<p className="p-4 bg-green-600">
					The website will be archived on February 17, 2024.
				</p>
				<p>What does that mean?</p>
				<ul className="ml-4 list-disc flex flex-col gap-y-2">
					<li>It will still be here, at smaghetti.com</li>
					<li>
						The levels and e-coin pages will contain all <b>published</b> levels
						and e-coins.{' '}
						<em className="p-2 bg-red-700 text-white font-bold">
							All private levels will be deleted!
						</em>{' '}
						If you have a private level you want to save, please publish it. You
						can always add &quot;WIP&quot; (work in progress) to its name.
					</li>
					<li>
						User accounts will go away. Everyone can just use Smaghetti without
						logging in.
					</li>
					<li>
						You can still save new levels, but only locally to your own
						computer. If you open Smaghetti on a different computer, those
						levels will not be there.
					</li>
					<li>Publishing levels will no longer be supported.</li>
					<li>Voting on levels will no longer be supported.</li>
				</ul>
			</div>
		</Modal>
	);
}

export { ArchiveModal };
