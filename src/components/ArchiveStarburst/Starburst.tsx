import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './Starburst.module.css';

type StarburstProps = {
	className?: string;
};

const Starburst: FunctionComponent<StarburstProps> = ({
	className,
	children,
}) => {
	return (
		<div className={clsx(className, styles.root)}>
			<div className={clsx(styles.burst, styles.burst1)} />
			<div className={clsx(styles.burst, styles.burst2)} />
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export { Starburst };
