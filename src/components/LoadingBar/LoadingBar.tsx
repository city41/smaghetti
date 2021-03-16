import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './LoadingBar.module.css';

type LoadingBarProps = {
	className?: string;
	percent: number;
};

const LoadingBar: FunctionComponent<LoadingBarProps> = ({
	className,
	percent,
}) => {
	return (
		<div className={clsx(className, styles.root)}>
			<div className={styles.bar} style={{ width: `${percent}%` }} />
		</div>
	);
};

export { LoadingBar };
