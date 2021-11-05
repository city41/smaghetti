import React from 'react';
import { Button } from '../../../../Button';

type InternalEmulatorAudioProps = {
	onToggle: () => void;
	unmute: boolean;
};

function EmulatorAudio({ onToggle, unmute }: InternalEmulatorAudioProps) {
	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Emulator Audio</h1>
			<p className="text-gray-400">
				These toggles configure audio in the emulator. Still a work in progress
				because often the audio is scratchy and slow.
			</p>
			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={onToggle} toggled={!unmute}>
					Audio off
				</Button>
				<Button onClick={onToggle} toggled={unmute}>
					Audio on
				</Button>
			</div>
		</div>
	);
}

export { EmulatorAudio };
