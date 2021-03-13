import React, { useState, memo } from 'react';
import clsx from 'clsx';

import { ConnectedPublishModal } from './ConnectedPublishModal';

type PublishButtonProps = {
	className?: string;
};

const PublishButton = memo(function PublishButton({
	className,
}: PublishButtonProps) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className={clsx(
					className,
					'bg-transparent text-white font-bold text-lg'
				)}
				title="publish your level"
				onClick={() => setShowModal(true)}
			>
				publish
			</button>
			{showModal && (
				<ConnectedPublishModal
					isOpen={true}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
});

PublishButton.displayName = 'PublishButton';

export { PublishButton };
export type { PublishButtonProps };
