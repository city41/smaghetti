import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './PaletteEntry.module.css';
import { entityMap, EntityType } from '../../../../entities/entityMap';

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
	disabled?: boolean;
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
	disabled,
}) => {
	const entityDef = entityMap[entry];
	const item = entityDef.simpleRender(50);

	return (
		<div
			className={clsx(className, styles.root, {
				[styles.buttonsOnHover]: buttonsOnHover && !disabled,
				'border-2 border-transparent': !isCurrent,
				'border-2 border-gray-700 bg-yellow-400': isCurrent && !disabled,
				'hover:bg-yellow-300 cursor-pointer': !disabled && !isCurrent,
				'opacity-50 cursor-default': disabled,
			})}
			onClick={disabled ? undefined : onClick}
		>
			<div
				className={clsx('w-full h-full grid place-items-center p-1', {
					'opacity-20 hover:opacity-100': incompatible,
				})}
			>
				{item}
			</div>

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
