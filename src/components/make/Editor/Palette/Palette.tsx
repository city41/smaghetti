import React, { useState } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import isEqual from 'lodash/isEqual';
import { FaPlus } from 'react-icons/fa';

import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { PaletteChoiceModal } from './PaletteChoiceModal';

import { EntityType } from '../../../../entities/entityMap';

type PaletteProps = {
	className?: string;
	currentPaletteEntry?: EntityType;
	paletteEntries: EntityType[];
	onPaletteEntryIndexChosen: (index: number) => void;
	onPaletteEntryRemove: (removedEntry: EntityType) => void;
	onPaletteEntryAdded: (addedEntry: EntityType) => void;
	currentObjectSet: number;
	currentGraphicSet: number;
};

function Palette({
	className,
	currentPaletteEntry,
	paletteEntries,
	onPaletteEntryIndexChosen,
	onPaletteEntryRemove,
	onPaletteEntryAdded,
	currentGraphicSet,
	currentObjectSet,
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
		<div
			className={clsx(
				className,
				'flex flex-row items-center justify-center overflow-auto bg-white'
			)}
		>
			<button
				className="bg-white text-gray-700 px-4 h-full hover:bg-yellow-100 cursor-pointer outline-none flex flex-col items-center justify-center"
				onClick={() => {
					setModalOpen(true);
				}}
			>
				<FaPlus className="w-6 h-6" />
				<div className="text-xs">add</div>
			</button>
			<div className="overflow-x-auto flex flex-row flex-1 pb-1">{entries}</div>
			<PaletteChoiceModal
				isOpen={modalOpen}
				currentPaletteEntries={paletteEntries}
				onEntryAdded={(addedEntry) => {
					onPaletteEntryAdded(addedEntry);
					setModalOpen(false);
				}}
				onEntryRemoved={onPaletteEntryRemove}
				onCancel={() => setModalOpen(false)}
				currentGraphicSet={currentGraphicSet}
				currentObjectSet={currentObjectSet}
			/>
		</div>
	);
}

export { Palette };
export type { PaletteProps };
