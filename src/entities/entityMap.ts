import { ObjectEntity, SpriteEntity } from './types';

import { AceCoin } from './AceCoin';
import { Brick } from './Brick';
import { BuzzyBeetle } from './BuzzyBeetle';
import { CapeFeather } from './CapeFeather';
import { CardSlotMachine } from './CardSlotMachine';
import { Coin } from './Coin';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { GreenParaTroopa } from './GreenParaTroopa';
import { Lakitu } from './Lakitu';
import { Mushroom } from './Mushroom';
import { Player } from './Player';
import { QuestionBlock } from './QuestionBlock';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';

type SpriteType =
	| 'AceCoin'
	| 'BuzzyBeetle'
	| 'CapeFeather'
	| 'CardSlotMachine'
	| 'Goomba'
	| 'GreenKoopaTroopa'
	| 'GreenParaTroopa'
	| 'Lakitu'
	| 'Mushroom'
	| 'Player'
	| 'RedKoopaTroopa'
	| 'RedParaTroopa'
	| 'Spiny'
	| 'SpringBoard';

type ObjectType = 'Brick' | 'Coin' | 'QuestionBlock';

const spriteMap: Record<SpriteType, SpriteEntity> = {
	AceCoin,
	BuzzyBeetle,
	CapeFeather,
	CardSlotMachine,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
	Lakitu,
	Mushroom,
	Player,
	RedKoopaTroopa,
	RedParaTroopa,
	Spiny,
	SpringBoard,
};

const objectMap: Record<ObjectType, ObjectEntity> = {
	Brick,
	Coin,
	QuestionBlock,
};

export { spriteMap, objectMap };
export type { SpriteType, ObjectType };
