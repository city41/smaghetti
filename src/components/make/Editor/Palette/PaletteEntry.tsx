import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { ImCross } from 'react-icons/im';
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
	incompatible?: boolean;
};

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
	incompatible,
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
						exitType={0}
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

			{incompatible && (
				<div className="absolute w-full h-full top-0 left-0 grid place-items-center">
					<ImCross className="text-red-600 w-8 h-8 opacity-75" />
				</div>
			)}
			{showAdd && !incompatible && (
				<button
					className={clsx(styles.button, 'bg-green-600 text-white')}
					onClick={onAddClick}
				>
					add
				</button>
			)}
			{showRemove && !incompatible && (
				<button
					className={clsx(styles.button, 'bg-red-600 text-white')}
					onClick={onRemoveClick}
				>
					remove
				</button>
			)}
			{incompatible && (
				<div
					className={clsx(styles.button, 'bg-red-600 text-white text-center')}
				>
					<div>can&apos;t add</div>
				</div>
			)}
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
