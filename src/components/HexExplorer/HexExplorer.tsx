import React from 'react';
import 'react-virtualized/styles.css';
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
	chunkSize?: number;
	onBytesChange?: (props: OnBytesChangeProps) => void;
	onAnnotation?: (props: OnAnnotationprops) => void;
};

function HexExplorer({
	bytes,
	chunkSize = 32,
	onBytesChange,
}: HexExplorerProps) {
	const rows: number[][] = [];

	for (let i = 0; i < bytes.length; i += chunkSize) {
		const row = Array.from(bytes.slice(i, i + chunkSize));
		rows.push(row);
	}

	const rowEls = rows.map((r, i) => {
		const byteEls = r.map((b, bi) => {
			return (
				<ByteInputField
					key={bi}
					value={[b]}
					onChange={(newBytes) => {
						onBytesChange?.({
							address: i * chunkSize + bi,
							bytes: newBytes,
						});
					}}
				/>
			);
		});

		return (
			<div key={i} className="w-full flex flex-row gap-x-1 justify-evenly">
				{byteEls}
			</div>
		);
	});

	return <div className="w-full flex flex-col gap-y-1">{rowEls}</div>;
}

export { HexExplorer };
