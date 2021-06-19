import React, { useState } from 'react';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import isEqual from 'lodash/isEqual';
import { FaPlus } from 'react-icons/fa';

import { PaletteEntry as PaletteEntryCmp } from './PaletteEntry';
import { PaletteChoiceModal } from './PaletteChoiceModal';

import { EntityType } from '../../../../entities/entityMap';

type PublicPaletteProps = {
	className?: string;
	disabled?: boolean;
};

type InternalPaletteProps = {
	currentPaletteEntry?: EntityType;
	paletteEntries: EntityType[];
	validEntityTypes: EntityType[];
	onPaletteEntryIndexChosen: (index: number) => void;
	onPaletteEntryRemove: (removedEntry: EntityType) => void;
	onPaletteEntryAdded: (addedEntry: EntityType) => void;
};

function Palette({
	className,
	disabled,
	currentPaletteEntry,
	paletteEntries,
	validEntityTypes,
	onPaletteEntryIndexChosen,
	onPaletteEntryRemove,
	onPaletteEntryAdded,
}: InternalPaletteProps & PublicPaletteProps) {
	const [modalOpen, setModalOpen] = useState(false);

	for (let i = 0; i < 9; ++i) {
		useHotkeys(
			(i + 1).toString(),
			() => {
				if (!disabled) {
					onPaletteEntryIndexChosen(i);
				}
			},
			[disabled, onPaletteEntryIndexChosen]
		);
	}

	useHotkeys(
		'0',
		() => {
			if (!disabled) {
				setModalOpen((m) => !m);
			}
		},
		[disabled, setModalOpen]
	);

	const entries = paletteEntries.map((pe, i) => (
		<PaletteEntryCmp
			key={pe}
			buttonsOnHover
			disabled={disabled}
			entry={pe}
			isCurrent={isEqual(pe, currentPaletteEntry)}
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
				'flex flex-row items-center justify-center overflow-auto bg-gray-200'
			)}
		>
			<button
				className={clsx(
					'bg-gray-200 text-gray-700 px-4 h-full outline-none flex flex-col items-center justify-center',
					{
						'cursor-pointer hover:bg-yellow-100': !disabled,
						'opacity-50 cursor-default': disabled,
					}
				)}
				onClick={() => {
					setModalOpen(true);
				}}
				disabled={disabled}
			>
				<FaPlus className="w-6 h-6" />
				<div className="text-xs">add</div>
			</button>
			<div className="thinScrollbar overflow-x-auto h-full flex flex-row items-center flex-1 pb-1 ml-1">
				{entries}
			</div>
			<PaletteChoiceModal
				isOpen={modalOpen && !disabled}
				validEntityTypes={validEntityTypes}
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
export type { PublicPaletteProps };
