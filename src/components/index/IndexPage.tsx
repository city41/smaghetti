import React, { useState } from 'react';
import screenshotPng from '../../../screenshotCropped.png';
import { DISCORD_LINK } from '../../constants';

import { Root } from '../layout/Root';
import { ArchiveModal } from '../ArchiveStarburst/ArchiveModal';

function IndexPage() {
	const [showArchiveModal, setShowArchiveModal] = useState(false);

	return (
		<>
			<Root
				title="Smaghetti"
				metaDescription="A level editor for Super Mario Advance 4"
			>
				<div className="max-w-2xl mx-auto pt-16">
					<div className="space-y-8 pt-4 pb-16">
						<h1 className="text-2xl font-bold">
							A level editor for Super Mario Advance 4
						</h1>
						<p className="p-2 bg-red-100 text-red-900">
							Smaghetti will turn into a usable archive on February 17, 2024.{' '}
							<a
								className="underline cursor-pointer text-blue-700"
								onClick={() => setShowArchiveModal(true)}
							>
								What does that mean?
							</a>
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
			<ArchiveModal
				isOpen={showArchiveModal}
				onRequestClose={() => setShowArchiveModal(false)}
			/>
		</>
	);
}

export { IndexPage };
