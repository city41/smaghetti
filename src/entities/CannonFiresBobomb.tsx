import React from 'react';
import clsx from 'clsx';
import type { Entity } from './types';
import { TILE_SIZE } from '../tiles/constants';
import { encodeObjectSets } from './util';
import { PayloadViewDetails } from './detailPanes/PayloadViewDetails';
import { HammerButton } from './detailPanes/HammerButton';

const directions = ['up-left', 'up-right'] as const;
type Direction = typeof directions[number];

const directionToObjectId: Record<Direction, number> = {
	'up-left': 0x6,
	'up-right': 0x7,
};

const directionToBobombSpriteId: Record<Direction, number> = {
	'up-left': 0xa2,
	'up-right': 0xa3,
};

const directionToResourceClass: Record<Direction, string> = {
	'up-left': 'CannonUpLeft-bg',
	'up-right': 'CannonUpRight-bg',
};

const CannonFiresBobomb: Entity = {
	paletteCategory: 'enemy',
	paletteInfo: {
		subCategory: 'enemy-bowsers-army',
		title: 'Cannon - Fires Bobomb',
	},

	objectSets: encodeObjectSets([[10, 10]]),
	spriteGraphicSets: [1, -1, -1, -1, -1, -1],
	layer: 'actor',
	editorType: 'entity',
	dimensions: 'none',
	objectId: 0x7,
	alternateObjectIds: Object.values(directionToObjectId),

	defaultSettings: { direction: 'up-left' },
	emptyBank: 0,

	toObjectBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const objectId = directionToObjectId[direction];

		return [0, y, x, objectId];
	},

	toSpriteBinary({ x, y, settings }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const spriteId = directionToBobombSpriteId[direction];

		return [1, spriteId, x, y];
	},

	simpleRender(size) {
		return (
			<div
				className="relative CannonUpLeft-bg bg-cover"
				style={{ width: size, height: size }}
			>
				<div className="absolute bottom-0 right-0 w-1/2 h-1/2 CannonBobomb-bg bg-cover bg-gray-800 rounded" />
			</div>
		);
	},

	render({ settings, onSettingsChange, entity }) {
		const direction = (settings.direction ??
			this.defaultSettings!.direction) as Direction;
		const resourceClass = directionToResourceClass[direction];

		const style = { width: TILE_SIZE, height: TILE_SIZE };

		return (
			<div style={style} className="relative bg-cover group">
				<div
					className={clsx(resourceClass, 'absolute top-0 left-0 w-full h-full')}
				/>

				{!!entity && (
					<div className="w-full h-full flex flex-row justify-start items-end absolute top-0 left-0">
						<HammerButton
							className="hidden group-hover:block"
							values={directions}
							currentValue={direction}
							onNewValue={(nextDir) => {
								onSettingsChange({
									direction: nextDir,
								});
							}}
						/>
					</div>
				)}
				<PayloadViewDetails size={TILE_SIZE / 3} payload="CannonBobomb" />
			</div>
		);
	},
};

export { CannonFiresBobomb };
