import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import isEqual from 'lodash.isequal';

import { PaletteEntry } from '../../editorSlice';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { PaletteChoiceModal } from './PaletteChoiceModal';

type PaletteProps = {
	className?: string;
	currentPaletteEntry?: PaletteEntry;
	paletteEntries: PaletteEntry[];
	onPaletteEntryIndexChosen: (index: number) => void;
	onPaletteEntryRemove: (removedEntry: PaletteEntry) => void;
	onPaletteEntryAdded: (addedEntry: PaletteEntry) => void;
};

// const Root = styled.div`
// 	display: grid;
// 	grid-template-columns: max-content;
//
// 	max-height: 80vh;
// 	overflow-y: auto;
//
// 	justify-items: center;
// 	align-items: center;
//
// 	background-color: rgb(255, 255, 255, 0.125);
// 	backdrop-filter: blur(20px);
//
// 	border-top-right-radius: 14px;
// 	border-bottom-right-radius: 14px;
// 	border-top: 3px solid white;
// 	border-right: 3px solid white;
// 	border-bottom: 3px solid white;
//
// 	box-shadow: var(--item-box-shadow, 0 4px 6px 1px rgba(0, 0, 0, 0.5));
//
// 	& .firstEntry {
// 		padding-top: 12px;
// 	}
//
// 	::-webkit-scrollbar {
// 		width: 8px;
// 	}
//
// 	::-webkit-scrollbar-track {
// 		background-color: #aaaaaa77;
// 	}
//
// 	::-webkit-scrollbar-thumb {
// 		background-color: #aaa;
// 	}
// `;
//
// const Add = styled.div`
// 	width: 50px;
// 	height: 50px;
//
// 	margin: 8px 8px 12px 8px;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
//
// 	font-size: 36px;
// 	font-weight: bold;
//
// 	border: 2px dashed #ddd;
// 	color: white;
//
// 	justify-self: center;
//
// 	cursor: pointer;
// `;

function Palette({
		className,
		currentPaletteEntry,
		paletteEntries,
		onPaletteEntryIndexChosen,
		onPaletteEntryRemove,
		onPaletteEntryAdded,
	}: PaletteProps) {
		const [modalOpen, setModalOpen] = useState(false);

		for (let i = 0; i < 9; ++i) {
			useHotkeys((i + 1).toString(), () => onPaletteEntryIndexChosen(i));
		}

		const entries = paletteEntries.map((pe, i) => (
			<PaletteEntryCmp
				key={`${pe.brushMode}-${pe.type}`}
				buttonsOnHover
				entry={pe}
				isCurrent={isEqual(pe, currentPaletteEntry)}
				className={clsx({ firstEntry: i === 0 })}
				onClick={() => {
					onPaletteEntryIndexChosen(i);
				}}
				showAdd={false}
				showRemove={true}
				onRemoveClick={() => {
					onPaletteEntryRemove(pe);
				}}
			/>
		));

		return (
			<div className={className} dir="rtl">
				{entries}
				<button onClick={() => setModalOpen(true)}>+</button>
				<PaletteChoiceModal
					open={modalOpen}
					currentPaletteEntries={paletteEntries}
					onEntryAdded={(addedEntry) => {
						onPaletteEntryAdded(addedEntry);
						setModalOpen(false);
					}}
					onEntryRemoved={onPaletteEntryRemove}
					onCancel={() => setModalOpen(false)}
				/>
			</div>
		);
	}
);

export { Palette };
export type {PaletteProps };
