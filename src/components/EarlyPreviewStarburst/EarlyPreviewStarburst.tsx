import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import { Starburst } from './Starburst';
import { EarlyPreviewModal } from './EarlyPreviewModal';

type EarlyPreviewStarburstProps = {
	className?: string;
	mode: 'editor' | 'player';
};

const EarlyPreviewStarburst: FunctionComponent<EarlyPreviewStarburstProps> = ({
	className,
	mode,
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<EarlyPreviewModal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
				mode={mode}
			/>
			<Starburst
				className={clsx(
					className,
					'w-20 h-20 font-bold transform -rotate-12 text-sm'
				)}
			>
				early preview!
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
};

export { EarlyPreviewStarburst };
