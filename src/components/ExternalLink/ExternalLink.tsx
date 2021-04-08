import React, { ReactNode } from 'react';
import clsx from 'clsx';

type ExternalLinkProps = {
	className?: string;
	href: string;
	title?: string;
	children: ReactNode;
};

function ExternalLink({ className, href, title, children }: ExternalLinkProps) {
	return (
		<a
			className={clsx(
				className,
				'inline-block text-indigo-500 no-underline font-bold hover:underline'
			)}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			title={title}
		>
			{children}
		</a>
	);
}

export { ExternalLink };
export type { ExternalLinkProps };
