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
import { IndestructibleBrick } from './IndestructibleBrick';
import { Lakitu } from './Lakitu';
import { Mushroom } from './Mushroom';
import { OneUpMushroom } from './OneUpMushroom';
import { Player } from './Player';
import { QuestionBlock } from './QuestionBlock';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';
import { StarMan } from './StarMan';

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
	| 'OneUpMushroom'
	| 'Player'
	| 'RedKoopaTroopa'
	| 'RedParaTroopa'
	| 'Spiny'
	| 'SpringBoard'
	| 'StarMan';

type ObjectType = 'Brick' | 'Coin' | 'IndestructibleBrick' | 'QuestionBlock';

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
	OneUpMushroom,
	Player,
	RedKoopaTroopa,
	RedParaTroopa,
	Spiny,
	SpringBoard,
	StarMan,
};

const objectMap: Record<ObjectType, ObjectEntity> = {
	Brick,
	Coin,
	IndestructibleBrick,
	QuestionBlock,
};

export { spriteMap, objectMap };
export type { SpriteType, ObjectType };
