import React, { useState, memo } from 'react';
import { AiFillSave } from 'react-icons/ai';

import { ConnectedSaveModal } from './ConnectedSaveModal';
import { IconButton } from '../../../IconButton';

type SaveButtonProps = {
	className?: string;
};

const SaveButton = memo(function SaveButton({ className }: SaveButtonProps) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<IconButton
				anchor="top"
				className={className}
				label="save your level"
				onClick={() => setShowModal(true)}
				icon={AiFillSave}
				alternate
			/>
			{showModal && (
				<ConnectedSaveModal isOpen={true} onClose={() => setShowModal(false)} />
			)}
		</>
	);
});

export { SaveButton };
export type { SaveButtonProps };
