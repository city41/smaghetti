import { ComponentType } from 'react';
import { ObjectType, SpriteType } from '../../entities/entityMap';

import { QuestionBlockViewDetails } from './QuestionBlockViewDetails';
import { QuestionBlockEditDetails } from './QuestionBlockEditDetails';

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
			edit: ComponentType<DetailsEditProps>;
		}
	>
> = {
	QuestionBlock: {
		view: QuestionBlockViewDetails,
		edit: QuestionBlockEditDetails,
	},
};

export { detailsMap };
export type { DetailsViewProps, DetailsEditProps };
