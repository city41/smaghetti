import React from 'react';
import screenshotPng from '../../../screenshotCropped.png';

import { Root } from '../layout/Root';

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
					<figure>
						<img
							className="shadow-lg p-4 bg-gray-500"
							style={{ imageRendering: 'initial' }}
							src={screenshotPng}
							width={1259}
							height={930}
							alt="screenshot of the editor"
						/>
						<figcaption className="w-full text-center mt-1.5 text-sm">
							<a
								className="underline text-blue-400"
								href="/editor/GsQhiP-V/A-Plumber-s-Nightmare/"
							>
								A Plumber&apos;s Nightmare
							</a>{' '}
							by adelani
						</figcaption>
					</figure>
				</div>
			</div>
		</Root>
	);
}

export { IndexPage };
