import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type InternalLinkProps = {
	className?: string;
	to: string;
	children: ReactNode;
};

const InternalLink: FunctionComponent<InternalLinkProps> = ({
	className,
	to,
	children,
}) => {
	return (
		<Link href={to} passHref legacyBehavior>
			<a
				className={clsx(
					className,
					'font-bold cursor-pointer text-decoration-none text-link hover:underline'
				)}
			>
				{children}
			</a>
		</Link>
	);
};

export { InternalLink };
