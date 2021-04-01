import { ComponentType } from 'react';
import { ObjectType, SpriteType } from '../../entities/entityMap';

import { AceCoinViewDetails } from './AceCoinViewDetails';
import { QuestionBlockViewDetails } from './QuestionBlockViewDetails';
import { QuestionBlockEditDetails } from './QuestionBlockEditDetails';
import { PayloadViewDetails } from './PayloadViewDetails';
import { BrickEditDetails } from './BrickEditDetails';
import { TriangularBlockViewDetails } from './TriangularBlockViewDetails';
import { AngleEditDetails } from './AngleEditDetails';
import { MusicBlockEditDetails } from './MusicBlockEditDetails';

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
		view: PayloadViewDetails,
		edit: BrickEditDetails,
	},
	QuestionBlock: {
		view: QuestionBlockViewDetails,
		edit: QuestionBlockEditDetails,
	},
	AceCoin: {
		view: AceCoinViewDetails,
	},
	TriangularBlock: {
		view: TriangularBlockViewDetails,
		edit: AngleEditDetails,
	},
	MusicBlock: {
		view: PayloadViewDetails,
		edit: MusicBlockEditDetails,
	},
};

export { detailsMap };
export type { DetailsViewProps, DetailsEditProps };
