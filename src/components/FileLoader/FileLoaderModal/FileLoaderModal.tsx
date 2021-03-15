import React, { useEffect } from 'react';
import { Modal } from '../../Modal';

type FileLoaderModalProps = {
	isOpen: boolean;
	isLoadingBios: boolean;
	isLoadingRom: boolean;
	onBiosFileChosen: (biosFile: File) => void;
	onRomFileChosen: (romFile: File) => void;
	loadEmptySaveError: string | null;
	loadBiosError: string | null;
	loadRomError: string | null;
};

function basename(url: string): string {
	const split = url.split('/');
	return split.pop() as string;
}

function loadFile(url: string, callback: (file: File) => void) {
	fetch(url)
		.then((r) => r.blob())
		.then((blob) => {
			callback(new File([blob], basename(url)));
		})
		.catch((e) => {
			console.error(e);
		});
}

function FileLoaderModal({
	isOpen,
	isLoadingBios,
	isLoadingRom,
	onBiosFileChosen,
	onRomFileChosen,
	loadEmptySaveError,
	loadBiosError,
	loadRomError,
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
			{loadBiosError && <div>bios load error: {loadBiosError}</div>}
			{loadRomError && <div>rom load error: {loadRomError}</div>}
			{loadEmptySaveError && (
				<div>empty save load error: {loadEmptySaveError}</div>
			)}
		</Modal>
	);
}

export { FileLoaderModal };
