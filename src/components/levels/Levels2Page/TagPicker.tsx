import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { LEVEL_TAGS } from '../../editor/constants';
import { LevelsButton } from './LevelsButton';

type TagPickerProps = {
	className?: string;
	chosenTag?: string;
	onTagClick: (tag: string) => void;
};

function TagButton({
	toggled,
	onClick,
	children,
}: {
	toggled: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<LevelsButton
			className={clsx(
				'flex flex-row gap-x-1 px-2 py-1 items-center border border-',
				{
					'bg-green-600': toggled,
				}
			)}
			onClick={onClick}
		>
			{children}
		</LevelsButton>
	);
}

function TagPicker({ className, chosenTag, onTagClick }: TagPickerProps) {
	return (
		<div
			className={clsx(
				className,
				'flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center'
			)}
		>
			{LEVEL_TAGS.map((levelTag) => {
				if (levelTag === '-') {
					return null;
				}

				return (
					<TagButton
						key={levelTag}
						toggled={chosenTag === levelTag}
						onClick={() => onTagClick(levelTag)}
					>
						{levelTag}
					</TagButton>
				);
			})}
		</div>
	);
}

export { TagPicker };
