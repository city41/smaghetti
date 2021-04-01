import { ObjectEntity, SpriteEntity } from './types';

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

type SpriteType =
	| 'AceCoin'
	| 'Bobomb'
	| 'BoomBoom'
	| 'Bubble'
	| 'BuzzyBeetle'
	| 'CapeFeather'
	| 'CardSlotMachine'
	| 'FireFlower'
	| 'Goomba'
	| 'GreenKoopaTroopa'
	| 'GreenParaTroopa'
	| 'Key'
	| 'Lakitu'
	| 'Leaf'
	| 'Mushroom'
	| 'OneUpMushroom'
	| 'Player'
	| 'QuestionMark'
	| 'RedKoopaTroopa'
	| 'RedParaTroopa'
	| 'ShoeGoomba'
	| 'Spiny'
	| 'SpringBoard'
	| 'StarMan'
	| 'ThreeUpMoon';

const spriteMap: Record<SpriteType, SpriteEntity> = {
	AceCoin,
	Bobomb,
	BoomBoom,
	Bubble,
	BuzzyBeetle,
	CapeFeather,
	CardSlotMachine,
	FireFlower,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
	Key,
	Lakitu,
	Leaf,
	Mushroom,
	OneUpMushroom,
	Player,
	QuestionMark,
	RedKoopaTroopa,
	RedParaTroopa,
	ShoeGoomba,
	Spiny,
	SpringBoard,
	StarMan,
	ThreeUpMoon,
};

type ObjectType =
	| 'Brick'
	| 'Coin'
	| 'IndestructibleBrick'
	| 'Muncher'
	| 'MusicBlock'
	| 'PSwitch'
	| 'QuestionBlock'
	| 'Stalactite'
	| 'TriangularBlock';

const objectMap: Record<ObjectType, ObjectEntity> = {
	Brick,
	Coin,
	IndestructibleBrick,
	Muncher,
	MusicBlock,
	PSwitch,
	QuestionBlock,
	Stalactite,
	TriangularBlock,
};

export { spriteMap, objectMap };
export type { SpriteType, ObjectType };
