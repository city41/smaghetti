import React from 'react';

import { DetailsEditProps } from './index';
import { payloadToObjectId } from '../../entities/BuriedVegetable';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function BuriedVegetableEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={Object.keys(payloadToObjectId) as Array<EntityType>}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={false}
		/>
	);
}

export { BuriedVegetableEditDetails };
