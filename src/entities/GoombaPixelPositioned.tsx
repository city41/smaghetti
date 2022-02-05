import { ANY_BELOW_0x16 } from './constants';
import { getPixelPositionedEntity } from './getPixelPositionedEntity';
import type { SpriteGraphicSets } from './types';

const graphicSetValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const spriteGraphicSets: SpriteGraphicSets = [
	-1,
	-1,
	-1,
	graphicSetValues,
	-1,
	ANY_BELOW_0x16,
];

const GoombaPixelPositioned = getPixelPositionedEntity(
	'Goomba',
	'Goomba-bg',
	0,
	spriteGraphicSets
);

export { GoombaPixelPositioned };
