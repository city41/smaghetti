import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import isEqual from 'lodash.isequal';

import { PaletteEntry } from '../../editorSlice';
import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { PaletteChoiceModal } from './PaletteChoiceModal';

import styles from './Palette.module.css';

type PaletteProps = {
	className?: string;
	currentPaletteEntry?: PaletteEntry;
	paletteEntries: PaletteEntry[];
	onPaletteEntryIndexChosen: (index: number) => void;
	onPaletteEntryRemove: (removedEntry: PaletteEntry) => void;
	onPaletteEntryAdded: (addedEntry: PaletteEntry) => void;
};

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
		<div className={clsx(className, styles.root)} dir="rtl">
			{entries}
			<button
				className="w-16 h-16 m-4 mb-6 flex items-center justify-center font-bold text-xl border-dashed border-2 border-white cursor-pointer"
				onClick={() => {
					setModalOpen(true);
				}}
			>
				+
			</button>
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

export { Palette };
export type { PaletteProps };
