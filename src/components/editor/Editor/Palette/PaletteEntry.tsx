import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import {
	IconAddCircle,
	IconExperiment,
	IconRemoveCircle,
} from '../../../../icons';

import styles from './PaletteEntry.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';
import { Entity } from '../../../../entities/types';

type PaletteEntryProps = {
	className?: string;
	entry: EntityType;
	isCurrent: boolean;
	shortcutKey?: string;
	buttonsOnHover?: boolean;
	showAdd: boolean;
	showRemove: boolean;
	onClick: () => void;
	onAddClick?: (shiftHeld: boolean) => void;
	onRemoveClick?: () => void;
	incompatible?: boolean;
	disabled?: boolean;
};

const PaletteEntry: FunctionComponent<PaletteEntryProps> = ({
	className,
	entry,
	isCurrent,
	shortcutKey,
	onClick,
	showAdd,
	showRemove,
	buttonsOnHover,
	onAddClick,
	onRemoveClick,
	incompatible,
	disabled,
}) => {
	const entityDef = entityMap[entry] as Entity;
	const item = entityDef.simpleRender(50);
	const experimental = !!entityDef.experimental;

	return (
		<div
			className={clsx(className, styles.root, 'group relative', {
				[styles.buttonsOnHover]: buttonsOnHover && !disabled,
				'border-2 border-transparent': !isCurrent,
				'border-2 border-gray-700 bg-yellow-400': isCurrent && !disabled,
				'hover:bg-yellow-300 cursor-pointer': !disabled && !isCurrent,
				'opacity-50 cursor-default': disabled,
			})}
			onClick={disabled ? undefined : onClick}
			title={entityDef.paletteInfo.title}
		>
			<div
				className={clsx('w-full h-full grid place-items-center p-1', {
					'opacity-20 hover:opacity-100': incompatible && !isCurrent,
					relative: experimental,
				})}
			>
				{item}
				{experimental && (
					<IconExperiment className="absolute -left-1 -bottom-1 w-5 h-5 p-0.5 bg-red-600 text-white" />
				)}
			</div>

			{showAdd && !incompatible && (
				<button
					className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block"
					onClick={(e) => {
						onAddClick?.(e.shiftKey);
					}}
				>
					<IconAddCircle className="text-green-500 bg-white rounded-full w-full h-full" />
				</button>
			)}
			{showRemove && !incompatible && (
				<button
					className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block"
					onClick={onRemoveClick}
				>
					<IconRemoveCircle className="text-red-500 bg-white rounded-full w-full h-full" />
				</button>
			)}
			{incompatible && (
				<div
					className={clsx(
						styles.button,
						'bg-red-600 text-white text-center group-hover:block',
						{
							hidden: !isCurrent,
							block: isCurrent,
						}
					)}
				>
					<div>can&apos;t add</div>
				</div>
			)}
			{shortcutKey && (
				<div className="absolute -bottom-5 left-0 w-full text-center text-xs text-gray-500">
					{shortcutKey}
				</div>
			)}
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
