import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { FaSafari } from 'react-icons/fa';

import styles from './SafariWarning.module.css';

type SafariWarningProps = {
	className?: string;
};

function SafariWarning({ className }: SafariWarningProps): ReactElement {
	return (
		<div
			className={clsx(
				className,
				styles.root,
				'flex flex-row py-1 px-3 items-center space-x-2 text-xs'
			)}
		>
			<FaSafari />
			<span>the game may run slowly in Safari</span>
		</div>
	);
}

export { SafariWarning };
