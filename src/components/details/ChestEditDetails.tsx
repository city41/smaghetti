import React from 'react';

import { DetailsEditProps } from './index';
import { Chest } from '../../entities/Chest';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function ChestEditDetails({ onEntitySettingsChange }: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(Chest.payloadToObjectId!) as Array<EntityType>}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={true}
		/>
	);
}

export { ChestEditDetails };
