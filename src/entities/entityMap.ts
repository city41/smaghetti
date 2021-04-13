import { AceCoin } from './AceCoin';
import { ArrowSign } from './ArrowSign';
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
import { TexturedDoor } from './TexturedDoor';
import { ThreeUpMoon } from './ThreeUpMoon';
import { Transport } from './Transport';
import { TriangularBlock } from './TriangularBlock';
import { WoodBlock } from './WoodBlock';
import { WoodDoor } from './WoodDoor';

const entityMap = {
	AceCoin,
	ArrowSign,
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
	TexturedDoor,
	ThreeUpMoon,
	Transport,
	TriangularBlock,
	WoodBlock,
	WoodDoor,
};

type EntityType = keyof typeof entityMap;

export { entityMap };
export type { EntityType };
