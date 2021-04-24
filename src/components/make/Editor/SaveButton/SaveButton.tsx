import React, { memo } from 'react';
import clsx from 'clsx';
import { AiFillSave } from 'react-icons/ai';

import { PlainIconButton } from '../../../PlainIconButton';

type PublicSaveButtonProps = {
	className?: string;
	disabled?: boolean;
};

type InternalSaveButtonProps = {
	onClick: () => void;
	saveLevelState: 'dormant' | 'saving' | 'success' | 'error';
};

const SaveButton = memo(function SaveButton({
	className,
	disabled,
	onClick,
	saveLevelState,
}: PublicSaveButtonProps & InternalSaveButtonProps) {
	const toast =
		saveLevelState === 'success' || saveLevelState === 'error' ? (
			<div
				className={clsx('fixed top-14 left-2 p-2 z-10', {
					'bg-red-100 text-red-900': saveLevelState === 'error',
					'bg-green-100 text-green-900': saveLevelState === 'success',
				})}
			>
				{saveLevelState === 'error' && 'An error occurred saving the level'}
				{saveLevelState === 'success' && 'Level saved!'}
			</div>
		) : null;

	return (
		<>
			{toast}
			<PlainIconButton
				className={className}
				size="large"
				label="save this level"
				onClick={onClick}
				icon={AiFillSave}
				loading={saveLevelState === 'saving'}
				disabled={disabled}
			/>
		</>
	);
});

export { SaveButton };
export type { PublicSaveButtonProps };
