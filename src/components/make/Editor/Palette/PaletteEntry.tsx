import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { PaletteEntry as PaletteEntryType } from '../../editorSlice';
import { Tile } from '../../../Tile';
import { Entity } from '../../../Entity';
import {
	TILE_SIZE,
	TILE_TYPE_TO_FIRST_TILE_INDEX_MAP,
	TileType,
} from '../../../../tiles/constants';

import styles from './PaletteEntry.module.css';

const SCALE = 50 / TILE_SIZE;

type PaletteEntryProps = {
	className?: string;
	entry: PaletteEntryType;
	isCurrent: boolean;
	buttonsOnHover?: boolean;
	showAdd: boolean;
	showRemove: boolean;
	onClick: () => void;
	onAddClick?: () => void;
	onRemoveClick?: () => void;
};

// const Root = styled.div`
// 	position: relative;
// 	padding: 8px;
// 	margin: 8px;
//
// 	min-width: 66px;
// 	max-width: 66px;
//
// 	min-height: 66px;
// 	max-height: 66px;
//
// 	cursor: pointer;
//
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
//
// 	&.isCurrent,
// 	:hover {
// 		cursor: initial;
// 		border-radius: 8px;
// 	}
//
// 	&:hover {
// 		background-color: rgb(255, 255, 255, 0.05);
// 	}
//
// 	&.isCurrent {
// 		background-color: rgb(255, 255, 255, 0.25);
// 	}
//
// 	&.buttonsOnHover {
// 		& .button {
// 			visibility: hidden;
// 		}
//
// 		&:hover {
// 			.button {
// 				visibility: visible;
// 			}
// 		}
// 	}
// `;
//
// const Button = styled.button`
// 	--height: 16px;
//
// 	position: absolute;
// 	z-index: 100;
// 	bottom: calc(var(--height) / -2);
//
// 	border: none;
// 	outline: none;
//
// 	color: white;
// 	border-radius: 4px;
//
// 	height: var(--height);
// 	padding: 0 4px;
// 	margin: 0;
//
// 	display: grid;
// 	place-items: center;
//
// 	cursor: pointer;
//
// 	& svg {
// 		width: 16px;
// 		height: 16px;
// 	}
// `;
//
// const AddButton = styled(Button)`
// 	background-color: green;
// `;
//
// const RemoveButton = styled(Button)`
// 	background-color: #a51f1f;
// `;

const PaletteEntry: FunctionComponent<PaletteEntryProps> = ({
	className,
	entry,
	isCurrent,
	onClick,
	showAdd,
	showRemove,
	buttonsOnHover,
	onAddClick,
	onRemoveClick,
}) => {
	const item =
		entry.brushMode === 'tile' ? (
			<Tile
				tileIndex={TILE_TYPE_TO_FIRST_TILE_INDEX_MAP[entry.type as TileType]}
				scale={SCALE}
			/>
		) : (
			<Entity
				scale={6.25}
				maxWidth={50}
				maxHeight={50}
				type={entry.type}
				disableDrag
			/>
		);

	return (
		<div
			className={clsx(className, {
				[styles.isCurrent]: isCurrent,
				[styles.buttonsOnHover]: buttonsOnHover,
			})}
			onClick={onClick}
		>
			{item}
			{showAdd && (
				<button className="bg-green-900 text-white" onClick={onAddClick}>
					choose
				</button>
			)}
			{showRemove && (
				<button className="bg-red-700 text-white" onClick={onRemoveClick}>
					remove
				</button>
			)}
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
