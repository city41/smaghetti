import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { IconMore } from '../../../../icons';

import { PlainIconButton } from '../../../PlainIconButton';

export type MoreMenuAction = 'export' | 'load' | 'cancel';

type PublicMoreMenuProps = {
	className?: string;
	disabled?: boolean;
	onClick: (action: MoreMenuAction) => void;
};

const MoreMenu = memo(function MoreMenu({
	className,
	disabled,
	onClick,
}: PublicMoreMenuProps) {
	const [open, setOpen] = useState(false);

	function handleClick(action: MoreMenuAction) {
		setOpen(false);
		onClick(action);
	}

	const menu = open ? (
		<div
			className={clsx(
				'absolute -bottom-16 w-40 h-16 z-30 bg-yellow-600 text-white flex flex-col justify-around text-sm shadow-2xl'
			)}
		>
			<div
				className="hover:underline hover:bg-yellow-500 px-2 cursor-pointer"
				onClick={() => handleClick('export')}
			>
				Export level to file
			</div>
			<div
				className="hover:underline hover:bg-yellow-500 px-2 cursor-pointer"
				onClick={() => handleClick('load')}
			>
				Load level from file
			</div>
		</div>
	) : null;

	return (
		<div className="relative">
			{menu}
			<PlainIconButton
				className={className}
				size="large"
				label={'more options'}
				onClick={() => {
					setOpen((o) => !o);
				}}
				icon={IconMore}
				disabled={disabled}
			></PlainIconButton>
		</div>
	);
});

export { MoreMenu };
export type { PublicMoreMenuProps };
