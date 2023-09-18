import React from 'react';
import clsx from 'clsx';
import shergiokJpg from './shergiokBanner.jpg';

type ShergiokProps = {
	className?: string;
};

function Shergiok({ className }: ShergiokProps) {
	return (
		<div className={clsx(className, 'flex flex-col bg-yellow-200')}>
			<img src={shergiokJpg.src} className="hidden sm:block w-full" />
			<div className="text-sm text-yellow-900 px-2 py-1">
				<a
					href="https://www.youtube.com/@Shergiok"
					target="_blank"
					rel="noreferrer nofollower"
					className="underline"
				>
					Shergiok on YouTube
				</a>{' '}
				has been playing all Smaghetti levels!
			</div>
		</div>
	);
}

export { Shergiok };
