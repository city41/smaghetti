import React from 'react';

import { DetailsEditProps } from './index';
import { WoodBlock } from '../../entities/WoodBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function WoodBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(WoodBlock.payloadToObjectId!) as EntityType[]}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={true}
		/>
	);
}

export { WoodBlockEditDetails };
