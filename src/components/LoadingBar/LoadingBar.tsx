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
			<div
				className={clsx('h-full bg-blue-500', {
					[styles.indeterminate]: percent === -1,
				})}
				style={{ width: `${percent === -1 ? 100 : percent}%` }}
			/>
		</div>
	);
};

export { LoadingBar };
