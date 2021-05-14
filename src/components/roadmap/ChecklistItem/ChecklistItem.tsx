import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { FaCheck, FaHammer } from 'react-icons/fa';

type ItemStatus = 'not-started' | 'in-progress' | 'completed';

type CheckistItemProps = {
	className?: string;
	status: ItemStatus;
	children: ReactNode;
};

const itemIconMap: Record<ItemStatus, ReactNode> = {
	'not-started': <ImCheckboxUnchecked className="w-8 h-8" />,
	'in-progress': (
		<FaHammer className="bg-yellow-600 text-white w-8 h-8 p-1 rounded-lg" />
	),
	completed: (
		<FaCheck className="bg-green-700 text-white w-8 h-8 p-1 rounded-lg" />
	),
};

function ChecklistItem({ className, status, children }: CheckistItemProps) {
	const icon = itemIconMap[status];

	return (
		<div
			className={clsx(className, 'py-4 grid items-center gap-x-4')}
			style={{ gridTemplateColumns: '2rem max-content' }}
		>
			{icon}
			<div>{children}</div>
		</div>
	);
}

export { ChecklistItem };
export type { ItemStatus };
