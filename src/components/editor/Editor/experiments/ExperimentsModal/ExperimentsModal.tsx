import React from 'react';
import { IconAlert } from '../../../../../icons';
import { Modal } from '../../../../Modal';
import { BinaryLevels } from '../BinaryLevels';

type ExperimentsModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

function ExperimentsModal({ isOpen, onRequestClose }: ExperimentsModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			onXClick={onRequestClose}
			title="Experiments"
		>
			<div className="flex flex-col items-stretch">
				<p className="inline-flex flex-row gap-x-2 items-center bg-red-600 text-white text-xs p-1 self-end">
					<IconAlert />
					This stuff is buggy!
				</p>
				<BinaryLevels onRequestClose={onRequestClose} />
			</div>
		</Modal>
	);
}

export { ExperimentsModal };
