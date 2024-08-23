import React from 'react';
import screenshotPng from '../../../screenshotCropped.png';
import { DISCORD_LINK } from '../../constants';

import { Root } from '../layout/Root';
import { IconAlert } from '../../icons';

function IndexPage() {
	return (
		<Root
			title="Smaghetti"
			metaDescription="A level editor for Super Mario Advance 4"
		>
			<div className="max-w-2xl mx-auto pt-16">
				<div className="space-y-8 pt-4 pb-16">
					<h1 className="text-2xl font-bold">
						A level editor for Super Mario Advance 4
					</h1>
					<p className="my-4 p-2 bg-yellow-100 text-green-800 font-bold text-lg flex flex-row">
						<IconAlert className="w-8 h-8 text-green-300 mr-4" />
						Smaghetti has moved to smaghetti.mattgreer.dev
					</p>
					<p className="mt-4 mb-16 text-sm p-2 bg-yellow-100 text-yellow-800">
						Smaghetti is no longer updated. This site is now an
						&quot;archive&quot;
					</p>
					<figure>
						<img
							className="shadow-lg p-4 bg-gray-500"
							style={{ imageRendering: 'initial' }}
							src={screenshotPng.src}
							width={1259}
							height={930}
							alt="screenshot of the editor"
						/>
						<figcaption className="w-full text-center mt-1.5 text-sm">
							<a
								className="underline text-blue-400"
								href="/editor/HTCbl1q6/Invaded-Beach/"
							>
								Invaded Beach
							</a>{' '}
							by Nauts, voted level of the year on the{' '}
							<a
								className="text-blue-400 underline"
								href={DISCORD_LINK}
								target="_blank"
								rel="noreferrer"
							>
								Smaghetti Discord
							</a>{' '}
							:)
						</figcaption>
					</figure>
				</div>
			</div>
		</Root>
	);
}

export { IndexPage };
