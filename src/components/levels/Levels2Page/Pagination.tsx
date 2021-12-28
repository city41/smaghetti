import React from 'react';
import clsx from 'clsx';
import { LevelsButton } from './LevelsButton';

type PaginationProps = {
	className?: string;
	currentPage: number;
	totalCount: number;
	pageSize: number;
	onNextClick: () => void;
	onPreviousClick: () => void;
};

function Pagination({
	className,
	currentPage,
	totalCount,
	pageSize,
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
				{currentPage * pageSize + 1} -{' '}
				{Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount}
			</div>
			<LevelsButton className="w-1/3" onClick={onNextClick}>
				Next
			</LevelsButton>
		</div>
	);
}

export { Pagination };
