import merge from 'lodash/merge';
import * as generated from './generated_knownIds';
import * as manual from './manual_knownIds';

export const knownFourByteBank0ObjectIds = merge(
	generated.knownFourByteBank0ObjectIds,
	manual.knownFourByteBank0ObjectIds
);

export const knownFourByteBank1ObjectIds = merge(
	generated.knownFourByteBank1ObjectIds,
	manual.knownFourByteBank1ObjectIds
);

export const knownFiveByteBank1ObjectIds = merge(
	generated.knownFiveByteBank1ObjectIds,
	manual.knownFiveByteBank1ObjectIds
);

export const knownBank0SpriteIds = merge(
	generated.knownBank0SpriteIds,
	manual.knownBank0SpriteIds
);

export const knownBank1SpriteIds = merge(
	generated.knownBank1SpriteIds,
	manual.knownBank1SpriteIds
);
