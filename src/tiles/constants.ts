// this file was generated by
// /home/matt/dev/jumpclub/tilePipeline/generate.ts

import { EntityType } from '../entities/entityMap';

const TILE_SIZE = 16;

// TODO: really need this to go away
// or at the least, flip these so we know the ids are unique
// ie Mu: "Muncher" instead of Muncher: "Mu"
const TILE_TYPE_TO_SERIALIZE_ID_MAP: Partial<Record<EntityType, string>> = {
	ArrowFloor: 'Af',
	Brick: 'Br',
	BuriedVegetable: 'Bu',
	Cactus: 'Ca',
	Coin: '$',
	ConveyorBelt: 'Cb',
	FireBarBase: 'Fbb',
	FortressBrick: 'Fb',
	GlassBlock: 'Gb',
	LakituCloud: 'Lc',
	UpFortressSpike: 'UFs',
	DownFortressSpike: 'DFs',
	HiddenBlock: 'Hb',
	IndestructibleBrick: 'In',
	Lava: 'Lv',
	LogBridge: 'Lbg',
	MagicBrick: 'Mgb',
	MetalDonutFloor: 'Mdf',
	Muncher: 'Mu',
	MusicBlock: 'Mb',
	PSwitch: 'Ps',
	QuestionBlock: '?',
	Stalactite: 'St',
	TerracottaBrick: 'Tcb',
	TriangularBlock: 'Tb',
	WoodBlock: 'Wo',
	WoodWalkway: 'Wwy',
	YellowSwitchBrick: 'ysb',
};

const TILE_SERIALIZED_ID_TO_TYPE_MAP: Record<
	string,
	EntityType
> = (function () {
	return Object.keys(TILE_TYPE_TO_SERIALIZE_ID_MAP).reduce<
		Record<string, EntityType>
	>((building, key) => {
		const val = TILE_TYPE_TO_SERIALIZE_ID_MAP[key as EntityType]!;
		building[val] = key as EntityType;
		return building;
	}, {});
})();

export {
	TILE_SIZE,
	TILE_TYPE_TO_SERIALIZE_ID_MAP,
	TILE_SERIALIZED_ID_TO_TYPE_MAP,
};
