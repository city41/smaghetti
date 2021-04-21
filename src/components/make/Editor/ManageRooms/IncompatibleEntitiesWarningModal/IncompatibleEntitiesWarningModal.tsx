import React, { ReactElement } from 'react';

import { Modal } from '../../../../Modal';
import { Button } from '../../../../Button';

type IncompatibleEntitiesWarningModalProps = {
	isOpen: boolean;
	onCancel: () => void;
	onProceed: () => void;
	incompatibleType?: string;
};

function IncompatibleEntitiesWarningModal({
	isOpen,
	onCancel,
	onProceed,
	incompatibleType = '',
}: IncompatibleEntitiesWarningModalProps): ReactElement {
	return (
		<Modal
			isOpen={isOpen}
			title="Incompatible Entities"
			onXClick={onCancel}
			onRequestClose={onCancel}
		>
			<div className="flex flex-col space-y-4">
				<p>
					There are entities currently in this room that are not compatible with{' '}
					<span className="font-bold text-green-400">{incompatibleType}</span>{' '}
					rooms.
				</p>
				<p className="text-center font-bold text-lg bg-red-500 p-1 text-white">
					If you proceed, they will be deleted
				</p>
				<div className="flex flex-row items-center justify-center space-x-2">
					<Button onClick={onCancel}>Cancel</Button>
					<Button onClick={onProceed}>Proceed</Button>
				</div>
			</div>
		</Modal>
	);
}

export { IncompatibleEntitiesWarningModal };
