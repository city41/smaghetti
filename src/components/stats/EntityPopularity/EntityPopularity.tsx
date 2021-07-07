import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { EntityCount } from '../../../stats/types';
import { entityMap } from '../../../entities/entityMap';
import { Button } from '../../Button';

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
	const [hideObjects, setHideObjects] = useState(false);
	const [curEntitiesByCount, setCurEntitiesByCount] = useState(entitiesByCount);
	const highestCount = Math.max(...entitiesByCount.map((ec) => ec.count));

	useEffect(() => {
		let curEntities = entitiesByCount;

		if (hideObjects) {
			curEntities = entitiesByCount.filter(
				(e) => !entityMap[e.type].toObjectBinary
			);
		}

		setCurEntitiesByCount(curEntities);
	}, [hideObjects, entitiesByCount]);

	return (
		<div>
			<h1 className="font-bold text-2xl text-center mb-2 flex flex-row space-x-4">
				<div>Entity Popularity</div>
				<Button
					className="text-base"
					onClick={() => setHideObjects((hc) => !hc)}
				>
					{hideObjects ? 'show objects' : 'hide objects'}
				</Button>
			</h1>
			<p className="text-gray-400 text-sm my-2">
				Total count of entities in all Smaghetti levels, not just published
				levels.
			</p>
			<div className={clsx(className, 'space-y-8 mt-8')}>
				{curEntitiesByCount.map((ec) => (
					<EntityCountRow
						key={ec.type}
						type={ec.type}
						count={ec.count}
						percent={ec.count / highestCount}
					/>
				))}
			</div>
		</div>
	);
}

export { EntityPopularity };
