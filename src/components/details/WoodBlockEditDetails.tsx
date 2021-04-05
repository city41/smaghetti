import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/WoodBlock';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function WoodBlockEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(payloadToObjectId) as EntityType[]}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { WoodBlockEditDetails };
