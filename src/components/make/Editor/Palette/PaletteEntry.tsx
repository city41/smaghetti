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
import { Button } from '../../../Button';

// import { TiDelete } from 'react-icons/ti';
// import { RiAddLine } from 'react-icons/ri';

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

	const finalClassName = clsx(className, { isCurrent, buttonsOnHover });

	return (
		<div className={finalClassName} onClick={onClick}>
			{item}
			{showAdd && (
				<Button className="button" onClick={onAddClick}>
					choose
				</Button>
			)}
			{showRemove && (
				<Button className="button" onClick={onRemoveClick}>
					remove
				</Button>
			)}
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
