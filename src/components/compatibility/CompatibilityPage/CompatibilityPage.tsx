import React from 'react';
import clsx from 'clsx';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { entityMap, EntityType } from '../../../entities/entityMap';
import { Root } from '../../layout/Root';
import {
	determineValidGraphicAndObjectSetValues,
	isGraphicAndObjectSetCompatible,
} from '../../../entities/util';

type InternalCompatibilityPageProps = {
	allFilesReady: boolean;
};

type PublicCompatibilityPageProps = {
	entityType: EntityType;
};

function isUnfinished(type: EntityType): boolean {
	const entityDef = entityMap[type];

	return (
		!entityDef.paletteCategory || entityDef.paletteCategory === 'unfinished'
	);
}

function sortUnfinishedLast(a: EntityType, b: EntityType): number {
	const aUnfinished = isUnfinished(a);
	const bUnfinished = isUnfinished(b);

	if (aUnfinished && !bUnfinished) {
		return 1;
	}

	if (bUnfinished && !aUnfinished) {
		return -1;
	}

	return a.localeCompare(b);
}

function getCompatibility(
	entityType: EntityType
): { compatibleTypes: EntityType[]; incompatibleTypes: EntityType[] } {
	const entityDef = entityMap[entityType];

	const currentGraphicAndObjectSetNumbers = determineValidGraphicAndObjectSetValues(
		[entityDef]
	);

	const compatibleTypes = Object.keys(entityMap).filter((type) => {
		if (type === entityType) {
			return false;
		}

		const def = entityMap[type as EntityType];

		return isGraphicAndObjectSetCompatible(
			def,
			currentGraphicAndObjectSetNumbers
		);
	}) as EntityType[];

	const incompatibleTypes = Object.keys(entityMap).filter((type) => {
		if (type === entityType) {
			return false;
		}

		const def = entityMap[type as EntityType];
		return !isGraphicAndObjectSetCompatible(
			def,
			currentGraphicAndObjectSetNumbers
		);
	}) as EntityType[];

	return {
		compatibleTypes: compatibleTypes.sort(sortUnfinishedLast),
		incompatibleTypes: incompatibleTypes.sort(sortUnfinishedLast),
	};
}

function EntityList({ types }: { types: EntityType[] }) {
	return (
		<>
			{types.map((et) => {
				if (et === 'Player') {
					return null;
				}

				const def = entityMap[et];

				return (
					<div
						key={et}
						className={clsx(
							'w-24 h-32 bg-gray-600 m-2 flex flex-col items-center justify-center p-2 space-y-2',
							{
								'bg-gray-600': !isUnfinished(et),
								'bg-red-300 text-gray-900': isUnfinished(et),
							}
						)}
					>
						<div>{entityMap[et].simpleRender(50)}</div>
						<div className="text-xs text-center">{def.paletteInfo.title}</div>
					</div>
				);
			})}
		</>
	);
}

function CompatibilityPage({
	allFilesReady,
	entityType,
}: InternalCompatibilityPageProps & PublicCompatibilityPageProps) {
	const entityDef = entityMap[entityType];
	const { compatibleTypes, incompatibleTypes } = getCompatibility(entityType);

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Compatibility" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<div className="grid place-items-center">
						{entityDef.simpleRender(80)}
					</div>
					<h1 className="font-bold text-2xl text-center mt-4">
						{entityDef.paletteInfo.title} Compatibility
					</h1>
					<p className="-mx-2 p-2 bg-green-700 my-8">
						The Game Boy Advance needs to load graphic data into its video RAM.
						There is not enough RAM to load everything at once. Because of this,
						Nintendo divided the graphics into sets, and some sets cannot be
						loaded at the same time.
					</p>
					<h2 className="text-xl font-bold flex flex-row items-center space-x-2 mb-4 mt-16">
						{entityDef.paletteInfo.title} is compatible with
					</h2>
					<div className="flex flex-row flex-wrap justify-center h-72 overflow-y-auto">
						<EntityList types={compatibleTypes} />
					</div>
					<h2 className="text-xl font-bold flex flex-row items-center space-x-2 mb-4 mt-16">
						{incompatibleTypes.length === 0
							? 'and has no incompatibilities'
							: 'and incompatible with'}
					</h2>
					<div className="flex flex-row flex-wrap justify-center h-72 overflow-y-auto">
						{incompatibleTypes.length > 0 && (
							<>
								<EntityList types={incompatibleTypes} />
							</>
						)}
					</div>
					{incompatibleTypes.length > 0 && (
						<p className="-mx-2 p-2 bg-green-700 my-8 text-center">
							Compatibility may improve as we learn more about how the game
							works, especially with unfinished entities (they have a red
							background)
						</p>
					)}
				</div>
			</Root>
		</>
	);
}

export { CompatibilityPage };
export type { PublicCompatibilityPageProps };
