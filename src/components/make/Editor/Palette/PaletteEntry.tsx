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
	const item = entityDef.simpleRender(50, 50);

	return (
		<div
			className={clsx(className, styles.root, {
				[styles.isCurrent]: isCurrent,
				[styles.buttonsOnHover]: buttonsOnHover && !disabled,
				'bg-yellow-200': isCurrent && !disabled,
				'hover:bg-yellow-200 cursor-pointer': !disabled,
				'opacity-50 cursor-default': disabled,
			})}
			onClick={disabled ? undefined : onClick}
		>
			<div
				className={clsx('w-full h-full grid place-items-center py-1 px-2', {
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
