import React from 'react';
import clsx from 'clsx';
import { ChecklistItem, ItemStatus } from '../ChecklistItem';

type MilestoneChecklistItem = {
	status: ItemStatus;
	description: string;
};

type MilestoneChecklistProps = {
	className?: string;
	title: string;
	items: MilestoneChecklistItem[];
};

function sortByCompleted(
	a: MilestoneChecklistItem,
	b: MilestoneChecklistItem
): number {
	if (a.status === 'completed') {
		return -1;
	}

	if (b.status === 'completed') {
		return 1;
	}

	if (a.status === 'in-progress') {
		return -1;
	}

	if (b.status === 'in-progress') {
		return 1;
	}

	return a.description.localeCompare(b.description);
}

function MilestoneChecklist({
	className,
	title,
	items,
}: MilestoneChecklistProps) {
	return (
		<div className={clsx(className, '-mx-4 p-4 bg-gray-800')}>
			<h2 className="text-3xl font-bold mb-4 bg-gray-900 -m-4 p-4">{title}</h2>
			<ul>
				{items.sort(sortByCompleted).map((item, i) => {
					return (
						<li key={i}>
							<ChecklistItem status={item.status}>
								{item.description}
							</ChecklistItem>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export { MilestoneChecklist };
export type { MilestoneChecklistItem };
