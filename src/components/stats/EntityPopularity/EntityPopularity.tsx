import React from 'react';
import clsx from 'clsx';
import { EntityCount } from '../../../stats/types';
import { entityMap } from '../../../entities/entityMap';

type EntityPopularityProps = {
	className?: string;
	entitiesByCount: EntityCount[];
};

function EntityCountRow({
	type,
	count,
}: {
	type: EntityType;
	count: number;
	percent: number;
}) {
	const entityDef = entityMap[type];

	return (
		<div
			className="grid gap-x-4 items-center"
			style={{ gridTemplateColumns: '50px 1fr' }}
		>
			<div className="grid place-items-center">
				{entityDef.simpleRender(50)}
			</div>
			<div>
				<div className="text-2xl">
					{count.toLocaleString('en-US', { maximumFractionDigits: 0 })}
				</div>
				<div className="text-xs text-gray-400">
					{entityDef.paletteInfo.title}
				</div>
			</div>
		</div>
	);
}

function EntityPopularity({
	className,
	entitiesByCount,
}: EntityPopularityProps) {
	const highestCount = Math.max(...entitiesByCount.map((ec) => ec.count));

	return (
		<div className={clsx(className, 'space-y-8')}>
			{entitiesByCount.map((ec) => (
				<EntityCountRow
					key={ec.type}
					type={ec.type}
					count={ec.count}
					percent={ec.count / highestCount}
				/>
			))}
		</div>
	);
}

export { EntityPopularity };
