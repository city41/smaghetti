import React from 'react';
import { Button } from '../../../../Button';

type Overwrite1_1Props = {
	onDownloadPatch: () => void;
};

function Overwrite1_1({ onDownloadPatch }: Overwrite1_1Props) {
	function handleSetOverwrite() {
		// @ts-ignore
		window.overwrite1_1 = true;
	}

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Replace 1-1</h1>
			<div className="text-gray-400 flex flex-col gap-y-4">
				<p>
					Have your Smaghetti level replace 1-1. Once you launch the emulator,
					exit back to the main game and go into 1-1.
				</p>
				<p className="font-bold text-gray-300">Caveats:</p>
				<ul className="list-disc ml-4">
					<li>
						So far only very simple levels work, lots of research needed yet
					</li>
					<li>Only room 1 will replace 1-1, warps will not work</li>
					<li>If your room is too big to fit, then bad things will happen</li>
					<li>Many entities do not yet work</li>
					<li>To get back to a clean state, refresh the browser</li>
				</ul>
			</div>

			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={handleSetOverwrite}>Replace 1-1</Button>
				<Button onClick={onDownloadPatch}>Download IPS patch</Button>
			</div>
		</div>
	);
}

export { Overwrite1_1 };
