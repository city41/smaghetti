import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { Tile } from '../../../Tile';
import { Entity } from '../../../Entity';
import { TILE_SIZE } from '../../../../tiles/constants';

import styles from './PaletteEntry.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { TransportSource } from '../../../Transport/TransportSource';

const SCALE = 50 / TILE_SIZE;

type PaletteEntryProps = {
	className?: string;
	entry: EntityType;
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
	let item;

	switch (entityMap[entry].editorType) {
		case 'tile':
			item = <Tile tileType={entry} scale={SCALE} />;
			break;
		case 'entity':
			item = <Entity scale={6.25} maxWidth={50} maxHeight={50} type={entry} />;
			break;
		case 'transport':
			item = (
				<div style={{ transform: `scale(${SCALE * 1.3})` }}>
					<TransportSource
						label="warp"
						destRoom={-1}
						destX={-1}
						destY={-1}
						exitType={1}
					/>
				</div>
			);
			break;
	}

	return (
		<div
			className={clsx(className, styles.root, {
				[styles.isCurrent]: isCurrent,
				[styles.buttonsOnHover]: buttonsOnHover,
			})}
			onClick={onClick}
		>
			{item}
			{showAdd && (
				<button
					className={clsx(styles.button, 'bg-green-600 text-white')}
					onClick={onAddClick}
				>
					add
				</button>
			)}
			{showRemove && (
				<button
					className={clsx(styles.button, 'bg-red-600 text-white')}
					onClick={onRemoveClick}
				>
					remove
				</button>
			)}
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
