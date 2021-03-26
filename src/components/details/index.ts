import { ComponentType } from 'react';
import { ObjectType, SpriteType } from '../../entities/entityMap';

import { AceCoinViewDetails } from './AceCoinViewDetails';
import { QuestionBlockViewDetails } from './QuestionBlockViewDetails';
import { QuestionBlockEditDetails } from './QuestionBlockEditDetails';
import { BrickViewDetails } from './BrickViewDetails';
import { BrickEditDetails } from './BrickEditDetails';

type DetailsViewProps = {
	settings: EntitySettings;
};

type DetailsEditProps = {
	settings: EntitySettings;
	onEntitySettingsChange: (settings: EntitySettings) => void;
};

const detailsMap: Partial<
	Record<
		SpriteType | ObjectType,
		{
			view?: ComponentType<DetailsViewProps>;
			edit?: ComponentType<DetailsEditProps>;
		}
	>
> = {
	Brick: {
		view: BrickViewDetails,
		edit: BrickEditDetails,
	},
	QuestionBlock: {
		view: QuestionBlockViewDetails,
		edit: QuestionBlockEditDetails,
	},
	AceCoin: {
		view: AceCoinViewDetails,
	},
};

export { detailsMap };
export type { DetailsViewProps, DetailsEditProps };
