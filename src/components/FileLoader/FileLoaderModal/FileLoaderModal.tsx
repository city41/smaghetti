import React, { useEffect, useState, ReactNode } from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';
import { LoadingBar } from '../../LoadingBar';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

type FileLoaderModalProps = {
	isOpen: boolean;
	romFileState:
		| 'not-chosen'
		| 'loading'
		| 'success'
		| 'checksum-error'
		| 'error';
	otherFilesState: 'loading' | 'success' | 'error';
	onRomFileChosen: (romFile: File) => void;
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

function FileLoaderModal({
	isOpen,
	otherFilesState,
	romFileState,
	onRomFileChosen,
}: FileLoaderModalProps) {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			loadFile('/sma4.gba', (romFile) => {
				onRomFileChosen(romFile);
			});
		}
	}, []);

	let romBody;

	switch (romFileState) {
		case 'not-chosen':
			romBody = (
				<DropZone onFileChosen={onRomFileChosen}>
					<p className="pointer-events-none">
						Please drag the US ROM of
						<br />
						<b>Super Mario Advance 4</b>
						<br /> here
					</p>
					<label className="italic cursor-pointer hover:bg-gray-700">
						or click here to open a file dialog
						<input
							style={{ width: 0.01, height: 0.01 }}
							type="file"
							onChange={(e) => {
								const file = e.target.files?.[0];

								if (file) {
									onRomFileChosen(file);
								}
							}}
						/>
					</label>
				</DropZone>
			);
			break;
		case 'loading':
			romBody = (
				<div className="px-4">
					loading ROM
					<LoadingBar percent={100} />
				</div>
			);
			break;
		case 'success':
			romBody = (
				<div className="flex flex-row items-center justify-center">
					<FaCheckCircle className="text-2xl text-green-200" />
					<div className="ml-2">ROM loaded!</div>
				</div>
			);
			break;
		case 'checksum-error':
			romBody = (
				<DropZone onFileChosen={onRomFileChosen}>
					<div className="flex flex-row">
						<FaExclamationCircle className="text-2xl text-red-200" />
						<div className="ml-2">
							Checksum failed,
							<br /> wrong ROM?
						</div>
					</div>
					<div>Please try again, drag a file here or click to choose</div>
				</DropZone>
			);
			break;
		case 'error':
			romBody = (
				<div className="flex flex-row items-center justify-center">
					<FaExclamationCircle className="text-2xl text-red-200" />
					<div className="ml-2">Failed to load the ROM</div>
				</div>
			);
			break;
	}

	let otherFilesBody;

	switch (otherFilesState) {
		case 'loading':
			otherFilesBody = (
				<div>
					loading other needed files
					<LoadingBar percent={100} />
				</div>
			);
			break;
		case 'success':
			otherFilesBody = (
				<div className="flex flex-row items-center justify-center">
					<FaCheckCircle className="text-2xl text-green-200" />
					<div className="ml-2">All supporting files loaded!</div>
				</div>
			);
			break;
		case 'error':
			otherFilesBody = (
				<div className="flex flex-row items-center justify-center">
					<FaExclamationCircle className="text-2xl text-red-200" />
					<div className="ml-2">Failed to load supporting files</div>
				</div>
			);
			break;
	}

	return (
		<Modal isOpen={isOpen} title="Before You Can Start">
			<div className="grid grid-cols-2 gap-x-4">
				<div className="h-40 border border-dashed border-gray-300 bg-gray-600 text-center space-y-4 flex flex-col items-stretch justify-center">
					{romBody}
				</div>
				<div className="p-4 xbg-gray-600 text-center grid place-items-center justify-items-stretch">
					{otherFilesBody}
				</div>
			</div>
			<div className="mt-4 px-4 py-2 border-red-400">
				<span className="inline-block font-bold text-lg bg-red-400 text-white px-2 mr-1">
					Heads up!
				</span>{' '}
				Smaghetti is very early stage. Bugs and missing features galore.
			</div>
		</Modal>
	);
}

export { FileLoaderModal };
