import clsx from 'clsx';
import React from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { bytesToHexString } from '../hex-tree/HexTreePage/HexTree/ByteInputField';
import { ByteInputField } from './ByteInputField';
import { GridCellRenderer } from 'react-virtualized';
import { withWidth } from '@material-ui/core';

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
	className,
	bytes,
	chunkSize = 24,
	onBytesChange,
}: HexExplorerProps) {
	const chunks: number[][] = [];

	for (let i = 0; i < bytes.length; i += chunkSize) {
		const row = Array.from(bytes.slice(i, i + chunkSize));
		chunks.push(row);
	}

	const cellRenderer: GridCellRenderer = ({
		columnIndex,
		key,
		rowIndex,
		style,
	}) => {
		const value = chunks[rowIndex]?.[columnIndex];

		return (
			typeof value === 'number' && (
				<ByteInputField
					key={key}
					style={style}
					fullInput
					value={[chunks[rowIndex][columnIndex]]}
					onChange={() => {}}
				/>
			)
		);
	};

	return (
		<AutoSizer>
			{({ width, height }) => (
				<Grid
					cellRenderer={cellRenderer}
					columnCount={chunkSize}
					columnWidth={width / (chunkSize + 1)}
					columnHeight={100}
					rowCount={chunks.length}
					rowHeight={30}
					width={width}
					height={height}
				/>
			)}
		</AutoSizer>
	);
}

export { HexExplorer };
