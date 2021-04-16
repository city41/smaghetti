import React from 'react';

import { DetailsEditProps } from './index';
import { BuriedVegetable } from '../../entities/BuriedVegetable';
import { PayloadEditDetails } from './PayloadEditDetails';
import { EntityType } from '../../entities/entityMap';

function BuriedVegetableEditDetails({
	onEntitySettingsChange,
}: DetailsEditProps) {
	return (
		<PayloadEditDetails
			payloads={
				Object.keys(BuriedVegetable.payloadToObjectId!) as Array<EntityType>
			}
			onEntitySettingsChange={onEntitySettingsChange}
			canClear={true}
		/>
	);
}

export { BuriedVegetableEditDetails };
