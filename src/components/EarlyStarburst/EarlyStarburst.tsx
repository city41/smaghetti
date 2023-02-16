import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { Starburst } from './Starburst';
import { EarlyModal } from './EarlyModal';

type EarlyPreviewStarburstProps = {
	className?: string;
};

function EarlyStarburst({
	className,
}: EarlyPreviewStarburstProps): ReactElement {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<EarlyModal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
			/>
			<Starburst
				className={clsx(
					className,
					'w-20 h-20 font-bold transform -rotate-12 text-sm'
				)}
			>
				Smaghetti is shutting down
				<a
					className="m-0 p-0 block text-blue-800 cursor-pointer text-xs"
					title="learn more"
					onClick={() => setShowModal(true)}
				>
					learn more
				</a>
			</Starburst>
		</>
	);
}

export { EarlyStarburst };
