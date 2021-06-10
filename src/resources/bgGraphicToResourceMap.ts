import { BACKGROUND_GRAPHIC_VALUES } from '../levelData/constants';

const bgGraphicToResourceMap: Record<number, string> = {
	[BACKGROUND_GRAPHIC_VALUES.underground]: 'UndergroundBackground-bg',
	[BACKGROUND_GRAPHIC_VALUES.fortress]: 'FortressBackground-bg',
};

export { bgGraphicToResourceMap };
