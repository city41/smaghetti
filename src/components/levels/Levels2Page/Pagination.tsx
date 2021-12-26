import React from 'react';
import clsx from 'clsx';
import { LevelsButton } from './LevelsButton';

type PaginationProps = {
	className?: string;
	currentPage: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
};

function Pagination({
	className,
	currentPage,
	onNextClick,
	onPreviousClick,
}: PaginationProps) {
	return (
		<div
			className={clsx(
				className,
				'w-full p-4 flex flex-row items-center justify-around'
			)}
		>
			<LevelsButton className="w-1/3" onClick={onPreviousClick}>
				Previous
			</LevelsButton>
			<div>
				{currentPage * 10 + 1} - {(currentPage + 1) * 10}
			</div>
			<LevelsButton className="w-1/3" onClick={onNextClick}>
				Next
			</LevelsButton>
		</div>
	);
}

export { Pagination };
