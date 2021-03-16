import React, { useState } from 'react';

import { Modal } from '../Modal';

import selectAFileScreenshotPng from './selectAFileScreenshot.png';
import marioToPlayEReaderLevelPng from './marioToPlayEReaderLevel.png';

const LOCALSTORAGE_KEY = 'suppress_nosavestatedisclaimermodal';

type NoSaveStatesDisclaimerModalProps = {
	forceOpen?: boolean;
};

function NoSaveStatesDisclaimerModal({
	forceOpen,
}: NoSaveStatesDisclaimerModalProps) {
	const [isOpen, setOpen] = useState(
		forceOpen || !localStorage.getItem(LOCALSTORAGE_KEY)
	);

	console.log({ isOpen });

	return (
		<Modal
			isOpen={isOpen}
			title="How to play your level"
			onOkClick={() => {
				localStorage.setItem(LOCALSTORAGE_KEY, 'true');
				setOpen(false);
			}}
		>
			<div style={{ width: 550 }}>
				<p className="text-center pb-4">
					Your level is an e-reader level, here's how to get to it
				</p>
				<div className="grid grid-cols-2 gap-x-4 justify-items-center items-start">
					<figure className="flex flex-col items-center">
						<img
							src={selectAFileScreenshotPng}
							alt="The save file screen in SMA4"
							width={240}
							height={160}
						/>
						<figcaption className="text-sm mt-4" style={{ maxWidth: 240 }}>
							Choose <b>Level Card</b> on the save file screen
						</figcaption>
					</figure>
					<figure className="flex flex-col items-center">
						<img
							src={marioToPlayEReaderLevelPng}
							alt="Mario in the e-reader overworld"
							width={240}
							height={160}
						/>
						<figcaption className="text-sm mt-4" style={{ maxWidth: 240 }}>
							Go into the tiny island, then choose to play the <b>SMAGHETTI</b>{' '}
							level
						</figcaption>
					</figure>
					<div className="mt-4 px-4 py-2 bg-green-500 text-white col-span-2">
						Letting you jump straight into your level is on the todo list!
					</div>
				</div>
			</div>
		</Modal>
	);
}

export { NoSaveStatesDisclaimerModal };
