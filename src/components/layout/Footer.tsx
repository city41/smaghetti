import React from 'react';
import clsx from 'clsx';

type FooterProps = {
	className?: string;
};

function Footer({ className }: FooterProps) {
	return (
		<footer
			className={clsx(
				className,
				'bg-gray-900 py-2 px-2 sm:p-4 text-center text-xs xborder-t border-focal-400'
			)}
		>
			<div className="w-full max-w-6xl mx-auto flex flex-col space-y-2">
				<div className="text-gray-500">
					<p>
						Mario and Super Mario Advance are owned by Nintendo. This site is
						not associated with or endorsed by Nintendo in any way.
					</p>
				</div>
				<div>
					Made by{' '}
					<a
						className="text-link hover:underline"
						href="https://twitter.com/mattegreer"
					>
						Matt Greer
					</a>
					<span className="mx-2">&#124;</span>
					<a
						className="text-link hover:underline"
						href="https://github.com/city41/smaghetti"
					>
						GitHub repo
					</a>
					<span className="mx-2">&#124;</span>
					<a className="text-link hover:underline" href="/privacy">
						Privacy Policy
					</a>
					<span className="mx-2">&#124;</span>
					<a className="text-link hover:underline" href="/tos">
						Terms of Service
					</a>
				</div>
			</div>
		</footer>
	);
}

export { Footer };
