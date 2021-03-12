import type { Howl } from 'howler';
import { getResource } from '../resources';

let _muted = false;

function p(audio: Howl | undefined) {
	if (_muted || !audio) {
		return;
	}

	audio.play();
}

const SFX = {
	get muted() {
		return _muted;
	},

	set muted(newMuted: boolean) {
		_muted = newMuted;
	},

	buttonClicked() {
		p(getResource('cut').resource as Howl);
	},

	tilePainted() {
		p(getResource('playCard').resource as Howl);
	},
};

export { SFX };
