import type { SpriteGraphicSets } from './types';
import { getPixelPositionedEntity } from './getPixelPositionedEntity';

const spriteGraphicSets: SpriteGraphicSets = [-1, -1, 0, -1, -1, -1];
const SpinyPixelPositioned = getPixelPositionedEntity(
	'Spiny',
	'Spiny-bg',
	4,
	spriteGraphicSets
);

export { SpinyPixelPositioned };
