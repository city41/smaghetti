import { ComponentType } from 'react';

import { AceCoinViewDetails } from './AceCoinViewDetails';
import { QuestionBlockEditDetails } from './QuestionBlockEditDetails';
import { PayloadViewDetails } from './PayloadViewDetails';
import { BrickEditDetails } from './BrickEditDetails';
import { BuriedVegetableEditDetails } from './BuriedVegetableEditDetails';
import { TriangularBlockViewDetails } from './TriangularBlockViewDetails';
import { AngleEditDetails } from './AngleEditDetails';
import { MusicBlockEditDetails } from './MusicBlockEditDetails';
import { HiddenBlockEditDetails } from './HiddenBlockEditDetails';
import { WoodBlockEditDetails } from './WoodBlockEditDetails';
import { EntityType } from '../../entities/entityMap';
import { ChestEditDetails } from './ChestEditDetails';

type DetailsViewProps = {
	settings: EntitySettings;
};

type DetailsEditProps = {
	settings: EntitySettings;
	onEntitySettingsChange: (settings: EntitySettings) => void;
};

const detailsMap: Partial<
	Record<
		EntityType,
		{
			view?: ComponentType<DetailsViewProps>;
			edit?: ComponentType<DetailsEditProps>;
		}
	>
> = {
	AceCoin: {
		view: AceCoinViewDetails,
	},
	Brick: {
		view: PayloadViewDetails,
		edit: BrickEditDetails,
	},
	BuriedVegetable: {
		view: PayloadViewDetails,
		edit: BuriedVegetableEditDetails,
	},
	Chest: {
		view: PayloadViewDetails,
		edit: ChestEditDetails,
	},
	HiddenBlock: {
		view: PayloadViewDetails,
		edit: HiddenBlockEditDetails,
	},
	MusicBlock: {
		view: PayloadViewDetails,
		edit: MusicBlockEditDetails,
	},
	QuestionBlock: {
		view: PayloadViewDetails,
		edit: QuestionBlockEditDetails,
	},
	TriangularBlock: {
		view: TriangularBlockViewDetails,
		edit: AngleEditDetails,
	},
	WoodBlock: {
		view: PayloadViewDetails,
		edit: WoodBlockEditDetails,
	},
};

export { detailsMap };
export type { DetailsViewProps, DetailsEditProps };
