import React from 'react';

import { Modal } from '../Modal';

import typographyStyles from '../../styles/typography.module.css';
import selectAFileScreenshotPng from './selectAFileScreenshot.png';
import marioToPlayEReaderLevelPng from './marioToPlayEReaderLevel.png';

type HowToUseDownloadModalProps = {
	isOpen: boolean;
	onRequestClose: () => void;
};

function HowToUseDownloadModal({
	isOpen,
	onRequestClose,
}: HowToUseDownloadModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			title="How to use a downloaded save file"
			onOkClick={() => {
				onRequestClose();
			}}
			onRequestClose={onRequestClose}
		>
			<div className={typographyStyles.typography}>
				<p>
					<span className="bg-green-500 text-white font-bold p-1">
						Copy the save file over:
					</span>{' '}
					Put the save file in the same directory as your SMA4 rom (in either an
					emulator&apos;s rom directory or SD card for your Everdrive X5) and
					give it the same name as the rom file. For emulators, your save file
					needs to have <code>.sav</code> as its extension, on an Everdrive, it
					needs to be <code>.fla</code>
				</p>
				<p className="bg-red-100 text-black p-4 -m-4">
					<span className="bg-red-500 text-white font-bold p-1">
						Everdrive X5 troubleshooting:
					</span>{' '}
					If the save file doesn&apos;t get picked up, try these steps:
					<ul className="ml-12">
						<li>
							Press A on the <code>.fla</code> file and choose &quot;Copy File
							to SRAM&quot;
						</li>
						<li>
							Play another game that also uses flash saves then come back and
							try SMA4 again
						</li>
					</ul>
				</p>
				<p>
					<span className="bg-green-500 text-white font-bold p-1">
						Other flash carts:
					</span>{' '}
					The save file should work on other flash carts, but I don&apos;t own
					any so I can&apos;t verify.
				</p>
				<h2>Once in game</h2>
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
							Go into the tiny island, then choose to play your levels
						</figcaption>
					</figure>
				</div>
			</div>
		</Modal>
	);
}

export { HowToUseDownloadModal };
