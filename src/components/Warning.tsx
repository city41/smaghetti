import React, { ReactNode } from 'react';
import clsx from 'clsx';

type WarningProps = {
	className?: string;
	children: ReactNode;
};

function Warning({ className, children }: WarningProps) {
	return (
		<div className={clsx(className, 'p-4 bg-yellow-100 text-yellow-900')}>
			{children}
		</div>
	);
}

export { Warning };
