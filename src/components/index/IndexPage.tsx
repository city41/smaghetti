import React from 'react';
import screenshotPng from '../../../screenshotCropped.png';

import { Root } from '../layout/Root';

function IndexPage() {
	return (
		<Root
			title="Smaghetti"
			metaDescription="A level editor for Super Mario Advance 4"
			highlightEditor
		>
			<div className="max-w-2xl mx-auto pt-16">
				<div className="space-y-8 pt-4 pb-16">
					<h1 className="text-2xl font-bold">
						A level editor for Super Mario Advance 4
					</h1>
					<p className="block bg-red-100 text-red-900 p-2 -mx-2">
						Smaghetti is in early preview, checkout the{' '}
						<a className="text-blue-500" href="/roadmap">
							roadmap
						</a>{' '}
						for more info
					</p>
					<img
						className="shadow-lg p-4 bg-gray-500"
						style={{ imageRendering: 'initial' }}
						src={screenshotPng}
						width={1259}
						height={713}
						alt="screenshot of the editor"
					/>
				</div>
			</div>
		</Root>
	);
}

export { IndexPage };
