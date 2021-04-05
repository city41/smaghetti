import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import isEqual from 'lodash/isEqual';

import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { PaletteChoiceModal } from './PaletteChoiceModal';

import styles from './Palette.module.css';
import { EntityType } from '../../../../entities/entityMap';

type PaletteProps = {
	className?: string;
	currentPaletteEntry?: EntityType;
	paletteEntries: EntityType[];
	onPaletteEntryIndexChosen: (index: number) => void;
	onPaletteEntryRemove: (removedEntry: EntityType) => void;
	onPaletteEntryAdded: (addedEntry: EntityType) => void;
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

	useHotkeys('0', () => setModalOpen((m) => !m));

	const entries = paletteEntries.map((pe, i) => (
		<PaletteEntryCmp
			key={pe}
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
				className={clsx(
					styles.addButton,
					'w-16 h-16 m-4 mb-6 flex items-center justify-center font-bold text-xl border-dashed border-2 border-white cursor-pointer outline-none'
				)}
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
