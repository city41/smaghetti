import React from 'react';
import { ByteInputField } from './ByteInputField';

type OnBytesChangeProps = {
	address: number;
	bytes: number[];
};

type HexExplorerProps = {
	className?: string;
	bytes: number[] | Uint8Array;
	chunkSize?: number;
	labels: Array<{ start: number; size: number }>;
	offset: number;
	onBytesChange?: (props: OnBytesChangeProps) => void;
	onFocus?: (address: number) => void;
};

function HexExplorer({
	bytes,
	chunkSize = 24,
	labels,
	offset,
	onBytesChange,
	onFocus,
}: HexExplorerProps) {
	const rows: number[][] = [];

	for (let i = 0; i < bytes.length; i += chunkSize) {
		const row = Array.from(bytes.slice(i, i + chunkSize));
		rows.push(row);
	}

	const rowEls = rows.map((r, i) => {
		const byteEls = r.map((b, bi) => {
			const address = i * chunkSize + bi + offset;
			return (
				<ByteInputField
					key={bi}
					value={[b]}
					labelIndex={labels.findIndex(
						(l) => l.start <= address && l.start + l.size > address
					)}
					onFocus={() => {
						onFocus?.(address);
					}}
					onChange={(newBytes) => {
						onBytesChange?.({
							address,
							bytes: newBytes,
						});
					}}
				/>
			);
		});

		return (
			<div key={i} className="w-full flex flex-row gap-x-1 justify-evenly">
				<span className="text-xs">{(i * chunkSize + offset).toString(16)}</span>
				{byteEls}
			</div>
		);
	});

	return <div className="w-full flex flex-col gap-y-1">{rowEls}</div>;
}

export { HexExplorer };
