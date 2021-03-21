import { ObjectEntity, SpriteEntity } from './types';

import { Brick } from './Brick';
import { BuzzyBeetle } from './BuzzyBeetle';
import { CardSlotMachine } from './CardSlotMachine';
import { Coin } from './Coin';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { GreenParaTroopa } from './GreenParaTroopa';
import { Mushroom } from './Mushroom';
import { Player } from './Player';
import { QuestionBlock } from './QuestionBlock';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { RedParaTroopa } from './RedParaTroopa';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';

type SpriteType =
	| 'BuzzyBeetle'
	| 'CardSlotMachine'
	| 'Goomba'
	| 'GreenKoopaTroopa'
	| 'GreenParaTroopa'
	| 'Mushroom'
	| 'Player'
	| 'RedKoopaTroopa'
	| 'RedParaTroopa'
	| 'Spiny'
	| 'SpringBoard';

type ObjectType = 'Brick' | 'Coin' | 'QuestionBlock';

const spriteMap: Record<SpriteType, SpriteEntity> = {
	BuzzyBeetle,
	CardSlotMachine,
	Goomba,
	GreenKoopaTroopa,
	GreenParaTroopa,
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
