import React from 'react';
import { ByteInputField } from './ByteInputField';
import { AutoSizer, Grid, GridCellRenderer } from 'react-virtualized';
import 'react-virtualized/styles.css';

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
	chunkSize = 20,
	labels,
	offset,
	onBytesChange,
	onFocus,
}: HexExplorerProps) {
	const rows: number[][] = [];

	for (let i = 0; i < bytes.length; i += chunkSize) {
		const address = i + offset;
		const row = Array.from(bytes.slice(i, i + chunkSize));

		rows.push([address, ...row]);
	}

	const cellRenderer: GridCellRenderer = ({
		columnIndex,
		key,
		rowIndex,
		style,
	}) => {
		const address = rowIndex * chunkSize + columnIndex + offset;
		if (columnIndex === 0) {
			return (
				<div style={style} className="text-xs h-full grid place-items-center">
					{rows[rowIndex][columnIndex].toString(16)}
				</div>
			);
		} else if (typeof rows[rowIndex][columnIndex] === 'number') {
			return (
				<ByteInputField
					key={key}
					style={style}
					value={[rows[rowIndex][columnIndex]]}
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
		} else {
			return null;
		}
	};

	return (
		<AutoSizer>
			{({ width, height }) => (
				<Grid
					cellRenderer={cellRenderer}
					columnCount={chunkSize + 1}
					columnWidth={width / (chunkSize + 2)}
					height={height}
					rowCount={rows.length}
					rowHeight={30}
					width={width}
				/>
			)}
		</AutoSizer>
	);
}

export { HexExplorer };
