import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { Starburst } from './Starburst';
import { ArchiveModal } from './ArchiveModal';

type ArchivePreviewStarburstProps = {
	className?: string;
};

function ArchiveStarburst({
	className,
}: ArchivePreviewStarburstProps): ReactElement {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<ArchiveModal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
			/>
			<Starburst
				className={clsx(
					className,
					'w-20 h-20 font-bold transform -rotate-12 text-sm'
				)}
			>
				Smaghetti will be archived
				<a
					className="m-0 p-0 block text-blue-300 cursor-pointer text-xs"
					title="learn more"
					onClick={() => setShowModal(true)}
				>
					learn more
				</a>
			</Starburst>
		</>
	);
}

export { ArchiveStarburst };
