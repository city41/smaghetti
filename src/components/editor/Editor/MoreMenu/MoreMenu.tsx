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
				'fixed top-10 w-40 h-16 z-20 bg-yellow-700 text-white flex flex-col justify-around text-sm shadow-2xl'
			)}
			style={{ left: 150 }}
		>
			<div
				className="hover:underline hover:bg-yellow-600 px-2 cursor-pointer"
				onClick={() => handleClick('export')}
			>
				Export level to file
			</div>
			<div
				className="hover:underline hover:bg-yellow-600 px-2 cursor-pointer"
				onClick={() => handleClick('load')}
			>
				Load level from file
			</div>
		</div>
	) : null;

	const backdrop = open ? (
		<div
			className="fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-50"
			onClick={() => setOpen(false)}
		/>
	) : null;

	return (
		<>
			{backdrop}
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
		</>
	);
});

export { MoreMenu };
export type { PublicMoreMenuProps };
