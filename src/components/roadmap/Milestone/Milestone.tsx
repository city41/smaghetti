import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { IconCaretUp } from '../../../icons';

type MilestoneProps = {
	className?: string;
	isCurrent?: boolean;
	children: ReactNode;
};

function Milestone({ className, isCurrent, children }: MilestoneProps) {
	return (
		<div
			className={clsx(
				className,
				'py-4 text-center border-2 grid place-items-center',
				{
					'bg-gray-600 border-transparent': !isCurrent,
					'relative bg-green-600 text-lg font-bold border-white': isCurrent,
				}
			)}
		>
			<div>{children}</div>
			{isCurrent && (
				<div className="absolute left-0 -bottom-5 w-full grid place-items-center">
					<IconCaretUp className="w-12 h-12 text-white" />
				</div>
			)}
		</div>
	);
}

export { Milestone };
