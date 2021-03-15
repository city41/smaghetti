import React, { useEffect } from 'react';
import { Modal } from '../../Modal';

type FileLoaderModalProps = {
	isOpen: boolean;
	isLoadingBios: boolean;
	isLoadingRom: boolean;
	onBiosFileChosen: (biosFile: File) => void;
	onRomFileChosen: (romFile: File) => void;
};

// this is the only programmatic way I know of to get a File
function loadFile(url: string, callback: (file: File) => void) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = 'blob';

	xhr.onload = function () {
		const blob = xhr.response;
		callback(new File([blob], blob));
	};

	xhr.send();
}

function FileLoaderModal({
	isOpen,
	isLoadingBios,
	isLoadingRom,
	onBiosFileChosen,
	onRomFileChosen,
}: FileLoaderModalProps) {
	useEffect(() => {
		loadFile('/bios.bin', (biosFile) => {
			onBiosFileChosen(biosFile);
		});

		loadFile('/sma4.gba', (romFile) => {
			onRomFileChosen(romFile);
		});
	}, []);

	return (
		<Modal isOpen={isOpen} title="Needed Files">
			<div className="w-full max-w-2xl">
				To use the editor, you need to provide a GBA bios and a SMA4 rom.
			</div>
		</Modal>
	);
}

export { FileLoaderModal };
