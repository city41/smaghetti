import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { EntityCount } from '../../../stats/types';
import { entityMap } from '../../../entities/entityMap';
import { Button } from '../../Button';

type UnusedEntitiesProps = {
	className?: string;
	entitiesByCount: EntityCount[];
};

function EntityCard({ type }: { type: EntityType }) {
	const def = entityMap[type];

	return (
		<div
			className={clsx(
				'w-24 h-32 bg-gray-600 m-2 flex flex-col items-center justify-center p-2 space-y-2 bg-gray-600'
			)}
		>
			<div>{def.simpleRender(50)}</div>
			<div className="text-xs text-center">{def.paletteInfo.title}</div>
		</div>
	);
}

function UnusedEntities({ className, entitiesByCount }: UnusedEntitiesProps) {
	const [hideObjects, setHideObjects] = useState(false);
	const [curEntitiesByCount, setCurEntitiesByCount] = useState(entitiesByCount);

	useEffect(() => {
		// remove the ghost, as it can never actually get into a level
		let curEntities = entitiesByCount.filter(e => e.type !== 'PlayerGhost');

		if (hideObjects) {
			curEntities = curEntities.filter(
				(e) => !entityMap[e.type].toObjectBinary
			);
		}

		setCurEntitiesByCount(curEntities);
	}, [hideObjects, entitiesByCount]);

	return (
		<div>
			<h1 className="font-bold text-2xl text-center mb-2 flex flex-row space-x-4">
				<div>Unused Entities</div>
				<Button
					className="text-base"
					onClick={() => setHideObjects((hc) => !hc)}
				>
					{hideObjects ? 'show objects' : 'hide objects'}
				</Button>
			</h1>
			<p className="text-gray-400 text-sm my-2">
				These poor souls have never been called to action. You should put them
				in a level!
			</p>
			<div
				className={clsx(
					className,
					'flex flex-row flex-wrap gap-y-4 gap-x-4 mt-8 h-96 overflow-y-auto'
				)}
			>
				{curEntitiesByCount
					.filter((ebc) => ebc.count === 0)
					.map((ebc) => (
						<EntityCard key={ebc.type} type={ebc.type} />
					))}
			</div>
		</div>
	);
}

export { UnusedEntities };
