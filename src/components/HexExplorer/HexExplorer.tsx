import clsx from 'clsx';
import React from 'react';
import { ByteInputField } from './ByteInputField';

type OnBytesChangeProps = {
	address: number;
	bytes: number[];
};

type OnAnnotationprops = {
	start: number;
	size: number;
	description: string;
};

type HexExplorerProps = {
	className?: string;
	bytes: number[] | Uint8Array;
	onBytesChange?: (props: OnBytesChangeProps) => void;
	onAnnotation?: (props: OnAnnotationprops) => void;
};

function HexExplorer({ className, bytes, onBytesChange }: HexExplorerProps) {
	const byteFields = Array.from(bytes).map((b, i) => {
		if (i > 1000) {
			return null;
		}

		return (
			<ByteInputField
				key={i}
				value={[b]}
				onChange={(newBytes) => {
					onBytesChange?.({ address: i, bytes: newBytes });
				}}
			/>
		);
	});

	return (
		<div className={clsx(className, 'flex flex-row flex-wrap gap-1')}>
			{byteFields}
		</div>
	);
}

export { HexExplorer };
