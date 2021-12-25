import React from 'react';
import clsx from 'clsx';

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
			<button onClick={onPreviousClick}>Previous</button>
			<div>
				{currentPage * 10 + 1} - {(currentPage + 1) * 10}
			</div>
			<button onClick={onNextClick}>Next</button>
		</div>
	);
}

export { Pagination };
