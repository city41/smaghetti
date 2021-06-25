import React, { memo } from 'react';
import clsx from 'clsx';
import { AiFillSave } from 'react-icons/ai';

import { PlainIconButton } from '../../../PlainIconButton';

type PublicSaveButtonProps = {
	className?: string;
	disabled?: boolean;
	disabledExplicitly?: boolean;
};

type InternalSaveButtonProps = {
	onSaveClick: () => void;
	onSaveACopyClick?: () => void;
	saveLevelState: 'dormant' | 'saving' | 'success' | 'error';
};

const SaveButton = memo(function SaveButton({
	className,
	disabled,
	disabledExplicitly,
	onSaveClick,
	onSaveACopyClick,
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
				className={clsx(className, { 'relative group': !!onSaveACopyClick })}
				size="large"
				label={
					disabledExplicitly
						? "Can't save someone else's level"
						: 'save this level'
				}
				onClick={onSaveClick}
				icon={AiFillSave}
				loading={saveLevelState === 'saving'}
				disabled={disabled || disabledExplicitly}
			>
				{!!onSaveACopyClick && !disabled && !disabledExplicitly && (
					<a
						className="absolute z-10 hidden group-hover:block w-28 h-8 bg-yellow-800 -bottom-8 text-sm pt-1 hover:bg-yellow-700"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							onSaveACopyClick();
						}}
					>
						or save a copy
					</a>
				)}
			</PlainIconButton>
		</>
	);
});

export { SaveButton };
export type { PublicSaveButtonProps };
