import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';

import { Starburst } from './Starburst';
import { StaticModal } from './StaticModal';

type StaticPreviewStarburstProps = {
	className?: string;
};

function StaticStarburst({
	className,
}: StaticPreviewStarburstProps): ReactElement {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<StaticModal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
			/>
			<Starburst
				className={clsx(
					className,
					'w-20 h-20 font-bold transform -rotate-12 text-sm'
				)}
			>
				Smaghetti has moved!
				<a
					className="m-0 p-0 block text-blue-200 cursor-pointer text-xs"
					title="learn more"
					onClick={() => setShowModal(true)}
				>
					learn more
				</a>
			</Starburst>
		</>
	);
}

export { StaticStarburst };
