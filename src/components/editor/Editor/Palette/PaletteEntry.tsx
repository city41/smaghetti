import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';

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
			className={clsx(className, styles.root, 'group', {
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
					'opacity-20 hover:opacity-100': incompatible && !isCurrent,
				})}
			>
				{item}
			</div>

			{showAdd && !incompatible && (
				<button
					className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block"
					onClick={onAddClick}
				>
					<IoMdAddCircle className="text-green-500 bg-white rounded-full w-full h-full" />
				</button>
			)}
			{showRemove && !incompatible && (
				<button
					className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block"
					onClick={onRemoveClick}
				>
					<IoMdRemoveCircle className="text-red-500 bg-white rounded-full w-full h-full" />
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
		</div>
	);
};

export { PaletteEntry };
export type { PaletteEntryProps };
