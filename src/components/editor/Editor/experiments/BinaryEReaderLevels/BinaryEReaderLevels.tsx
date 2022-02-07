import React from 'react';
import { Button, ButtonMimickLabel } from '../../../../Button';

type InternalBinaryEReaderLevelsProps = {
	onDownload: () => void;
	onBinaryLevelFile: (file: File) => void;
};

function BinaryEReaderLevels({
	onDownload,
	onBinaryLevelFile,
}: InternalBinaryEReaderLevelsProps) {
	function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			onBinaryLevelFile(file);
		}
	}

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-lg font-bold">Binary E-Reader Levels</h1>
			<p className="text-gray-400">
				I am working on storing Smaghetti levels in the same binary format the
				game uses. It&apos;s a really big change, but will bring many benefits.
			</p>
			<div className="mt-2 flex flex-row gap-x-4 items-center justify-center">
				<Button onClick={onDownload}>Download level as binary</Button>
				<ButtonMimickLabel>
					Load binary level
					<input
						type="file"
						style={{ width: 0.1, height: 0.1 }}
						accept=".level"
						onChange={handleUpload}
					/>
				</ButtonMimickLabel>
			</div>
		</div>
	);
}

export { BinaryEReaderLevels };
