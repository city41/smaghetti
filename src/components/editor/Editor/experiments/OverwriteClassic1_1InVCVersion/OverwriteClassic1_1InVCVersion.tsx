import React from 'react';
import { Button } from '../../../../Button';

type OverwriteClassic1_1InVCVersionProps = {
	onDownloadPatch: () => void;
};

function OverwriteClassic1_1InVCVersion({
	onDownloadPatch,
}: OverwriteClassic1_1InVCVersionProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Replace Classic 1-1 in VC Version</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>
					Have your Smaghetti level replace Classic 1-1 in the Wii U Virtual
					Console version of the game.
				</p>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={onDownloadPatch}>Download IPS patch</Button>
			</div>
		</div>
	);
}

export { OverwriteClassic1_1InVCVersion };
