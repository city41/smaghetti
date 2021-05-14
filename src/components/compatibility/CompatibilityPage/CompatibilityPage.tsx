import React from 'react';
import { FileLoaderModal } from '../../FileLoader/FileLoaderModal';
import { entityMap, EntityType } from '../../../entities/entityMap';
import { Root } from '../../layout/Root';
import { Entity } from '../../../entities/types';
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

function getCompatibility(
	entityDef: Entity
): { compatibleTypes: EntityType[]; incompatibleTypes: EntityType[] } {
	const currentGraphicAndObjectSetNumbers = determineValidGraphicAndObjectSetValues(
		[entityDef]
	);

	const compatibleTypes = Object.keys(entityMap).filter((type) => {
		const def = entityMap[type as EntityType];
		return isGraphicAndObjectSetCompatible(
			def,
			currentGraphicAndObjectSetNumbers
		);
	}) as EntityType[];

	const incompatibleTypes = Object.keys(entityMap).filter((type) => {
		const def = entityMap[type as EntityType];
		return !isGraphicAndObjectSetCompatible(
			def,
			currentGraphicAndObjectSetNumbers
		);
	}) as EntityType[];

	return { compatibleTypes, incompatibleTypes };
}

function CompatibilityPage({
	allFilesReady,
	entityType,
}: InternalCompatibilityPageProps & PublicCompatibilityPageProps) {
	const entityDef = entityMap[entityType];
	const { compatibleTypes, incompatibleTypes } = getCompatibility(entityDef);

	return (
		<>
			<FileLoaderModal isOpen={!allFilesReady} />
			<Root title="Compatibility" metaDescription="">
				<div className="max-w-2xl mx-auto pt-16">
					<div className="grid place-items-center">
						{entityDef.simpleRender(80, 80)}
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
						{compatibleTypes.map((et) => {
							const def = entityMap[et];

							if (
								!def.paletteCategory ||
								def.paletteCategory === 'unfinished'
							) {
								return null;
							}

							return (
								<div
									key={et}
									className="w-24 h-32 bg-gray-600 m-2 flex flex-col items-center justify-center p-2 space-y-2"
								>
									<div>{entityMap[et].simpleRender(50, 50)}</div>
									<div className="text-xs text-center">
										{def.paletteInfo.title}
									</div>
								</div>
							);
						})}
					</div>
					<h2 className="text-xl font-bold flex flex-row items-center space-x-2 mb-4 mt-16">
						and incompatible with
					</h2>
					<div className="flex flex-row flex-wrap justify-center h-72 overflow-y-auto">
						{incompatibleTypes.map((et) => {
							const def = entityMap[et];

							if (
								!def.paletteCategory ||
								def.paletteCategory === 'unfinished'
							) {
								return null;
							}

							return (
								<div
									key={et}
									className="w-24 h-32 bg-gray-600 m-2 flex flex-col items-center justify-center p-2 space-y-2"
								>
									<div>{entityMap[et].simpleRender(50, 50)}</div>
									<div className="text-xs text-center">
										{def.paletteInfo.title}
									</div>
								</div>
							);
						})}
					</div>
					<p className="-mx-2 p-2 bg-green-700 my-8 text-center">
						Compatibility may improve as we learn more about how the game works
					</p>
				</div>
			</Root>
		</>
	);
}

export { CompatibilityPage };
export type { PublicCompatibilityPageProps };
