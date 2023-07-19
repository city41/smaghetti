import React, { useRef, useState } from 'react';
import { ByteInputField } from './ByteInputField';
import {
	AutoSizer as _AutoSizer,
	AutoSizerProps,
	Grid as _Grid,
	GridProps,
	GridCellRenderer,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

// this is due to react-virtualied not fully being react@18 compatible
// https://github.com/bvaughn/react-virtualized/issues/1739#issuecomment-1264276522
const AutoSizer = (_AutoSizer as unknown) as React.FunctionComponent<AutoSizerProps>;
const Grid = (_Grid as unknown) as React.FunctionComponent<GridProps>;

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
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [scrollToRow, setScrollToRow] = useState<number | undefined>();

	function handleGoTo() {
		const address = inputRef?.current?.value;

		if (address) {
			const adNum = parseInt(address, 16);

			if (!isNaN(adNum) && adNum > 0) {
				const flooredAddress = adNum - ((adNum - offset) % chunkSize);
				const rowIndex = (flooredAddress - offset) / chunkSize;

				setScrollToRow(rowIndex);
			}
		}
	}

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
		if (columnIndex === 0) {
			const address = rows[rowIndex][columnIndex];
			return (
				<div
					style={style}
					className="text-xs h-full grid place-items-center"
					data-address={address}
				>
					{address.toString(16)}
				</div>
			);
		} else if (typeof rows[rowIndex][columnIndex] === 'number') {
			const address = rows[rowIndex][0] + columnIndex - 1;
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
		<div className="flex flex-col h-full">
			<div className="flex flex-row my-2 gap-x-2">
				<div>Enter an address to jump there:</div>
				<input
					ref={inputRef}
					type="text"
					className="w-48"
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === 'Return') {
							handleGoTo();
						}
					}}
				/>
			</div>
			<div className="flex-1">
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
							scrollToRow={scrollToRow}
						/>
					)}
				</AutoSizer>
			</div>
		</div>
	);
}

export { HexExplorer };
