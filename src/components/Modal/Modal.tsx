import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { IconClose } from '../../icons';

import { Button } from '../Button';

import styles from './Modal.module.css';

type ModalProps = ReactModalProps & {
	className?: string;
	title?: string;
	onOkClick?: () => void;
	okDisabled?: boolean;
	onXClick?: () => void;
	noAnimation?: boolean;
	children: ReactNode;
	flexWidth?: boolean;
};

function Modal({
	className,
	onOkClick,
	okDisabled,
	onXClick,
	noAnimation,
	title,
	children,
	flexWidth,
	...rest
}: ModalProps) {
	const overlayClassName = clsx('modalOverlay', { animate: !noAnimation });

	const modalClassName = clsx(
		className,
		'bg-gray-700 text-white rounded-xl px-4 pb-4 pt-3 shadow-lg outline-none',
		{
			[styles.root]: !flexWidth,
			'w-auto': flexWidth,
			hasOkButton: !!onOkClick,
			hasTitle: !!title,
			relative: !!onXClick,
		}
	);

	return (
		<ReactModal
			{...rest}
			className={modalClassName}
			overlayClassName={overlayClassName}
			closeTimeoutMS={noAnimation ? 0 : 250}
			appElement={
				typeof window !== 'undefined'
					? document.querySelector('#__next')!
					: undefined
			}
		>
			{!!title && (
				<h2 className="font-bold text-xl pb-3 text-center">{title}</h2>
			)}
			<div>{children}</div>
			{onOkClick && (
				<div className="flex flex-col items-center justify-center pt-6 pb-1">
					<Button
						className="px-4 py-2"
						onClick={onOkClick}
						disabled={okDisabled}
					>
						okay
					</Button>
				</div>
			)}
			{onXClick && (
				<button
					className="absolute top-1 right-1 text-xl text-white outline-none"
					onClick={onXClick}
				>
					<IconClose />
				</button>
			)}
		</ReactModal>
	);
}

export { Modal };
export type { ModalProps };
