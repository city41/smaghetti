import React, { useEffect, useState, ReactNode } from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';
import { LoadingBar } from '../../LoadingBar';
import localForage from 'localforage';
import { IconCheckCircle, IconExclamationCircle } from '../../../icons';

type PublicFileLoaderModalProps = {
	isOpen: boolean;
	onRequestClose?: () => void;
	wiiUMode?: boolean;
};

type InternalFileLoaderModalProps = {
	romFileState:
		| 'not-chosen'
		| 'loading'
		| 'success'
		| 'checksum-error'
		| 'wrong-version-error'
		| 'wiiu-version-error'
		| 'sma4-11-version-error'
		| 'error';
	otherFilesState: 'loading' | 'success' | 'error';
	onRomFileChosen: (romFile: File) => void;
	overallExtractionState: 'not-started' | 'extracting' | 'complete';
	extractionGraphicState: {
		done: number;
		total: number;
		mostRecentlyFinished: string | null;
	};
};

const ROM_KEY = 'sma4_rom';

function DropZone({
	onFileChosen,
	children,
}: {
	onFileChosen: (file: File) => void;
	children: ReactNode;
}) {
	const [fileOver, setFileOver] = useState(false);

	return (
		<div
			className={clsx(
				'h-full w-full px-6 py-4 flex flex-col items-center justify-center',
				{
					'bg-gray-400': fileOver,
				}
			)}
			onDragOver={(e) => {
				e.preventDefault();
				setFileOver(true);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setFileOver(false);
			}}
			onDrop={(e) => {
				e.preventDefault();
				const file = e.dataTransfer.files?.[0];

				if (file) {
					onFileChosen(file);
				}
			}}
		>
			{children}
		</div>
	);
}

function BaseFiles({
	romFileState,
	otherFilesState,
	onRomFileChosen,
}: Pick<
	InternalFileLoaderModalProps,
	'romFileState' | 'otherFilesState' | 'onRomFileChosen'
>) {
	function cacheRomThenOnChosen(romFile: File) {
		localForage.setItem<File>(ROM_KEY, romFile);
		onRomFileChosen(romFile);
	}

	let romBody = null;

	switch (romFileState) {
		case 'not-chosen':
			romBody = (
				<DropZone onFileChosen={cacheRomThenOnChosen}>
					<p className="pointer-events-none text-sm">
						Please drag the US ROM of
						<br />
						<b>Super Mario Advance 4 (v1.1)</b>
						<br /> here
					</p>
					<label className="italic cursor-pointer w-full hover:bg-gray-700 mt-4">
						or click here to choose
						<input
							style={{ width: 0.01, height: 0.01 }}
							type="file"
							onChange={(e) => {
								const file = e.target.files?.[0];

								if (file) {
									cacheRomThenOnChosen(file);
								}
							}}
						/>
					</label>
					<div className="text-xs mt-4 -mx-4 px-4 py-1 bg-green-500 text-white">
						The ROM is only used in your browser and not uploaded anywhere
					</div>
				</DropZone>
			);
			break;
		case 'loading':
			romBody = (
				<div className="px-4">
					loading ROM
					<LoadingBar percent={-1} />
				</div>
			);
			break;
		case 'success':
			romBody = (
				<div className="flex flex-row items-center justify-center">
					<IconCheckCircle className="text-2xl text-green-200" />
					<div className="ml-2">ROM loaded!</div>
				</div>
			);
			break;
		case 'wrong-version-error':
		case 'wiiu-version-error':
		case 'sma4-11-version-error':
		case 'checksum-error':
			romBody = (
				<DropZone onFileChosen={cacheRomThenOnChosen}>
					<div className="flex flex-row">
						<IconExclamationCircle className="text-2xl text-red-200" />
						<div className="ml-2">
							{romFileState === 'wrong-version-error' ? (
								'This is the 1.0 version, Smaghetti needs 1.1'
							) : romFileState === 'wiiu-version-error' ? (
								'This is the Wii U version, Smaghetti needs 1.1'
							) : romFileState === 'sma4-11-version-error' ? (
								'This is the 1.1 GBA version, the Wii-U version is needed here'
							) : (
								<>
									Checksum failed,
									<br /> wrong ROM?
								</>
							)}
						</div>
					</div>
					<label className="italic cursor-pointer hover:bg-gray-700 mt-4">
						<span className="text-green-400 font-bold">Please try again:</span>{' '}
						drag a file here or click to choose
						<input
							style={{ width: 0.01, height: 0.01 }}
							type="file"
							onChange={(e) => {
								const file = e.target.files?.[0];

								if (file) {
									cacheRomThenOnChosen(file);
								}
							}}
						/>
					</label>
				</DropZone>
			);
			break;
		case 'error':
			romBody = (
				<div className="flex flex-row items-center justify-center">
					<IconExclamationCircle className="text-2xl text-red-200" />
					<div className="ml-2">Failed to load the ROM</div>
				</div>
			);
			break;
	}

	let otherFilesBody = null;

	switch (otherFilesState) {
		case 'loading':
			otherFilesBody = (
				<div>
					loading other needed files
					<LoadingBar percent={-1} />
				</div>
			);
			break;
		case 'success':
			otherFilesBody = (
				<div className="flex flex-row items-center justify-center">
					<IconCheckCircle className="text-2xl text-green-200" />
					<div className="ml-2">All supporting files loaded!</div>
				</div>
			);
			break;
		case 'error':
			otherFilesBody = (
				<div className="flex flex-row items-center justify-center">
					<IconExclamationCircle className="text-2xl text-red-200" />
					<div className="ml-2">Failed to load supporting files</div>
				</div>
			);
			break;
	}

	return (
		<div className="grid grid-cols-2 gap-x-4">
			<div
				className="border border-dashed border-gray-300 bg-gray-600 space-y-4 flex flex-col items-stretch justify-center"
				style={{ minHeight: '10rem' }}
			>
				{romBody}
			</div>
			<div className="p-4 xbg-gray-600 text-center grid place-items-center justify-items-stretch">
				{otherFilesBody}
			</div>
		</div>
	);
}

function ExtractingResources({
	done,
	total,
	mostRecentlyFinished,
}: {
	done: number;
	total: number;
	mostRecentlyFinished: string | null;
}) {
	return (
		<div>
			Extracting Graphics: {mostRecentlyFinished}
			<LoadingBar percent={(done / total) * 100} />
		</div>
	);
}

function FileLoaderModal({
	isOpen,
	onRequestClose,
	otherFilesState,
	romFileState,
	onRomFileChosen,
	overallExtractionState,
	extractionGraphicState,
}: InternalFileLoaderModalProps & PublicFileLoaderModalProps) {
	useEffect(() => {
		localForage.getItem<File>(ROM_KEY).then((cachedRomFile) => {
			if (cachedRomFile) {
				onRomFileChosen(cachedRomFile);
			}
		});
	}, []);

	let body;
	if (overallExtractionState === 'not-started') {
		body = (
			<BaseFiles
				romFileState={romFileState}
				otherFilesState={otherFilesState}
				onRomFileChosen={onRomFileChosen}
			/>
		);
	} else {
		body = <ExtractingResources {...extractionGraphicState} />;
	}

	return (
		<Modal
			isOpen={isOpen}
			title="Before You Can Start"
			onRequestClose={onRequestClose}
		>
			{body}
			<div className="mt-4 px-4 py-2 border-red-400">
				<span className="inline-block font-bold text-lg bg-red-400 text-white px-2 mr-1">
					Heads up!
				</span>{' '}
				Smaghetti is very early stage. Lots of bugs, lots of missing features.
			</div>
		</Modal>
	);
}

export { FileLoaderModal, ROM_KEY };
export type { PublicFileLoaderModalProps };
