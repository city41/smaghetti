import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { IconCheck, IconUnchecked, IconHammer } from '../../../icons';

type ItemStatus = 'not-started' | 'in-progress' | 'completed';

type CheckistItemProps = {
	className?: string;
	status: ItemStatus;
	children: ReactNode;
};

const itemIconMap: Record<ItemStatus, ReactNode> = {
	'not-started': <IconUnchecked className="w-8 h-8" />,
	'in-progress': (
		<IconHammer className="bg-yellow-600 text-white w-8 h-8 p-1 rounded-lg" />
	),
	completed: (
		<IconCheck className="bg-green-700 text-white w-8 h-8 p-1 rounded-lg" />
	),
};

function ChecklistItem({ className, status, children }: CheckistItemProps) {
	const icon = itemIconMap[status];

	return (
		<div
			className={clsx(className, 'py-4 grid items-center gap-x-4 w-full')}
			style={{ gridTemplateColumns: '2rem 1fr' }}
		>
			{icon}
			<div>{children}</div>
		</div>
	);
}

export { ChecklistItem };
export type { ItemStatus };
