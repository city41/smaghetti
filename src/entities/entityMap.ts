import { Entity } from './types';

import { AceCoin } from './AceCoin';
import { Bobomb } from './Bobomb';
import { BoomBoom } from './BoomBoom';
import { Brick } from './Brick';
import { Bubble } from './Bubble';
import { BuzzyBeetle } from './BuzzyBeetle';
import { CapeFeather } from './CapeFeather';
import { CardSlotMachine } from './CardSlotMachine';
import { Coin } from './Coin';
import { FireFlower } from './FireFlower';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { GreenParaTroopa } from './GreenParaTroopa';
import { HiddenBlock } from './HiddenBlock';
import { IndestructibleBrick } from './IndestructibleBrick';
import { Key } from './Key';
import { Lakitu } from './Lakitu';
import { Leaf } from './Leaf';
import { Muncher } from './Muncher';
import { Mushroom } from './Mushroom';
import { MusicBlock } from './MusicBlock';
import { OneUpMushroom } from './OneUpMushroom';
import { Player } from './Player';
import { PSwitch } from './PSwitch';
import { QuestionBlock } from './QuestionBlock';
import { QuestionMark } from './QuestionMark';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { ShoeGoomba } from './ShoeGoomba';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';
import { Stalactite } from './Stalactite';
import { StarMan } from './StarMan';
import { ThreeUpMoon } from './ThreeUpMoon';
import { TriangularBlock } from './TriangularBlock';
import { WoodBlock } from './WoodBlock';

const entityMap: Record<string, Entity> = {
	AceCoin,
	Bobomb,
	BoomBoom,
	Brick,
	Bubble,
	BuzzyBeetle,
	CapeFeather,
	CardSlotMachine,
	Coin,
	FireFlower,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
	HiddenBlock,
	IndestructibleBrick,
	Key,
	Lakitu,
	Leaf,
	Muncher,
	Mushroom,
	MusicBlock,
	OneUpMushroom,
	PSwitch,
	Player,
	QuestionBlock,
	QuestionMark,
	RedKoopaTroopa,
	RedParaTroopa,
	ShoeGoomba,
	Spiny,
	SpringBoard,
	Stalactite,
	StarMan,
	ThreeUpMoon,
	TriangularBlock,
	WoodBlock,
};

type SpriteType = keyof {
	[k in keyof typeof entityMap]: typeof entityMap[k]['gameType'] extends 'sprite'
		? k
		: never;
};

type ObjectType = keyof {
	[k in keyof typeof entityMap]: typeof entityMap[k]['gameType'] extends 'object'
		? k
		: never;
};

export { entityMap };
export type { SpriteType, ObjectType };
