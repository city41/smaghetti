import { ObjectEntity, SpriteEntity } from './types';

import { Brick } from './Brick';
import { CardSlotMachine } from './CardSlotMachine';
import { Coin } from './Coin';
import { Goomba } from './Goomba';
import { GreenKoopaTroopa } from './GreenKoopaTroopa';
import { Mushroom } from './Mushroom';
import { Player } from './Player';
import { QuestionBlock } from './QuestionBlock';
import { RedKoopaTroopa } from './RedKoopaTroopa';
import { Spiny } from './Spiny';
import { SpringBoard } from './SpringBoard';

type SpriteType =
	| 'CardSlotMachine'
	| 'Goomba'
	| 'GreenKoopaTroopa'
	| 'Mushroom'
	| 'Player'
	| 'RedKoopaTroopa'
	| 'Spiny'
	| 'SpringBoard';
type ObjectType = 'Brick' | 'Coin' | 'QuestionBlock';

const spriteMap: Record<SpriteType, SpriteEntity> = {
	CardSlotMachine,
	Goomba,
	GreenKoopaTroopa,
	Mushroom,
	Player,
	RedKoopaTroopa,
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
